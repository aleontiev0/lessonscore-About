import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    step: "1",
    title: "Create Lessons",
    description: "Quickly and easily use the LessonScore app to create lesson with custom targets and resources",
    gif: "https://lessonscore.com/img/step1-add-lesson.gif"
  },
  {
    step: "2",
    title: "Just press Play",
    description: "Students can browse a grid of available lessons and play through them by clicking in.",
    gif: "https://lessonscore.com/img/step2-play-lesson.gif"
  },
  {
    step: "3",
    title: "Track and Adjust",
    description: "View detailed progress reports, share results with specialists, adjust learning plans based on performance, and keep going!",
    gif: "https://lessonscore.com/img/step3-view-progress.gif"
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">How It Works</h1>
              <p className="text-lg text-muted-foreground">A simple, three-step process to get started with LessonScore.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-6xl mx-auto">
              {steps.map((step) => (
                <Card key={step.step} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 relative pt-8 flex flex-col h-full">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold ring-8 ring-background">
                    {step.step}
                  </div>
                  <CardHeader className="flex-shrink-0">
                    <CardTitle className="font-heading text-xl mb-4">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <div className="text-muted-foreground text-base leading-relaxed mb-6 flex-grow">{step.description}</div>
                    <div className="rounded-lg overflow-hidden mt-auto">
                      <img 
                        src={step.gif} 
                        alt={`${step.title} demonstration`}
                        className="w-full h-auto"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;