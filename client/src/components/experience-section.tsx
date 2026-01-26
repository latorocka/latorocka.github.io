import { Card, CardContent } from "@/components/ui/card";
import { Settings, Gamepad2, Brain, Plane, Car, BugOff, Landmark, Briefcase } from "lucide-react";
import { experiences } from "@/data/resume-data";

export default function ExperienceSection() {
  const getIcon = (index: number) => {
    // Check company type for appropriate icon
    const experience = experiences[index];
    if (!experience) return <Settings className="h-6 w-6 text-white" />;
    
    const company = experience.company.toLowerCase();
    
    if (company.includes("panasonic")) {
      return <Plane className="h-6 w-6 text-white" />;
    }
    if (company.includes("escape")) {
      return <Brain className="h-6 w-6 text-white" />;
    }
    if (company.includes("mercury")) {
      return <Car className="h-6 w-6 text-white" />;
    }
    if (company.includes("sqaas")) {
      return <BugOff className="h-6 w-6 text-white" />;
    }
    if (company.includes("tatum")) {
      return <Gamepad2 className="h-6 w-6 text-white" />;
    }
    if (company.includes("upkeep")) {
      return <Settings className="h-6 w-6 text-white" />;
    }
    return <Briefcase className="h-6 w-6 text-white" />;
  };

  const getIconColor = (index: number) => {
    const experience = experiences[index];
    if (!experience) return "bg-primary";
    
    const company = experience.company.toLowerCase();
    if (company.includes("panasonic")) return "bg-blue-600";
    if (company.includes("escape")) return "bg-purple-600";
    if (company.includes("mercury")) return "bg-green-600";
    if (company.includes("upkeep")) return "bg-blue-500";
    if (company.includes("sqaas")) return "bg-purple-500";
    if (company.includes("tatum")) return "bg-orange-500";
    
    const colors = [
      "bg-primary",
      "bg-accent", 
      "bg-green-500",
      "bg-secondary",
      "bg-purple-500",
      "bg-orange-500",
      "bg-blue-500"
    ];
    return colors[index] || "bg-primary";
  };

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-xl text-secondary">
            Progressive career growth in QA automation and software testing
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary hidden md:block"></div>
            
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex items-start mb-12">
                {/* Timeline icon */}
                <div className={`flex-shrink-0 w-16 h-16 ${getIconColor(index)} rounded-full flex items-center justify-center z-10`}>
                  {getIcon(index)}
                </div>
                
                {/* Experience card */}
                <Card className="ml-8 flex-1 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-bold">{experience.title}</h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        experience.type === 'current' 
                          ? 'text-primary bg-primary/10' 
                          : 'text-secondary bg-secondary/10'
                      }`}>
                        {experience.period}
                      </span>
                    </div>
                    <h4 className="text-lg text-accent font-medium mb-3">
                      {experience.company} - {experience.location}
                    </h4>
                    {experience.description && (
                      <p className="text-secondary mb-3 italic">{experience.description}</p>
                    )}
                    <ul className="text-secondary space-y-2">
                      {experience.responsibilities.map((responsibility, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mt-1 mr-3 text-sm">✓</span>
                          <span className="text-sm">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
