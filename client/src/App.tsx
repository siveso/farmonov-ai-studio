import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Xizmatlar from "./pages/Xizmatlar";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Haqida from "./pages/Haqida";
import Aloqa from "./pages/Aloqa";
import CaseStudies from "./pages/CaseStudies";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/xizmatlar" component={Xizmatlar} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/blog" component={Blog} />
            <Route path="/haqida" component={Haqida} />
            <Route path="/aloqa" component={Aloqa} />
            <Route path="/case-studies/:slug?" component={CaseStudies} />
            <Route path="/faq" component={FAQ} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
