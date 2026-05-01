
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.75;
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/why-us", label: "Why Us" },
    { href: "/our-story", label: "Our Story" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage && isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm' 
          : isHomePage 
          ? 'bg-transparent' 
          : 'bg-background shadow-sm'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-3 text-2xl font-bold font-heading">
          <img
            src="/images/icon-128x128.png"
            alt="lessonscore Logo"
            className="h-9 w-9 dark:invert dark:hue-rotate-180"
          />
          <span className={`hidden sm:inline ${
            isHomePage && !isScrolled 
              ? 'text-white dark:text-white' 
              : 'text-foreground'
          }`}>LessonScore</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-base font-bold">
          {navigation.map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className={`transition-colors hover:text-primary ${
                isHomePage && !isScrolled 
                  ? 'text-white dark:text-white' 
                  : 'text-foreground/80'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle 
            className={`${
              isHomePage && !isScrolled 
                ? 'text-white hover:text-white hover:bg-white/10' 
                : 'text-foreground hover:text-foreground hover:bg-muted'
            }`}
          />
          
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                className={`${
                  isHomePage && !isScrolled 
                    ? 'text-white hover:text-white hover:bg-white/10' 
                    : 'text-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="/images/icon-128x128.png"
                  alt="lessonscore Logo"
                  className="h-8 w-8 dark:invert dark:hue-rotate-180"
                />
                <span className="text-xl font-bold font-heading text-foreground">LessonScore</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-2 py-1 text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
