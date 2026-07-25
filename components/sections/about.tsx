'use client';

import { motion } from 'framer-motion';
import { experience, personalInfo } from '@/lib/data';

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="text-accent">Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              I&apos;m a passionate full-stack developer with over 5 years of experience building digital solutions that matter.
              My journey in tech began with a curiosity about how things work, and it&apos;s evolved into a commitment to creating
              beautiful, functional, and scalable applications.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              I specialize in modern web technologies and love working on projects that challenge me to grow. When I&apos;m not coding,
              you can find me exploring design trends, contributing to open source, or sharing knowledge with the community.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border"
            >
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>📍 {personalInfo.location}</li>
                <li>✉️ {personalInfo.email}</li>
                <li>📞 {personalInfo.phone}</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right side - Experience */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Experience</h3>
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="pb-6 border-b border-border last:border-b-0"
              >
                <h4 className="text-lg font-semibold mb-1">{exp.role}</h4>
                <p className="text-accent text-sm mb-2">{exp.company}</p>
                <p className="text-muted-foreground text-sm mb-3">{exp.period}</p>
                <p className="text-muted-foreground">{exp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
