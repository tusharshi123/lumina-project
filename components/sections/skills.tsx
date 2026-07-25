'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { skills } from '@/lib/data';
import type { Skill } from '@/lib/types';

const categories = ['Frontend', 'Backend', 'Tools', 'Other'];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((skill) => skill.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const getProficiencyColor = (proficiency: Skill['proficiency']) => {
    switch (proficiency) {
      case 'Expert':
        return 'border-accent';
      case 'Advanced':
        return 'border-primary';
      default:
        return 'border-muted';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          My <span className="text-accent">Skills</span>
        </h2>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-primary text-primary-foreground'
                : 'border border-border text-muted-foreground hover:border-foreground'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border text-muted-foreground hover:border-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              className={`p-4 border-2 rounded-lg bg-card/50 hover:bg-card transition-all cursor-pointer ${getProficiencyColor(
                skill.proficiency
              )}`}
            >
              <h3 className="font-semibold mb-2">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{skill.proficiency}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
