import { Mail, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/resume-data";

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="pt-20 pb-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Modern developer workspace" 
          className="w-full h-full object-cover opacity-5" 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-in slide-in-from-left duration-800">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              QA Automation Engineer & 
              <span className="text-primary">Developer</span>
            </h1>
            
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              Experienced in developing automated test suites, API testing, and mobile QA with expertise in 
              <span className="text-accent font-medium"> Java</span>, 
              <span className="text-accent font-medium"> JavaScript</span>, and 
              <span className="text-accent font-medium"> Python</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection("#contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                size="lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </Button>
              <Button 
                onClick={() => scrollToSection("#projects")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                size="lg"
              >
                <Code className="mr-2 h-4 w-4" />
                View My Work
              </Button>
            </div>
            
            <div className="flex items-center gap-6 mt-8 text-secondary">
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">📞</span>
                <span>{personalInfo.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="animate-in fade-in duration-1000">
            <div className="relative">
              {/* Very subtle professional border */}
              <div className="relative border border-white/5 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/20 to-slate-800/10 p-1">
                <img 
                  src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional software engineer at modern workstation with multiple monitors and clean setup" 
                  className="rounded-2xl shadow-2xl w-full" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
