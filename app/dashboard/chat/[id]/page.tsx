"use client";

import { useState, useRef, useEffect, use, useCallback } from "react";
import { Send, Loader, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { useChat } from "@/hooks/useChat";
import { useSearchParams } from "next/navigation";
import { fetchAPI } from "@/utils/api";
import { toast } from "sonner";

// ─── Markdown component maps ────────────────────────────────────────────────
// Two separate maps: one for assistant bubbles (dark bg is muted/border),
// one for user bubbles (bg-primary). Links need different colors in each.

const assistantComponents: Components = {
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
      className="text-blue-500 underline underline-offset-4 hover:text-blue-400 transition-colors cursor-pointer"
    >
      {children}
    </a>
  ),
  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  h1: ({ children }) => (
    <h1 className="text-lg font-semibold mb-2 mt-1">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-semibold mb-2 mt-1">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold mb-1 mt-1">{children}</h3>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-black/10 dark:bg-white/10 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-3 italic text-muted-foreground mb-2">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-3" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-2">
      <table className="text-xs border-collapse w-full">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-border px-2 py-1 bg-black/5 dark:bg-white/5 font-semibold text-left">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-border px-2 py-1">{children}</td>
  ),
};

// User bubble sits on bg-primary, so links must use primary-foreground with opacity
const userComponents: Components = {
  ...assistantComponents,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ wordBreak: "break-all", overflowWrap: "anywhere" }}
      className="underline underline-offset-4 opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-white/20 px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-white/20 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2">
      {children}
    </pre>
  ),
};

// ─── Main component ──────────────────────────────────────────────────────────

export default function ChatPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const { id: documentId } = params;
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Chat Session";

  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const initSession = async () => {
      try {
        const res = await fetchAPI("/api/v1/chat/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ document_id: documentId }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.detail || "Failed to initialize session");
        }

        if (data.session_id) {
          setSessionId(data.session_id);
        }
      } catch (err: any) {
        console.error("Session init error:", err);
        toast.error(err.message || "Could not connect to chat session.");
      }
    };

    initSession();
  }, [documentId]);

  const document = {
    id: documentId,
    name: title,
    size: "Active",
    status: "Online",
  };

  const {
    messages,
    sendMessage,
    isLoading,
    loadMoreMessages,
    hasMore,
    isFetchingHistory,
  } = useChat(sessionId);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  useEffect(() => {
    setInitialScrollDone(false);
  }, [documentId]);

  // Initial instant scroll to bottom
  useEffect(() => {
    if (messages.length > 0 && !initialScrollDone && !isFetchingHistory) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      setInitialScrollDone(true);
    }
  }, [messages, initialScrollDone, isFetchingHistory]);

  // Intersection Observer — load older messages when user scrolls to top
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingHistory) {
          loadMoreMessages();
        }
      },
      { threshold: 1.0 },
    );

    if (topObserverRef.current) {
      observer.observe(topObserverRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetchingHistory, loadMoreMessages]);

  // Auto-scroll to bottom while loading/streaming
  useEffect(() => {
    if (isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input;
    setInput("");
    await sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {document.name}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">
                {document.size}
              </span>
              <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
                <CheckCircle className="w-3 h-3" />
                {document.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {/* Top sentinel for infinite scroll pagination */}
        <div ref={topObserverRef} className="h-1" />

        {isFetchingHistory && (
          <div className="flex justify-center my-2">
            <Loader className="w-5 h-5 animate-spin text-muted-foreground" />
          </div>
        )}

        {messages.map((message) => {
          if (message.id === "streaming" && !message.content) return null;

          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] md:max-w-2xl px-5 py-3.5 rounded-2xl ${
                  isUser
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm border border-border"
                }`}
              >
                <div className="text-sm md:text-base leading-relaxed">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={isUser ? userComponents : assistantComponents}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>

                <p className="text-[10px] opacity-70 mt-2 text-right">
                  {message.created_at
                    ? new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Just now"}
                </p>
              </div>
            </div>
          );
        })}

        {isLoading &&
          !messages.some((m) => m.id === "streaming" && m.content !== "") && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-5 py-3.5 rounded-2xl rounded-bl-sm border border-border flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Thinking...
                </span>
              </div>
            </div>
          )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Ask a question about ${document.name}...`}
            className="flex-1 px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={isLoading || !sessionId}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !sessionId}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 rounded-xl h-auto"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
