import { useState, useEffect, useCallback } from 'react';
import { fetchAPI } from '@/utils/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export function useChat(sessionId: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setHasMore(true);
      fetchAPI(`/api/v1/chat/sessions/${sessionId}/messages?limit=50`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMessages(data);
            if (data.length < 50) setHasMore(false);
          }
        })
        .catch(console.error);
    } else {
      setMessages([]);
    }
  }, [sessionId]);

  const loadMoreMessages = useCallback(async () => {
    if (!sessionId || isFetchingHistory || !hasMore || messages.length === 0) return;
    
    setIsFetchingHistory(true);
    const oldestMessageId = messages[0].id; // Ensure array is sorted oldest to newest initially, but wait, usually messages are returned newest first or oldest first. Let's assume oldest first based on guide `...olderMessages, ...prev`.
    
    try {
      const res = await fetchAPI(`/api/v1/chat/sessions/${sessionId}/messages?limit=50&before_id=${oldestMessageId}`);
      const olderMessages = await res.json();
      
      if (Array.isArray(olderMessages)) {
        if (olderMessages.length < 50) {
          setHasMore(false);
        }
        setMessages(prev => [...olderMessages, ...prev]);
      }
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setIsFetchingHistory(false);
    }
  }, [sessionId, messages, isFetchingHistory, hasMore]);

  const sendMessage = async (text: string) => {
    if (!sessionId) return;
    
    // 1. Optimistic Update: instantly show the user's message
    const userMsg: ChatMessage = { role: 'user', content: text, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Add an empty assistant message that we will fill up stream by stream
      setMessages(prev => [...prev, { role: 'assistant', content: '', id: 'streaming' }]);

      const response = await fetchAPI(`/api/v1/chat/sessions/${sessionId}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr) {
              try {
                const data = JSON.parse(dataStr);
                
                if (data.content) {
                  // 3. Append the new tokens to the assistant's message block immutably!
                  setMessages(prev => {
                    const newMsgs = [...prev];
                    const lastMsgIndex = newMsgs.length - 1;
                    const lastMsg = newMsgs[lastMsgIndex];
                    if (lastMsg.id === 'streaming') {
                      newMsgs[lastMsgIndex] = {
                        ...lastMsg,
                        content: lastMsg.content + data.content
                      };
                    }
                    return newMsgs;
                  });
                }
                if (data.done) {
                  setIsLoading(false);
                  setMessages(prev => {
                    const newMsgs = [...prev];
                    const lastMsg = newMsgs[newMsgs.length - 1];
                    if (lastMsg.id === 'streaming') {
                      lastMsg.id = Date.now().toString(); // finalize ID
                    }
                    return newMsgs;
                  });
                }
                if (data.error) {
                  console.error("Chat error:", data.error);
                  setIsLoading(false);
                }
              } catch (e) {
                console.error("Error parsing chat chunk", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Remove the empty streaming message if failed completely
      setMessages(prev => prev.filter(m => m.id !== 'streaming'));
    }
  };

  return { messages, sendMessage, isLoading, loadMoreMessages, hasMore, isFetchingHistory };
}
