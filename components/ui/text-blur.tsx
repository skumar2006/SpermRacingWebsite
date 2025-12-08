'use client';
import { cn } from '@/lib/utils';

interface TextBlurProps {
  text: string;
  className?: string;
  duration?: number;
}

const TextBlur = ({ text, className, duration = 1 }: TextBlurProps) => {
  return (
    <h1
      className={cn(
        'drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000',
        className
      )}
    >
      {text}
    </h1>
  );
};

export default TextBlur;
