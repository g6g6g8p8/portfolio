import { useEffect, useState } from 'react';
import { Project, PROJECT_CATEGORIES } from '../types';
import { storage } from '../lib/storage';
import { ProjectCard } from '../components/ProjectCard';
import { X } from 'lucide-react';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await storage.loadProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProjects = projects.filter(project =>
    selectedCategories.length === 0 || 
    project.categories.some(category => selectedCategories.includes(category))
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 mb-12">
          <h1 className="text-4xl font-bold">Projects</h1>
          
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategories.includes(category)
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
            {selectedCategories.length > 0 && (
              <button
                onClick={() => setSelectedCategories([])}
                className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 flex items-center gap-1"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects found for the selected categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}
