import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { WorkExperience } from '@entities/resume';
import { Avatar } from '@shared/ui/avatar';
import { Badge } from '@shared/ui/badge';
import { cn } from '@shared/lib/utils';

interface ResumeCardProps {
  item: WorkExperience;
  subtitle?: string;
}

export function ResumeCard({ item, subtitle }: ResumeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDescription = Boolean(item.description);

  return (
    <button type="button" onClick={() => hasDescription && setIsExpanded((prev) => !prev)} className="w-full text-left">
      <div className="flex rounded-lg bg-card text-card-foreground">
        <div className="flex-none">
          <Avatar
            src={item.logoUrl}
            alt={item.company}
            fallback={item.company[0]}
            containerClassName="m-auto size-12 border bg-muted dark:bg-foreground"
            className="object-contain"
          />
        </div>
        <div className="group ml-4 flex-grow flex-col items-center">
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm">
                {item.company}
                {item.badges?.length > 0 &&
                  item.badges.map((badge) => (
                    <Badge key={badge} variant="secondary" className="ml-1 align-middle text-xs">
                      {badge}
                    </Badge>
                  ))}
                <ChevronRight
                  className={cn(
                    'size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100',
                    isExpanded ? 'rotate-90' : 'rotate-0'
                  )}
                />
              </h3>
              <div className="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
                {item.start} - {item.end || 'Present'}
              </div>
            </div>
            <div className="font-sans text-xs">{subtitle ?? item.title}</div>
          </div>
          {hasDescription && isExpanded && <div className="mt-2 text-xs sm:text-sm">{item.description}</div>}
        </div>
      </div>
    </button>
  );
}
