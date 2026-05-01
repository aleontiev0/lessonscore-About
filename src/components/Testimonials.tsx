import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "LessonScore has completely transformed how we approach my son's therapy sessions. The digital materials are so much more engaging than the old laminated cards.",
    name: "Sarah Mitchell",
    role: "Parent",
    location: "Austin, TX"
  },
  {
    quote: "As a BCBA, I've seen many tools come and go. LessonScore stands out for its thoughtful design and real understanding of what families need.",
    name: "Dr. Maria Rodriguez",
    role: "Board Certified Behavior Analyst",
    location: "Phoenix, AZ"
  },
  {
    quote: "The progress tracking feature gives me insights I never had before. I can finally see patterns in my daughter's learning that help me support her better.",
    name: "James Chen",
    role: "Parent",
    location: "Seattle, WA"
  },
  {
    quote: "What I love most is how customizable everything is. Every child is different, and LessonScore gets that.",
    name: "Lisa Thompson",
    role: "Special Education Teacher",
    location: "Denver, CO"
  },
  {
    quote: "The fact that this was built by a family who truly understands the journey makes all the difference. You can feel the care in every feature.",
    name: "Michael Davis",
    role: "Parent",
    location: "Miami, FL"
  },
  {
    quote: "My clients' families are seeing better engagement and faster progress. LessonScore has become an essential part of our therapy toolkit.",
    name: "Dr. Jennifer Park",
    role: "Licensed Psychologist",
    location: "San Francisco, CA"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Trusted by Parents and Professionals</h2>
          <p className="text-lg text-muted-foreground mt-2">See what families and experts are saying about LessonScore.</p>
        </div>
        
        {/* Scrolling testimonials container */}
        <div className="relative overflow-hidden">
          {/* Wider gradient overlays for better fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/90 to-transparent z-10"></div>
          
          {/* Scrolling testimonials */}
          <div className="flex gap-6 animate-[slide_60s_linear_infinite]" style={{
            width: 'fit-content'
          }}>
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex-shrink-0 w-80 h-64 bg-card shadow-lg">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed text-foreground/90 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial, index) => (
              <Card key={`duplicate-${index}`} className="flex-shrink-0 w-80 h-64 bg-card shadow-lg">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed text-foreground/90 italic">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;