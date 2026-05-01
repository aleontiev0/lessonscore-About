
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/icon-128x128.png"
                alt="LessonScore Logo"
                className="h-8 w-8 dark:invert dark:hue-rotate-180"
              />
              <span className="text-xl font-bold font-heading text-foreground">LessonScore</span>
            </div>
            <p className="text-muted-foreground">
              Made with ❤️ for families everywhere.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <div className="space-y-2">
              <a href="/terms-of-service" className="block text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="https://twitter.com/lessonscore" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <a href="https://facebook.com/lessonscore" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
                Facebook
              </a>
              <a href="https://instagram.com/lessonscore" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} LessonScore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
