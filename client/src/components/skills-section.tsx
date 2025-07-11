import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/data/resume-data";

export default function SkillsSection() {
  const languageIcons: Record<string, string> = {
    "Java": "☕",
    "Javascript": "🟨", 
    "Python": "🐍",
    "HTML5": "🌐",
    "CSS": "🎨",
    "PHP": "🔷",
    "C#": "🔷",
    "MySQL": "🗄️",
    "Swift": "🦉"
  };

  const toolCategories = [
    {
      title: "Testing Tools & Frameworks",
      items: [
        { name: "Selenium", description: "Web automation testing framework with Java integration", icon: "🤖" },
        { name: "Cypress.io", description: "Modern JavaScript testing framework for frontend automation", icon: "🧪" },
        { name: "Postman", description: "API development and testing platform", icon: "📡" },
        { name: "Android Studio", description: "Mobile application testing and development", icon: "📱" },
        { name: "Cucumber", description: "Behavior-driven development testing framework", icon: "🥒" },
        { name: "Unity Game Engine", description: "Game development and testing environment", icon: "🎮" }
      ]
    },
    {
      title: "Development Tools",
      items: skills.tools.map(tool => ({
        name: tool,
        description: `Professional ${tool} development environment`,
        icon: "🛠️"
      }))
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-secondary">
            Comprehensive expertise across multiple programming languages, frameworks, and testing tools
          </p>
        </div>
        
        {/* Programming Languages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Programming Languages</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {skills.languages.map((language) => (
              <Card key={language} className="skill-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-4">
                    {languageIcons[language] || "💻"}
                  </div>
                  <h4 className="font-bold">{language}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Tool Categories */}
        {toolCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">{category.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((tool, index) => (
                <Card key={index} className="skill-card">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-2xl mr-4">
                        {tool.icon}
                      </div>
                      <h4 className="font-bold">{tool.name}</h4>
                    </div>
                    <p className="text-secondary text-sm">{tool.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Soft Skills */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Professional Skills</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.softSkills.map((skill) => (
              <Card key={skill} className="skill-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="font-medium text-sm">{skill}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
