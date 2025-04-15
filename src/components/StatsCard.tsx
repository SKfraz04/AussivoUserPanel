
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

const StatsCard = ({
  icon,
  title,
  value,
  description,
  trend,
  className
}: StatsCardProps) => {
  return (
    <Card className={cn("dashboard-card overflow-hidden", className)}>
      <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="bg-svr-primary/10 p-2 rounded-full">{icon}</div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-2xl font-bold gradient-text">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-svr-success" : "text-svr-danger"
              )}
            >
              {trend.isPositive ? "+" : "-"}{trend.value}
            </span>
            <span className="text-xs text-muted-foreground ml-1">since last period</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
