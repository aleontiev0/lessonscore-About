import { useState } from "react";
import { Battery, Wifi, ChevronDown, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProgressTrackingGameProps {
  isTablet?: boolean;
}

const lessonsData = {
  "Animals": [
    { month: "Jan", completed: 12, avgScore: 65, milestone: false },
    { month: "Feb", completed: 8, avgScore: 70, milestone: false },
    { month: "Mar", completed: 15, avgScore: 72, milestone: true, milestoneText: "First Perfect Score!" },
    { month: "Apr", completed: 18, avgScore: 78, milestone: false },
    { month: "May", completed: 22, avgScore: 80, milestone: true, milestoneText: "100 Animals Learned!" },
    { month: "Jun", completed: 25, avgScore: 85, milestone: false }
  ],
  "People": [
    { month: "Jan", completed: 8, avgScore: 55, milestone: false },
    { month: "Feb", completed: 12, avgScore: 62, milestone: true, milestoneText: "Family Members Mastered!" },
    { month: "Mar", completed: 16, avgScore: 68, milestone: false },
    { month: "Apr", completed: 20, avgScore: 73, milestone: false },
    { month: "May", completed: 18, avgScore: 79, milestone: false },
    { month: "Jun", completed: 28, avgScore: 82, milestone: true, milestoneText: "Community Helpers Complete!" }
  ],
  "Nature": [
    { month: "Jan", completed: 15, avgScore: 72, milestone: false },
    { month: "Feb", completed: 18, avgScore: 75, milestone: false },
    { month: "Mar", completed: 12, avgScore: 78, milestone: false },
    { month: "Apr", completed: 24, avgScore: 80, milestone: true, milestoneText: "Seasons Expert!" },
    { month: "May", completed: 26, avgScore: 84, milestone: false },
    { month: "Jun", completed: 30, avgScore: 88, milestone: true, milestoneText: "Weather Wizard!" }
  ]
};

const ProgressTrackingGame = ({ isTablet = true }: ProgressTrackingGameProps) => {
  const [selectedLesson, setSelectedLesson] = useState<string>("Animals");
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; data?: any }>({
    visible: false,
    x: 0,
    y: 0
  });

  const data = lessonsData[selectedLesson as keyof typeof lessonsData];
  const maxCompleted = Math.max(...Object.values(lessonsData).flat().map(d => d.completed));
  const maxScore = Math.max(...Object.values(lessonsData).flat().map(d => d.avgScore));

  const handleBarClick = (item: any, index: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      data: item
    });
    setSelectedBar(index);
    
    setTimeout(() => {
      setTooltip(prev => ({ ...prev, visible: false }));
      setSelectedBar(null);
    }, 3000);
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
      {!isTablet && false && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full border-2 border-gray-500"></div>
      )}

      {/* Screen Content */}
      <div className="bg-white dark:bg-black h-full p-4">
        <div className="mb-2">
          <Select value={selectedLesson} onValueChange={setSelectedLesson}>
            <SelectTrigger className="w-full h-6 text-xs bg-transparent border-none shadow-none">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(lessonsData).map((lesson) => (
                <SelectItem key={lesson} value={lesson} className="text-xs">
                  {lesson}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-full flex flex-col pb-8">
          {/* Chart Container */}
          <div className="flex-1 relative">
            {/* Y-axis */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
              <span>30</span>
              <span>20</span>
              <span>10</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-6 h-full flex items-end justify-between gap-1 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[25, 50, 75].map((percent) => (
                  <div
                    key={percent}
                    className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                    style={{ bottom: `${percent}%` }}
                  />
                ))}
              </div>
              
              {/* Continuous line connecting all points */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full">
                <path
                  d={data.map((item, index) => {
                    const x = ((index + 1) / (data.length + 1)) * 100;
                    const y = 100 - (item.avgScore / maxScore) * 60;
                    return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                  }).join(' ')}
                  stroke="#22c55e"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              
              {data.map((item, index) => {
                const barHeight = (item.completed / maxCompleted) * 60;
                const lineY = (item.avgScore / maxScore) * 60;
                const xPosition = ((index + 1) / (data.length + 1)) * 100;
                
                return (
                  <div key={item.month} className="flex flex-col items-center flex-1 relative h-full justify-end">
                    {/* Line point positioned on the line */}
                    <div 
                      className="absolute w-2 h-2 bg-green-500 rounded-full z-10 cursor-pointer hover:scale-125 transition-transform"
                      style={{ 
                        bottom: `${lineY}%`,
                        left: '50%',
                        transform: 'translateX(-50%)'
                      }}
                      onClick={(e) => handleBarClick(item, index, e)}
                    />
                    
                    {/* Milestone badge */}
                    {item.milestone && (
                      <div 
                        className="absolute z-20 cursor-pointer bg-purple-500 rounded-full w-4 h-4 flex items-center justify-center"
                        style={{ 
                          bottom: '15px',
                          left: '50%',
                          transform: 'translateX(-50%)'
                        }}
                        onClick={(e) => handleBarClick(item, index, e)}
                      >
                        <Zap className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    )}
                    
                    {/* Bar */}
                    <div
                      className={`bg-blue-500 cursor-pointer transition-all duration-200 hover:bg-blue-400 ${
                        selectedBar === index ? 'opacity-80 scale-105' : ''
                      }`}
                      style={{ 
                        height: `${barHeight}%`, 
                        minHeight: '2px',
                        width: '40%'
                      }}
                      onClick={(e) => handleBarClick(item, index, e)}
                    />
                    
                    {/* Month label */}
                    <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Avg Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.data && (
        <div 
          className="fixed bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-xl z-50 text-xs pointer-events-none backdrop-blur-sm"
          style={{ 
            left: tooltip.x - 60,
            top: tooltip.y - 80,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="space-y-1">
            <p className="font-bold text-sm text-gray-900 dark:text-white">{tooltip.data.month}</p>
            <p className="text-blue-600 dark:text-blue-400">📊 Completed: {tooltip.data.completed} times</p>
            <p className="text-green-600 dark:text-green-400">🎯 Avg Score: {tooltip.data.avgScore}%</p>
            {tooltip.data.milestone && (
              <p className="text-purple-600 dark:text-purple-400 font-semibold">🏆 {tooltip.data.milestoneText}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTrackingGame;