
import familyIcon from "../assets/family-new.svg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src={familyIcon} alt="Family" className="h-48 w-48 transform scale-125" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Built by a family, for families.</h2>
          <p className="text-lg text-foreground/80 mt-4 leading-relaxed">
            LessonScore was born from a personal journey. My dad and I created this app for my brother. We wanted to build a tool that was not only effective but also full of the warmth, patience, and understanding we knew he deserved. Now, we want to share it with other families on a similar path.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
