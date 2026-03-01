import type { ImgHTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
  containerClassName?: string;
}

export function Avatar({ src, alt, fallback, className, containerClassName, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative inline-flex size-12 items-center justify-center overflow-hidden rounded-full border bg-muted',
        containerClassName
      )}
    >
      {src ? (
        <img className={cn('h-full w-full object-cover', className)} src={src} alt={alt} {...props} />
      ) : (
        <span className="text-xs font-semibold">{fallback}</span>
      )}
    </div>
  );
}
