import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export interface FileQueueItem {
  id: string;
  file: File;
  preview?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
  result?: Blob;
  error?: string;
}

export interface UseFileQueueOptions {
  accept?: string[];
  maxSize?: number;
  maxFiles?: number;
  onFilesAdded?: (files: File[]) => void;
}

export function useFileQueue(options: UseFileQueueOptions = {}) {
  const {
    accept = [],
    maxSize = 100 * 1024 * 1024, // 100MB default
    maxFiles = 10,
    onFilesAdded
  } = options;

  const [items, setItems] = useState<FileQueueItem[]>([]);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): boolean => {
    if (accept.length > 0) {
      const fileType = file.type;
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
      
      const isValid = accept.some(type => {
        if (type.startsWith('.')) {
          return fileExt === type.toLowerCase();
        }
        if (type.endsWith('/*')) {
          const category = type.split('/')[0];
          return fileType.startsWith(category + '/');
        }
        return fileType === type;
      });

      if (!isValid) {
        toast({
          title: "Invalid File Type",
          description: `File ${file.name} is not a supported format`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: `File ${file.name} exceeds the maximum size limit`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  }, [accept, maxSize, toast]);

  const addFiles = useCallback((files: File[]) => {
    const validFiles = files.filter(validateFile);

    if (items.length + validFiles.length > maxFiles) {
      toast({
        title: "Too Many Files",
        description: `Maximum ${maxFiles} files allowed`,
        variant: "destructive",
      });
      return;
    }

    const newItems: FileQueueItem[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      status: 'pending',
    }));

    setItems(prev => [...prev, ...newItems]);
    onFilesAdded?.(validFiles);
  }, [items.length, maxFiles, validateFile, onFilesAdded, toast]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    addFiles(files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [addFiles]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
  }, [addFiles]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string, updates: Partial<FileQueueItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  }, []);

  const clearAll = useCallback(() => {
    setItems([]);
  }, []);

  const clearCompleted = useCallback(() => {
    setItems(prev => prev.filter(item => item.status !== 'completed'));
  }, []);

  return {
    items,
    fileInputRef,
    addFiles,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    removeItem,
    updateItem,
    clearAll,
    clearCompleted,
  };
}
