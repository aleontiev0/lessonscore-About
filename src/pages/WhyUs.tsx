import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users } from "lucide-react";
import SVGIcon from "@/components/SVGIcon";
import anyStudentLight from "@/assets/any-student-final-light.svg";
import anyStudentDark from "@/assets/any-student-final-dark.svg";
import noLaminatedCardsLight from "@/assets/no-laminated-cards-final-light.svg";
import noLaminatedCardsDark from "@/assets/no-laminated-cards-final-dark.svg";
import lifetimeExperienceLight from "@/assets/lifetime-experience-light.svg";
import lifetimeExperienceDark from "@/assets/lifetime-experience-dark.svg";

const benefits = [
  {
    icon: <SVGIcon lightSrc={noLaminatedCardsLight} darkSrc={noLaminatedCardsDark} alt="No More Laminated Cards" className="h-10 w-10" />,
    title: "No More Laminated Cards",
    description: "Say goodbye to managing physical materials. All your resources are digital and accessible anytime.",
  },
  {
    icon: <SVGIcon lightSrc={anyStudentLight} darkSrc={anyStudentDark} alt="Any student, any asset" className="h-10 w-10" />,
    title: "Any student, any asset",
    description: "LessonScore gives you complete control over the lesson to support any student's need",
  },
  {
    icon: <SVGIcon lightSrc={lifetimeExperienceLight} darkSrc={lifetimeExperienceDark} alt="A lifetime of experience" className="h-10 w-10" />,
    title: "A lifetime of experience",
    description: "Built by parents of an young adult autistic learner and endorsed by BCBAs as a leading solution",
  },
];

const WhyUs = () => {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Why Choose LessonScore?</h1>
              <p className="text-lg text-muted-foreground">A smarter, more effective approach to therapy.</p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 bg-card rounded-lg shadow-sm">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 rounded-full p-3">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-heading mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-lg">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WhyUs;