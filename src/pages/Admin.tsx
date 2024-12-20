import { useState, useEffect, ChangeEvent } from 'react';
import { Project, PageContent, PROJECT_CATEGORIES } from '../types';
import { storage } from '../lib/storage';
import { Plus, Save, Upload, X } from 'lucide-react';

export function Admin() {
  const [content, setContent] = useState<PageContent>(storage.getContent());
  const [projects, setProjects] = useState<Project[]>(storage.getProjects());

  const saveContent = () => {
    storage.saveContent(content);
    alert('Content saved successfully!');
  };

  const saveProjects = () => {
    storage.saveProjects(projects);
    alert('Projects saved successfully!');
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      imageUrl: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&q=80',
      gallery: [],
      year: '2024',
      client: 'Client Name',
      categories: []
    };
    setProjects([...projects, newProject]);
  };

  const addGalleryItem = (projectIndex: number, type: 'image' | 'video') => {
    const newProjects = [...projects];
    newProjects[projectIndex].gallery.push({
      type,
      url: ''
    });
    setProjects(newProjects);
  };

  const updateGalleryItem = (projectIndex: number, itemIndex: number, url: string) => {
    const newProjects = [...projects];
    newProjects[projectIndex].gallery[itemIndex].url = url;
    setProjects(newProjects);
  };

  const removeGalleryItem = (projectIndex: number, itemIndex: number) => {
    const newProjects = [...projects];
    newProjects[projectIndex].gallery.splice(itemIndex, 1);
    setProjects(newProjects);
  };

  const handleImageUpload = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProjects = [...projects];
        newProjects[index] = { 
          ...projects[index], 
          imageUrl: reader.result as string 
        };
        setProjects(newProjects);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCategory = (index: number, category: string) => {
    const newProjects = [...projects];
    const project = newProjects[index];
    
    if (project.categories.includes(category)) {
      project.categories = project.categories.filter(c => c !== category);
    } else {
      project.categories = [...project.categories, category];
    }
    
    setProjects(newProjects);
  };

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-site mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Admin Panel</h1>
        
        {/* Content Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Page Content</h2>
            <button
              onClick={saveContent}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              <Save size={16} /> Save Content
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Hero Subtitle</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, subtitle: e.target.value }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About Content</label>
              <textarea
                value={content.about.content}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, content: e.target.value }
                })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience Items</label>
              <div className="space-y-2">
                {content.about.experience.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newExperience = [...content.about.experience];
                        newExperience[index] = e.target.value;
                        setContent({
                          ...content,
                          about: { ...content.about, experience: newExperience }
                        });
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
                    />
                    <button
                      onClick={() => {
                        const newExperience = content.about.experience.filter((_, i) => i !== index);
                        setContent({
                          ...content,
                          about: { ...content.about, experience: newExperience }
                        });
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setContent({
                      ...content,
                      about: {
                        ...content.about,
                        experience: [...content.about.experience, '']
                      }
                    });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Plus size={16} /> Add Experience Item
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">Projects</h2>
            <div className="flex gap-4">
              <button
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Plus size={16} /> Add Project
              </button>
              <button
                onClick={saveProjects}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
              >
                <Save size={16} /> Save Projects
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={project.id} className="border dark:border-gray-700 rounded-lg p-4">
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index] = { ...project, title: e.target.value };
                        setProjects(newProjects);
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...projects];
                        newProjects[index] = { ...project, description: e.target.value };
                        setProjects(newProjects);
                      }}
                      rows={2}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_CATEGORIES.map((category) => (
                        <button
                          key={category}
                          onClick={() => toggleCategory(index, category)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            project.categories.includes(category)
                              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Main Image</label>
                    <div className="mt-1 flex items-center gap-4">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                        <Upload size={16} />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gallery</label>
                    <div className="space-y-4">
                      {project.gallery.map((item, galleryIndex) => (
                        <div key={galleryIndex} className="flex gap-4 items-center">
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => updateGalleryItem(index, galleryIndex, e.target.value)}
                            placeholder={item.type === 'video' ? 'Enter video URL' : 'Enter image URL'}
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
                          />
                          <button
                            onClick={() => removeGalleryItem(index, galleryIndex)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <button
                          onClick={() => addGalleryItem(index, 'image')}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Plus size={16} /> Add Image
                        </button>
                        <button
                          onClick={() => addGalleryItem(index, 'video')}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                        >
                          <Plus size={16} /> Add Video
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client</label>
                      <input
                        type="text"
                        value={project.client}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index] = { ...project, client: e.target.value };
                          setProjects(newProjects);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Year</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => {
                          const newProjects = [...projects];
                          newProjects[index] = { ...project, year: e.target.value };
                          setProjects(newProjects);
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 dark:text-white p-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
