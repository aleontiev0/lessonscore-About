import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ourStoryHero from "../assets/our-story-hero.mp4";

const OurStory = () => {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main className="pt-20">
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">Our Story</h1>
              
              {/* Hero Video */}
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                <video 
                  src={ourStoryHero} 
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto object-cover"
                  style={{ minHeight: '300px', maxHeight: '400px' }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="text-lg text-foreground/80 leading-relaxed space-y-6">
                <p>
                  We are two parents with an autistic child who have engaged with dozens of BCBAs on a journey to help our child learn. Through this experience, we discovered the challenges that many families face when trying to access effective learning tools and resources.
                </p>
                <p>
                  Together with our other son, a software engineer, we built LessonScore to address these challenges. We wanted to create a tool that was not only effective but also full of the warmth, patience, and understanding we knew our child deserved. Our app was born from love, built with expertise, and designed with the real-world needs of families in mind.
                </p>
                <p>
                  Every feature in LessonScore has been thoughtfully designed based on our experiences working with professionals and watching our child grow and learn. We understand the journey because we've walked it ourselves, and now we want to share what we've learned with other families on a similar path. We hope it brings the same joy and progress to your family that it has brought to ours.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OurStory;