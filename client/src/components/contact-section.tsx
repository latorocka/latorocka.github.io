import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Download } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

export default function ContactSection() {
  const { toast } = useToast();

  const handleDownloadResume = async () => {
    try {
      const response = await fetch('/api/resume/download');
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Brian_LaTorraca_Resume_2025.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Resume downloaded",
        description: "Resume has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Resume download error:', error);
      toast({
        title: "Download failed",
        description: "Failed to download resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-secondary">
            Ready to collaborate? Let's discuss your project or opportunity.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-12 border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div>
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <a 
                        href={`tel:${personalInfo.phone}`}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="text-lg font-medium">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div>
                <h3 className="text-2xl font-bold mb-8">Let's Connect</h3>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start h-14 text-left"
                    onClick={() => window.open(personalInfo.linkedin, '_blank')}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Professional profile</p>
                    </div>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-start h-14 text-left"
                    onClick={() => window.open(personalInfo.github, '_blank')}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                      <Github className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">Code repositories</p>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={handleDownloadResume}
                    className="w-full justify-start h-14 text-left bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl mt-6"
                    size="lg"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Download Resume</p>
                      <p className="text-sm opacity-90">PDF format</p>
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}