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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-secondary hover:text-primary transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-secondary">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => window.open(personalInfo.linkedin, '_blank')}
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => window.open(personalInfo.github, '_blank')}
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Button>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleDownloadResume}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}