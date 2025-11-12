import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import TempMail from "@/pages/tools/TempMail";
import PasswordGenerator from "@/pages/tools/PasswordGenerator";
import QRMaker from "@/pages/tools/QRMaker";
import ImageCompressor from "@/pages/tools/ImageCompressor";
import Blogs from "@/pages/Blogs";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/tools" component={Tools} />
      <Route path="/tools/temp-mail" component={TempMail} />
      <Route path="/tools/password-generator" component={PasswordGenerator} />
      <Route path="/tools/qr-maker" component={QRMaker} />
      <Route path="/tools/image-compressor" component={ImageCompressor} />
      <Route path="/blogs" component={Blogs} />
      <Route path="/blogs/:slug" component={BlogPost} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
