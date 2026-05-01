
import { Button } from "@/components/ui/button";

const Hero = () => {
  const videoId = "sMJZzOKdiKo";
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

  return (
    <section 
      className="relative h-screen flex items-center justify-center text-center overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.77vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2"
          src={videoSrc}
          title="Hero Video Background"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-white px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 max-w-4xl">
          A New Chapter in Special Education
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-white/90">
          Revolutionizing special education and ABA therapy with engaging, effective learning experiences for children with special needs.
        </p>
        <Button size="lg" variant="hero" className="text-lg" asChild>
          <a href="/how-it-works">Discover More</a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
