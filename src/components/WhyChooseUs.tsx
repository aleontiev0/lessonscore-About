
import { Users } from "lucide-react";
import SVGIcon from "./SVGIcon";
import anyStudentLight from "@/assets/any-student-final-light.svg";
import anyStudentDark from "@/assets/any-student-final-dark.svg";
import noLaminatedCardsLight from "@/assets/no-laminated-cards-final-light.svg";
import noLaminatedCardsDark from "@/assets/no-laminated-cards-final-dark.svg";
import lifetimeExperienceLight from "@/assets/lifetime-experience-light.svg";
import lifetimeExperienceDark from "@/assets/lifetime-experience-dark.svg";

const benefits = [
  {
    icon: <SVGIcon lightSrc={noLaminatedCardsLight} darkSrc={noLaminatedCardsDark} alt="No More Laminated Cards" className="h-8 w-8" />,
    title: "No More Laminated Cards",
    description: "Say goodbye to managing physical materials. All your resources are digital and accessible anytime.",
  },
  {
    icon: <SVGIcon lightSrc={anyStudentLight} darkSrc={anyStudentDark} alt="Any student, any asset" className="h-8 w-8" />,
    title: "Any student, any asset",
    description: "LessonScore gives you complete control over the lesson to support any student's need",
  },
  {
    icon: <SVGIcon lightSrc={lifetimeExperienceLight} darkSrc={lifetimeExperienceDark} alt="A lifetime of experience" className="h-8 w-8" />,
    title: "A lifetime of experience",
    description: "Built by parents of an young adult autistic learner and endorsed by BCBAs as a leading solution",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Why Choose LessonScore?</h2>
          <p className="text-lg text-muted-foreground mt-2">A smarter, more effective approach to therapy.</p>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-6 p-4">
              <div className="flex-shrink-0 mt-1 bg-primary/10 rounded-full p-3">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading">{benefit.title}</h3>
                <p className="text-muted-foreground mt-1">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
