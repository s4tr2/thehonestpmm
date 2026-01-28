import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BattleCard from "@/pages/battlecard";
import Careers from "@/pages/careers";
import LaunchSimulator from "@/pages/launch-simulator";
import BuzzwordBlaster from "@/pages/buzzword-blaster";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/battle-card" component={BattleCard} />
      <Route path="/careers" component={Careers} />
      <Route path="/launch-simulator" component={LaunchSimulator} />
      <Route path="/buzzword-blaster" component={BuzzwordBlaster} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
