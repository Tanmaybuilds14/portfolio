/* shadcn/ui — textarea */
import { cn } from '@/lib/utils';

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-border bg-card/50 placeholder:text-muted-foreground/70 flex min-h-24 w-full rounded-xl border px-3.5 py-3 text-sm leading-relaxed transition-colors outline-none',
        'hover:border-foreground/25 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25',
        'aria-invalid:border-destructive/60 aria-invalid:ring-destructive/20 resize-y',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
