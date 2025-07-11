import { Card, CardContent } from "@/components/ui/card";
import { skills } from "@/data/resume-data";

export default function SkillsSection() {
  const languageIcons: Record<string, string> = {
    "Java": "devicon-java-plain colored",
    "Javascript": "devicon-javascript-plain colored", 
    "Python": "devicon-python-plain colored",
    "HTML5": "devicon-html5-plain colored",
    "CSS": "devicon-css3-plain colored",
    "PHP": "devicon-php-plain colored",
    "C#": "devicon-csharp-plain colored",
    "MySQL": "devicon-mysql-plain colored",
    "Swift": "devicon-swift-plain colored"
  };

  const toolIcons: Record<string, { type: 'devicon' | 'image', value: string }> = {
    // Testing Tools & Frameworks
    "Selenium": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/selenium.svg' },
    "Cypress.io": { type: 'devicon', value: 'devicon-cypressio-plain colored' },
    "Postman": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postman.svg' },
    "Android Studio": { type: 'devicon', value: 'devicon-androidstudio-plain colored' },
    "Cucumber": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cucumber.svg' },
    "GraphQL": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/graphql.svg' },
    
    // Development Tools
    "IntelliJ": { type: 'devicon', value: 'devicon-intellij-plain colored' },
    "MongoDB": { type: 'devicon', value: 'devicon-mongodb-plain colored' },
    "Jenkins": { type: 'devicon', value: 'devicon-jenkins-line colored' },
    "Visual Studio": { type: 'devicon', value: 'devicon-visualstudio-plain colored' },
    "WordPress": { type: 'devicon', value: 'devicon-wordpress-plain colored' },
    "FlutterFlow": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/flutter.svg' },
    "Unity Game Engine": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/unity.svg' },
    "CircleCI": { type: 'image', value: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/circleci.svg' }
  };

  const toolCategories = [
    {
      title: "Testing Tools & Frameworks",
      items: [
        { name: "Selenium", description: "Web automation testing framework with Java integration" },
        { name: "Cypress.io", description: "Modern JavaScript testing framework for frontend automation" },
        { name: "Postman", description: "API development and testing platform" },
        { name: "Android Studio", description: "Mobile application testing and development" },
        { name: "Cucumber", description: "Behavior-driven development testing framework" },
        { name: "GraphQL", description: "Query language for APIs and runtime for executing queries" }
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
                  <div className="text-5xl mb-4">
                    <i className={languageIcons[language] || "devicon-code-plain colored"}></i>
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
              {category.items.map((tool, index) => {
                const iconConfig = toolIcons[tool.name];
                
                return (
                  <Card key={index} className="skill-card">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 mr-4 flex items-center justify-center">
                          {iconConfig ? (
                            iconConfig.type === 'devicon' ? (
                              <i className={`${iconConfig.value} text-2xl`}></i>
                            ) : (
                              <img 
                                src={iconConfig.value} 
                                alt={tool.name}
                                className="w-6 h-6 object-contain"
                                style={{ filter: 'invert(1)' }}
                              />
                            )
                          ) : (
                            <span className="text-2xl">{tool.icon || "🛠️"}</span>
                          )}
                        </div>
                        <h4 className="font-bold">{tool.name}</h4>
                      </div>
                      <p className="text-secondary text-sm">{tool.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
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
