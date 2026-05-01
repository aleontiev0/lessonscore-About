import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header />
      <main className="pt-20">
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-8">Privacy Policy</h1>
              <div className="text-lg text-muted-foreground">
                <p>Coming soon!</p>
                <p className="mt-4">Our privacy policy is currently being finalized and will be available shortly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;