
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import digitalMaterialsNew from "../assets/digital-materials-new.svg";
import progressTrackingNew from "../assets/progress-tracking-new.svg";
import customizableLessonsNew from "../assets/customizable-lessons-new.svg";
import DigitalMaterialsGame from "./interactive/DigitalMaterialsGame";
import ProgressTrackingGame from "./interactive/ProgressTrackingGame";
import CustomizableLessonsGame from "./interactive/CustomizableLessonsGame";

const features = [
  {
    id: 0,
    icon: <img src={digitalMaterialsNew} alt="Digital Materials" className="h-20 w-20" />,
    title: "Digital Learning Materials",
    description: "Replace cumbersome physical cards with dynamic and engaging digital resources.",
    component: DigitalMaterialsGame
  },
  {
    id: 1,
    icon: <img src={customizableLessonsNew} alt="Customizable Lessons" className="h-20 w-20" />,
    title: "Customizable Lessons",
    description: "Tailor learning experiences to each child's unique needs and goals.",
    component: CustomizableLessonsGame
  },
  {
    id: 2,
    icon: <img src={progressTrackingNew} alt="Progress Tracking" className="h-20 w-20" />,
    title: "Progress Tracking",
    description: "Easily monitor and analyze learning progress with intuitive, data-driven insights.",
    component: ProgressTrackingGame
  },
];

const KeyFeatures = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
    
    // Smooth scroll to section on mobile when expanding
    if (isMobile && expandedCard !== index) {
      setTimeout(() => {
        const section = document.getElementById('features');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };

  const handleClose = () => {
    setExpandedCard(null);
  };

  return (
    <section id="features" className="py-20 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">Digital. Customizable. Trackable</h2>
          <p className="text-lg text-muted-foreground mt-2">Everything you need for effective learning.</p>
        </div>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            {expandedCard !== null ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-lg shadow-xl p-6 relative h-[960px] md:h-[290px]"
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 items-start h-full`}>
                  <motion.div 
                    className={`${isMobile ? 'text-center' : 'w-1/3 text-left'}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <motion.div 
                      className={`${isMobile ? 'mx-auto' : 'float-left mr-4'} bg-primary/10 rounded-full p-4 w-fit mb-4`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {features[expandedCard].icon}
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-bold font-heading mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      {features[expandedCard].title}
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      {features[expandedCard].description}
                    </motion.p>
                  </motion.div>
                  
                  <motion.div 
                    className={`${isMobile ? 'w-full' : 'w-2/3'} flex justify-center`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {(() => {
                      const Component = features[expandedCard].component;
                      return <Component isTablet={!isMobile} />;
                    })()}
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[960px] md:h-[290px]"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    exit={expandedCard === index ? { 
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0 }
                    } : {
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card 
                      className="text-center bg-card shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-80 md:h-[290px]"
                      onClick={() => handleCardClick(index)}
                    >
                      <CardHeader>
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                          {feature.icon}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="font-heading mb-2 text-xl">{feature.title}</CardTitle>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
