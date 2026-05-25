'use client';
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { GeneratedPaper } from '@/types';

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000', {
      transports: ['websocket'],
    });
    socketRef.current = socket;
    return () => { socket.disconnect(); };
  }, []);

  return socketRef;
}

export function useAssignmentSocket(
  assignmentId: string,
  onProgress: (data: { message: string }) => void,
  onComplete: (data: { paper: GeneratedPaper }) => void,
  onError: (data: { message: string }) => void
) {
  const socketRef = useSocket();

  useEffect(() => {
    if (!assignmentId) return;
    const socket = socketRef.current;
    if (!socket) return;

    socket.emit('join:assignment', assignmentId);
    socket.on('generation:progress', onProgress);
    socket.on('generation:complete', onComplete);
    socket.on('generation:error', onError);

    return () => {
      socket.emit('leave:assignment', assignmentId);
      socket.off('generation:progress', onProgress);
      socket.off('generation:complete', onComplete);
      socket.off('generation:error', onError);
    };
  }, [assignmentId, onProgress, onComplete, onError, socketRef]);
}
