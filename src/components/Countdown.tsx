
import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string | number;
}

const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endTime = typeof targetDate === 'string' 
      ? new Date(targetDate).getTime() 
      : targetDate;
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;
      
      if (distance <= 0) {
        // Target date passed
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeRemaining({ days, hours, minutes, seconds });
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [targetDate]);
  
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="bg-svr-primary/10 rounded-md p-2">
        <div className="text-lg font-bold">{formatNumber(timeRemaining.days)}</div>
        <div className="text-xs text-muted-foreground">days</div>
      </div>
      <div className="bg-svr-primary/10 rounded-md p-2">
        <div className="text-lg font-bold">{formatNumber(timeRemaining.hours)}</div>
        <div className="text-xs text-muted-foreground">hours</div>
      </div>
      <div className="bg-svr-primary/10 rounded-md p-2">
        <div className="text-lg font-bold">{formatNumber(timeRemaining.minutes)}</div>
        <div className="text-xs text-muted-foreground">mins</div>
      </div>
      <div className="bg-svr-primary/10 rounded-md p-2">
        <div className="text-lg font-bold">{formatNumber(timeRemaining.seconds)}</div>
        <div className="text-xs text-muted-foreground">secs</div>
      </div>
    </div>
  );
};

export default Countdown;
