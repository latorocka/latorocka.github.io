import { Card, CardContent } from "@/components/ui/card";
import { Cog, Smartphone, Server, Brain } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      icon: <Cog className="h-6 w-6" />,
      title: "Automation Expertise",
      description: "Specialized in Selenium, Cypress.io, and building test frameworks from scratch",
      color: "primary"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Testing",
      description: "Extensive experience with Android Studio and mobile application testing",
      color: "accent"
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "API Testing", 
      description: "Proficient in Postman and automated API testing for backend validation",
      color: "success"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Testing",
      description: "Recent experience testing LLM responses and AI-driven applications",
      color: "yellow"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Passionate QA Automation Engineer with extensive experience in developing robust test frameworks 
            and ensuring software quality across diverse platforms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Clean developer setup with modern equipment" 
              className="rounded-2xl shadow-xl w-full" 
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-secondary leading-relaxed mb-6">
                Currently pursuing a Computer Science degree at Long Beach City College with multiple certifications 
                in web development, PHP programming, and fullstack development. My experience spans from junior QA analyst 
                to senior automation engineer roles across various industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((highlight, index) => (
                <Card key={index} className="skill-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        highlight.color === 'primary' ? 'bg-primary/10 text-primary' :
                        highlight.color === 'accent' ? 'bg-accent/10 text-accent' :
                        highlight.color === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {highlight.icon}
                      </div>
                      <h4 className="font-bold ml-4">{highlight.title}</h4>
                    </div>
                    <p className="text-secondary text-sm">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
