'use client'
import React, { ReactNode } from 'react';
import useCanvasCursor from '@/useCanvasCursor';

interface CanvasCursorProps {
  children?: ReactNode;
}

const CanvasCursor: React.FC<CanvasCursorProps> = ({ children }) => {
  useCanvasCursor();

  return (
    <>
      <canvas id="canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      {children}
    </>
  );
};

export default CanvasCursor;

