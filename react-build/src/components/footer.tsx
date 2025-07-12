import { Mail, Linkedin, Github } from "lucide-react";
import { personalInfo } from "@/data/resume-data";

export default function Footer() {
  return (
    <footer className="bg-dark-slate text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">{personalInfo.name}</h3>
          <p className="text-gray-300 mb-6">{personalInfo.title}</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a 
              href={personalInfo.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href={personalInfo.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              © 2025 {personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
