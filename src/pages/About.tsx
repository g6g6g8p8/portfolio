import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PageContent } from '../types';
import { storage } from '../lib/storage';
import { ContactForm } from '../components/ContactForm';

export function About() {
  const [content, setContent] = useState<PageContent>(storage.getContent());

  useEffect(() => {
    setContent(storage.getContent());
  }, []);

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">About</h1>

          {/* Introduction */}
          <div className="mb-16 space-y-6">
            {content.about.intro.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-600 dark:text-gray-400">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Highlights */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Highlights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              {content.about.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience</h2>
            <div className="space-y-6">
              {content.about.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 dark:text-white">{exp.role}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What I Do */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What I Do</h2>
            <div className="flex flex-wrap gap-2">
              {content.about.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Clients */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Clients</h2>
            <div className="flex flex-wrap gap-4">
              {content.about.clients.map((client, index) => (
                <span
                  key={index}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Awards</h2>
            <div className="space-y-8">
              {content.about.awards.map((award, index) => (
                <div key={index}>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">{award.project}</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    {award.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact</h2>
            <div className="max-w-lg">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
