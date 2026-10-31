import type { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';

interface BlurFadeProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function BlurFade({ className, delay = 0, yOffset = 8, children }: BlurFadeProps) {
    return (
      <motion.div
        className={cn(className)}
        initial={{ opacity: 0, y: yOffset, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      >
      {children}
    </motion.div>
  );
}
