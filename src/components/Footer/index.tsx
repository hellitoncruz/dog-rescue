import { PawPrint } from 'lucide-react';
import './index.scss'

export default function Footer() {

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <PawPrint className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold">Dog Rescue</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-4 md:text-left">
          <p className="text-xs text-muted-foreground">© 2025 HELLITON CRUZ.</p>
        </div>
      </div>
    </footer>
  );
}