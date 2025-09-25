import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Area Not Found</h2>
          <p className="text-muted-foreground">
            The requested security zone does not exist or has been moved to a classified location.
          </p>
        </div>
        <Button asChild className="glow-primary">
          <a href="/">Return to Safety HQ</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
