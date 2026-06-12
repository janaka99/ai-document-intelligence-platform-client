import { useState, useEffect } from 'react';
import { fetchAPI } from '@/utils/api';
import { IDocument } from '@/types/types';

export function useTrainedDocuments() {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAPI('/api/v1/document/trained')
      .then(res => res.json())
      .then(setDocuments)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return { documents, isLoading };
}
