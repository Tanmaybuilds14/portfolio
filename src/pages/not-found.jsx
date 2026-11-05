import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuroraBackground } from '@/components/backgrounds/aurora-background';

export default function NotFound() {
  return (
    <AuroraBackground className="flex min-h-[70vh] items-center">
      <div className="page-shell py-24">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,5.2vw,3.6rem)] leading-[1] font-medium tracking-[-0.04em]">
          Page not found.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-[52ch] text-[1rem] leading-relaxed">
          The URL you followed does not exist on this site — it may have been renamed, or the link was
          mistyped.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          <Button asChild>
            <Link to="/">
              Back home
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/work">See the work</Link>
          </Button>
        </div>
      </div>
    </AuroraBackground>
  );
}
