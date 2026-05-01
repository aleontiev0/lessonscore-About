
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    step: "1",
    title: "Just Start Using the App",
    description: "Start using the app for free, no signup required! Access our core features immediately.",
  },
  {
    step: "2",
    title: "Customize Lessons",
    description: "Use our tools to tailor lessons and activities to the specific needs of your child.",
  },
  {
    step: "3",
    title: "Track & Celebrate",
    description: "Monitor progress with our intuitive dashboard and celebrate every milestone achieved.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">How It Works</h2>
          <p className="text-lg text-muted-foreground mt-2">A simple, three-step process to get started.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <Card key={step.step} className="text-center bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 relative pt-8">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold ring-8 ring-background">
                {step.step}
              </div>
              <CardHeader>
                <CardTitle className="font-heading text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
