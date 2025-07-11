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
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-center">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex flex-col items-center text-center">
                  <Mail className="h-5 w-5 text-primary mb-2" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <Phone className="h-5 w-5 text-primary mb-2" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <MapPin className="h-5 w-5 text-primary mb-2" />
                  <p className="text-sm text-secondary">{personalInfo.location}</p>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-center">Connect</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(personalInfo.linkedin, '_blank')}
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(personalInfo.github, '_blank')}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
            
            {/* Resume Download */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4 text-center">Resume</h3>
              <Button 
                onClick={handleDownloadResume}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl"
                size="sm"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}