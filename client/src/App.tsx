import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "@/lib/queryClient";
import Index from "./pages/Index";
import Xizmatlar from "./pages/Xizmatlar";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Haqida from "./pages/Haqida";
import Aloqa from "./pages/Aloqa";
import CaseStudies from "./pages/CaseStudies";
import FAQ from "./pages/FAQ";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <Router>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/xizmatlar" component={Xizmatlar} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={Blog} />
          <Route path="/haqida" component={Haqida} />
          <Route path="/aloqa" component={Aloqa} />
          <Route path="/case-studies/:slug?" component={CaseStudies} />
          <Route path="/faq" component={FAQ} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;