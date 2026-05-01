
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main>
        <Hero />
        <KeyFeatures />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
