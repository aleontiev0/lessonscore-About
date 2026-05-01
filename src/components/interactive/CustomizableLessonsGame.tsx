import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Battery, Wifi, Maximize, Palette, Zap, RotateCw, Shuffle, MoveRight, Square, Circle } from "lucide-react";

interface CustomizableLessonsGameProps {
  isTablet?: boolean;
}

const CustomizableLessonsGame = ({ isTablet = true }: CustomizableLessonsGameProps) => {
  const [size, setSize] = useState([50]);
  const [sides, setSides] = useState([3]);
  const [borderRadius, setBorderRadius] = useState([10]);
  const [color, setColor] = useState([180]);
  const [speed, setSpeed] = useState([2]);
  const [shapeCount, setShapeCount] = useState([3]);
  const [isMoving, setIsMoving] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [motionPattern, setMotionPattern] = useState<'random' | 'circle' | 'figure8' | 'box'>('random');
  const [shapes, setShapes] = useState([{ x: 50, y: 50, rotation: 0 }]);
  const [velocities, setVelocities] = useState([{ x: 2, y: 1.5 }]);
  const [rainbowOffset, setRainbowOffset] = useState(0);

  const shapeSize = size[0];
  const shapeSides = sides[0];
  const shapeBorderRadius = borderRadius[0];
  const shapeColor = color[0];
  const shapeSpeed = speed[0];
  const numShapes = shapeCount[0];

  // Update shapes array when count changes
  useEffect(() => {
    const newShapes = [];
    const newVelocities = [];
    for (let i = 0; i < numShapes; i++) {
      const angle = (i / numShapes) * 2 * Math.PI;
      const radius = numShapes > 1 ? 20 : 0;
      newShapes.push({
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
        rotation: 0
      });
      newVelocities.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4
      });
    }
    setShapes(newShapes);
    setVelocities(newVelocities);
  }, [numShapes]);

  // Animation for bouncing shapes
  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setShapes(prevShapes => {
        return prevShapes.map((shape, index) => {
          if (motionPattern !== 'random') {
            // Coordinated movement patterns
            const time = Date.now() / 1000;
            const radius = 20;
            const centerX = 50;
            const centerY = 50;
            
            if (motionPattern === 'circle') {
              // 1.5x larger radius
              const circleRadius = 30;
              if (numShapes === 1) {
                // Single shape moves in circle
                const angle = time * shapeSpeed;
                return {
                  ...shape,
                  x: centerX + Math.cos(angle) * circleRadius,
                  y: centerY + Math.sin(angle) * circleRadius
                };
              } else {
                // Multiple shapes move in formation
                const baseAngle = (index / numShapes) * 2 * Math.PI;
                const angle = baseAngle + time * shapeSpeed;
                return {
                  ...shape,
                  x: centerX + Math.cos(angle) * circleRadius,
                  y: centerY + Math.sin(angle) * circleRadius
                };
              }
            } else if (motionPattern === 'figure8') {
              // Each element moves in figure 8 pattern, one after the other
              const figure8Radius = 22.5; // 1.5x larger
              const t = time * shapeSpeed + (index * 0.8); // Stagger the timing
              return {
                ...shape,
                x: centerX + figure8Radius * Math.sin(t),
                y: centerY + figure8Radius * Math.sin(t) * Math.cos(t)
              };
            } else if (motionPattern === 'box') {
              // Each element moves in box pattern, spaced around different parts of the box edge
              const boxSize = 30; // 1.5x larger
              const cycleTime = 8; // Complete cycle time
              
              // Distribute starting positions around the box perimeter
              const positions = ['top', 'right', 'bottom', 'left'];
              const edgePositions = ['start', 'middle', 'end'];
              
              // Calculate which edge and position for this element
              const totalPositions = positions.length * edgePositions.length;
              const positionIndex = index % totalPositions;
              const edgeIndex = Math.floor(positionIndex / edgePositions.length);
              const edgePositionIndex = positionIndex % edgePositions.length;
              
              const edge = positions[edgeIndex];
              const edgePosition = edgePositions[edgePositionIndex];
              
              const t = (time * shapeSpeed + (index * 2)) % cycleTime;
              let x = centerX, y = centerY;
              
              // Calculate base position offset based on edge position
              let offset = 0;
              if (edgePosition === 'start') offset = -boxSize * 0.6;
              else if (edgePosition === 'middle') offset = 0;
              else offset = boxSize * 0.6;
              
              if (t < 2) {
                // Move to next edge clockwise
                if (edge === 'top') {
                  x = centerX + offset;
                  y = centerY - boxSize + (t / 2) * (boxSize * 0.5);
                } else if (edge === 'right') {
                  x = centerX + boxSize - (t / 2) * (boxSize * 0.5);
                  y = centerY + offset;
                } else if (edge === 'bottom') {
                  x = centerX - offset;
                  y = centerY + boxSize - (t / 2) * (boxSize * 0.5);
                } else { // left
                  x = centerX - boxSize + (t / 2) * (boxSize * 0.5);
                  y = centerY - offset;
                }
              } else if (t < 4) {
                // Continue to corner
                const progress = (t - 2) / 2;
                if (edge === 'top') {
                  x = centerX + offset + progress * (boxSize - Math.abs(offset));
                  y = centerY - boxSize * 0.5;
                } else if (edge === 'right') {
                  x = centerX + boxSize * 0.5;
                  y = centerY + offset + progress * (boxSize - Math.abs(offset));
                } else if (edge === 'bottom') {
                  x = centerX - offset - progress * (boxSize - Math.abs(offset));
                  y = centerY + boxSize * 0.5;
                } else { // left
                  x = centerX - boxSize * 0.5;
                  y = centerY - offset - progress * (boxSize - Math.abs(offset));
                }
              } else if (t < 6) {
                // Move to next edge
                const progress = (t - 4) / 2;
                if (edge === 'top') {
                  x = centerX + boxSize - progress * (boxSize * 0.5);
                  y = centerY - boxSize * 0.5 + progress * boxSize;
                } else if (edge === 'right') {
                  x = centerX + boxSize * 0.5 - progress * boxSize;
                  y = centerY + boxSize - progress * (boxSize * 0.5);
                } else if (edge === 'bottom') {
                  x = centerX - boxSize + progress * (boxSize * 0.5);
                  y = centerY + boxSize * 0.5 - progress * boxSize;
                } else { // left
                  x = centerX - boxSize * 0.5 + progress * boxSize;
                  y = centerY - boxSize + progress * (boxSize * 0.5);
                }
              } else {
                // Return to starting position
                const progress = (t - 6) / 2;
                if (edge === 'top') {
                  x = centerX + boxSize * 0.5 - progress * (boxSize * 0.5 - offset);
                  y = centerY + boxSize * 0.5 - progress * (boxSize + boxSize * 0.5);
                } else if (edge === 'right') {
                  x = centerX - boxSize * 0.5 + progress * (boxSize + boxSize * 0.5);
                  y = centerY + boxSize * 0.5 - progress * (boxSize * 0.5 - offset);
                } else if (edge === 'bottom') {
                  x = centerX - boxSize * 0.5 + progress * (boxSize * 0.5 + offset);
                  y = centerY - boxSize * 0.5 + progress * (boxSize + boxSize * 0.5);
                } else { // left
                  x = centerX + boxSize * 0.5 - progress * (boxSize + boxSize * 0.5);
                  y = centerY - boxSize * 0.5 + progress * (boxSize * 0.5 + offset);
                }
              }
              
              return { ...shape, x, y };
            }
          } else {
            // Random bouncing movement
            const velocity = velocities[index];
            let newX = shape.x + velocity.x * shapeSpeed; // 2x faster movement
            let newY = shape.y + velocity.y * shapeSpeed;

            // Calculate shape bounds more accurately
            const margin = shapeSize / 6;
            
            // Bounce off walls
            setVelocities(prevVel => {
              const newVel = [...prevVel];
              if (newX <= margin || newX >= 100 - margin) {
                newVel[index] = { ...newVel[index], x: -newVel[index].x };
              }
              if (newY <= margin || newY >= 90 - margin) {
                newVel[index] = { ...newVel[index], y: -newVel[index].y };
              }
              return newVel;
            });

            // Keep shape within bounds with extra bottom padding
            newX = Math.max(margin, Math.min(100 - margin, newX));
            newY = Math.max(margin, Math.min(90 - margin, newY));

            return { ...shape, x: newX, y: newY };
          }
          
          return shape;
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isMoving, shapeSize, velocities, shapeSpeed, motionPattern, numShapes]);

  // Rotation animation
  useEffect(() => {
    if (!isRotating) return;

    const interval = setInterval(() => {
      setShapes(prevShapes => 
        prevShapes.map(shape => ({
          ...shape,
          rotation: (shape.rotation + shapeSpeed * 2) % 360 // 2x faster rotation
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isRotating, shapeSpeed]);

  // Rainbow animation for max color value
  useEffect(() => {
    if (shapeColor !== 360) return;

    const interval = setInterval(() => {
      setRainbowOffset(prev => (prev + shapeSpeed * 2) % 360); // 2x faster rainbow
    }, 50);

    return () => clearInterval(interval);
  }, [shapeColor, shapeSpeed]);

  const getShapeClipPath = (sides: number) => {
    if (sides === 0) return "polygon(50% 0%, 45% 100%, 55% 100%)"; // Thin triangle
    if (sides === 1) return "polygon(50% 0%, 0% 100%, 100% 100%)"; // Equilateral triangle
    if (sides === 2) return null; // Square - use borderRadius instead
    if (sides === 3) return "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"; // Pentagon
    if (sides === 4) return "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"; // Octagon
    if (sides === 5) return "polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)"; // More rounded octagon
    if (sides >= 6) return null; // Circle - use borderRadius instead
    return null; // Default
  };

  const shuffleAllParameters = () => {
    setSize([Math.floor(Math.random() * 61) + 20]); // 20-80
    setSides([Math.floor(Math.random() * 7)]); // 0-6
    setBorderRadius([Math.floor(Math.random() * 51)]); // 0-50
    setColor([Math.floor(Math.random() * 37) * 10]); // 0-360 in steps of 10
    setSpeed([Math.floor(Math.random() * 10) + 1]); // 1-10
    setShapeCount([Math.floor(Math.random() * 12) + 1]); // 1-12
    setIsMoving(Math.random() > 0.5); // Random true/false
    setIsRotating(Math.random() > 0.5); // Random true/false
    const patterns = ['random', 'circle', 'figure8', 'box'] as const;
    setMotionPattern(patterns[Math.floor(Math.random() * patterns.length)]);
  };

  return (
    <div className={`relative bg-black rounded-3xl ${isTablet ? 'w-80 h-52' : 'w-56 h-96'} mx-auto overflow-hidden shadow-2xl`} style={{
      border: '6px solid #333',
      borderBottomWidth: isTablet ? '6px' : '20px',
      borderRadius: '24px'
    }}>
      {/* Device Frame Header */}
      <div className="bg-white dark:bg-transparent h-8 flex items-center justify-between px-3 pt-2 relative z-10">
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

      {/* Screen Content */}
      <div className="bg-white dark:bg-black h-full p-4">
        <div className={`flex ${isTablet ? 'flex-row h-full' : 'flex-col h-full'} gap-3`}>
          {/* Controls */}
          <div className={`${isTablet ? 'w-1/2' : 'h-1/2'} space-y-3`}>
            <div className="flex items-center gap-2">
              <Maximize className="h-3 w-3 text-gray-600 dark:text-gray-300" />
              <Slider
                value={size}
                onValueChange={setSize}
                max={80}
                min={20}
                step={5}
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-gray-600 dark:border-b-gray-300" />
              </div>
              <Slider
                value={sides}
                onValueChange={setSides}
                max={6}
                min={0}
                step={1}
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Palette className="h-3 w-3 text-gray-600 dark:text-gray-300" />
              <Slider
                value={color}
                onValueChange={setColor}
                max={360}
                min={0}
                step={10}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-gray-600 dark:text-gray-300" />
              <Slider
                value={speed}
                onValueChange={setSpeed}
                max={10}
                min={1}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-3 w-3 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-1 h-1 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                </div>
              </div>
              <Slider
                value={shapeCount}
                onValueChange={setShapeCount}
                max={12}
                min={1}
                step={1}
                className="flex-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="relative">
                <Switch 
                  checked={isMoving}
                  onCheckedChange={setIsMoving}
                  className="scale-75"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <MoveRight className={`h-2 w-2 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isMoving ? 'translate-x-2' : '-translate-x-2'}`} />
                </div>
              </div>
              <div className="relative">
                <Switch 
                  checked={isRotating}
                  onCheckedChange={setIsRotating}
                  className="scale-75"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <RotateCw className={`h-2 w-2 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${isRotating ? 'translate-x-2' : '-translate-x-2'}`} />
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                     {motionPattern === 'random' && <Shuffle className="h-3 w-3 text-gray-600 dark:text-gray-300" />}
                     {motionPattern === 'circle' && <Circle className="h-3 w-3 text-gray-600 dark:text-gray-300" />}
                     {motionPattern === 'figure8' && <span className="text-gray-600 dark:text-gray-300 text-xs font-bold">∞</span>}
                     {motionPattern === 'box' && <Square className="h-3 w-3 text-gray-600 dark:text-gray-300" />}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 p-1 min-w-0 w-auto">
                  <DropdownMenuItem onClick={() => setMotionPattern('random')} className="flex items-center justify-center cursor-pointer p-2 min-w-0 w-8 h-8">
                    <Shuffle className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setMotionPattern('circle')} className="flex items-center justify-center cursor-pointer p-2 min-w-0 w-8 h-8">
                    <Circle className="h-4 w-4" />
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setMotionPattern('figure8')} className="flex items-center justify-center cursor-pointer p-2 min-w-0 w-8 h-8">
                    <span className="text-base font-bold">∞</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setMotionPattern('box')} className="flex items-center justify-center cursor-pointer p-2 min-w-0 w-8 h-8">
                    <Square className="h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Shape Display */}
          <div className={`${isTablet ? 'w-1/2' : 'h-1/2'} relative overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-lg pb-4`}>
            {shapes.map((shape, index) => {
              const isRainbow = shapeColor === 360;
              const currentHue = isRainbow ? (rainbowOffset + index * 60) % 360 : shapeColor;
              const glowIntensity = isRainbow ? 40 : 12;
              
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-100 ease-out"
                  style={{
                    width: `${shapeSize}px`,
                    height: `${shapeSize}px`,
                    left: `${shape.x}%`,
                    top: `${shape.y}%`,
                    transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
                    background: isRainbow 
                      ? `linear-gradient(45deg, hsl(${currentHue}, 80%, 60%), hsl(${(currentHue + 60) % 360}, 80%, 60%), hsl(${(currentHue + 120) % 360}, 80%, 60%))`
                      : `hsl(${shapeColor}, 70%, 60%)`,
                    boxShadow: isRainbow 
                      ? `0 0 ${glowIntensity}px hsl(${currentHue}, 80%, 60%), 0 0 ${glowIntensity * 2}px hsl(${(currentHue + 120) % 360}, 80%, 60%)`
                      : `0 4px 12px hsl(${shapeColor}, 70%, 60%, 0.3)`,
                    borderRadius: shapeSides === 2 ? '0%' : (shapeSides >= 6 ? '50%' : `${shapeBorderRadius}%`),
                    clipPath: getShapeClipPath(shapeSides) || 'none',
                    filter: isRainbow ? 'brightness(1.2)' : 'none'
                  }}
                />
              );
            })}
            
            {/* Shuffle Button */}
            <button
              onClick={shuffleAllParameters}
              className="absolute bottom-2 right-0 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Shuffle className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizableLessonsGame;