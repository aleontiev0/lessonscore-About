import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Pricing = () => {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
                Simple, Transparent Pricing
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start for free with everything you need. Upgrade to unlock advanced features for schools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Tier */}
              <Card className="relative border-2 border-primary/20 shadow-lg flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-heading">Free for Parents</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/forever</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Everything you need to get started
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col h-full">
                  <div className="space-y-3 flex-grow">
                    {[
                      "Lesson Builder",
                      "Lesson Player", 
                      "Multi Student Support",
                      "Data Analytics",
                      "Local-First (100% Private Data)",
                      "No Signup Required"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6" size="lg" asChild>
                    <a href="https://ls-vue.vercel.app" target="_blank" rel="noopener noreferrer">
                      Start Now
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Schools Tier */}
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-heading">Schools</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$10</span>
                    <span className="text-muted-foreground">/month/student</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Enhanced features for educational institutions
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>Everything in Free, plus:</strong>
                  </div>
                  <div className="space-y-3">
                    {[
                      "Data Synchronization (Multi-Device)",
                      "AI Automations for Rapid Lesson Creation",
                      "AI Analytics Engine",
                      "Personalized Teaching Plan Recommendations",
                      "Priority Support",
                      "Advanced Reporting"
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6" size="lg">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                Questions about pricing? <a href="#" className="text-primary hover:underline">Contact us</a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;