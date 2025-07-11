import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, FileText, Play } from "lucide-react";
import { projects } from "@/data/resume-data";

export default function ProjectsSection() {
  const getProjectIcon = (index: number) => {
    const icons = [Github, ExternalLink, Play];
    return icons[index] || Github;
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-secondary">
            Showcasing automation frameworks, testing tools, and development projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={project.id} className="project-card overflow-hidden">
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover" 
                />
                <Badge 
                  className="absolute top-4 right-4 bg-primary/90 text-primary-foreground"
                >
                  {project.category}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
                
                <p className="text-secondary mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center text-primary hover:text-primary-foreground hover:bg-primary"
                    onClick={() => {
                      if (project.githubUrl) {
                        window.open(project.githubUrl, '_blank');
                      }
                    }}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span className="text-sm">View Code</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center text-accent hover:text-accent-foreground hover:bg-accent"
                  >
                    {index === 0 && <ExternalLink className="mr-2 h-4 w-4" />}
                    {index === 1 && <FileText className="mr-2 h-4 w-4" />}
                    {index === 2 && <Play className="mr-2 h-4 w-4" />}
                    <span className="text-sm">
                      {index === 0 && "Live Demo"}
                      {index === 1 && "Documentation"}
                      {index === 2 && "Demo Video"}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
            size="lg"
          >
            <Github className="mr-2 h-4 w-4" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
