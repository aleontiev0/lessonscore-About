import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Battery, Wifi, Trophy } from "lucide-react";

interface DigitalMaterialsGameProps {
  isTablet?: boolean;
}

interface Shape {
  id: number;
  type: "square" | "circle" | "triangle";
  color: "red" | "green" | "blue";
  x: number;
  y: number;
}

const DigitalMaterialsGame = ({ isTablet = true }: DigitalMaterialsGameProps) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakingShape, setShakingShape] = useState<number | null>(null);
  const [expandedShape, setExpandedShape] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const generateShapes = () => {
    const positions = [
      { x: 25, y: 45 },
      { x: 50, y: 45 },
      { x: 75, y: 45 }
    ];
    
    // Randomly choose position for the correct shape
    const correctPosition = Math.floor(Math.random() * 3);
    
    // Randomly choose between circle and triangle, and green or blue
    const shapeTypes = ["circle", "triangle"] as const;
    const colors = ["green", "blue"] as const;
    const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newShapes: Shape[] = positions.map((pos, index) => {
      if (index === correctPosition) {
        return { id: index + 1, type: randomType, color: randomColor, x: pos.x, y: pos.y };
      } else {
        return { id: index + 1, type: "square", color: "red", x: pos.x, y: pos.y };
      }
    });
    
    setShapes(newShapes);
  };

  useEffect(() => {
    generateShapes();
  }, []);

  const handleShapeClick = (shape: Shape) => {
    if (shape.color === "red") {
      setShakingShape(shape.id);
      setTimeout(() => setShakingShape(null), 600);
    } else {
      setExpandedShape(shape.id);
      setShowConfetti(true);
      setScore(prev => prev + 1);
      setTimeout(() => {
        setShowConfetti(false);
        setTimeout(() => {
          setExpandedShape(null);
          generateShapes();
        }, 200);
      }, 3000);
    }
  };

  return (
    <div className={`relative bg-black rounded-3xl ${isTablet ? 'w-80 h-52' : 'w-56 h-96'} mx-auto overflow-hidden shadow-2xl`} style={{
      border: '6px solid #333',
      borderBottomWidth: isTablet ? '6px' : '12px',
      borderRadius: '24px'
    }}>
      {/* Device Frame Header */}
      <div className="bg-white dark:bg-transparent h-8 flex items-center justify-between px-4 relative z-10">
        <div className="flex items-center gap-1">
          <span className="text-black dark:text-white text-xs font-medium">04:43</span>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="h-3 w-3 text-black dark:text-white" />
          <Battery className="h-3 w-3 text-green-500 fill-current" />
        </div>
      </div>
      
      {/* Home Button - only for mobile/portrait */}
      {!isTablet && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-500"></div>
      )}

      {/* Score Counter */}
      <div className="absolute top-10 right-4 z-20 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold flex items-center gap-1">
        <Trophy className="h-3 w-3 text-yellow-500" />
        {score}
      </div>

      {/* Screen Content */}
      <div className="bg-white dark:bg-black h-full flex items-center justify-center relative">
        {showConfetti && (
          <Confetti
            width={isTablet ? 320 : 224}
            height={isTablet ? 208 : 384}
            recycle={false}
            numberOfPieces={900}
            gravity={0.3}
          />
        )}
        
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${shapes[2]?.x}-${expandedShape}`}
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {expandedShape ? (
                <motion.div
                  className={`w-32 h-32 ${
                    shapes.find(s => s.id === expandedShape)?.type === "triangle" 
                      ? "" 
                      : "rounded-full"
                  }`}
                  style={{
                    background: shapes.find(s => s.id === expandedShape)?.color === "green" 
                      ? "linear-gradient(135deg, #22c55e, #14b8a6)" 
                      : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                    ...(shapes.find(s => s.id === expandedShape)?.type === "triangle" && {
                      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                      borderRadius: "0"
                    }),
                    position: "absolute",
                    left: "50%",
                    top: isTablet ? "calc(50% + 16px)" : "calc(50% + 16px)",
                    transform: "translate(-50%, -50%)"
                  }}
                  initial={{ scale: 0.2 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ 
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    backgroundPosition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                />
              ) : (
                <div className="flex items-center justify-center gap-8">
                  {shapes.map((shape) => (
                    <motion.div
                      key={shape.id}
                      className={`cursor-pointer ${
                        shape.type === "square" ? "w-8 h-8" : 
                        shape.type === "circle" ? "w-8 h-8 rounded-full" : "w-0 h-0"
                      }`}
                      style={{
                        ...(shape.type === "circle" && {
                          backgroundColor: shape.color === "green" ? "#22c55e" : "#3b82f6"
                        }),
                        ...(shape.type === "triangle" && {
                          borderLeft: "16px solid transparent",
                          borderRight: "16px solid transparent",
                          borderBottom: `28px solid ${shape.color === "green" ? "#22c55e" : "#3b82f6"}`
                        }),
                        ...(shape.type === "square" && {
                          backgroundColor: "#ef4444"
                        })
                      }}
                      animate={shakingShape === shape.id ? {
                        x: [-5, 5, -5, 5, 0],
                        transition: { duration: 0.6 }
                      } : {}}
                      onClick={() => handleShapeClick(shape)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DigitalMaterialsGame;