'use client';

import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    icon: '💻',
    title: 'Languages',
    skills: [
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { icon: 'devicon-typescript-plain colored', name: 'TypeScript' },
      { icon: 'devicon-python-plain colored', name: 'Python' },
      { icon: 'devicon-java-plain colored', name: 'Java' },
      { icon: 'devicon-html5-plain colored', name: 'HTML5' },
      { icon: 'devicon-css3-plain colored', name: 'CSS3' },
    ],
  },
  {
    icon: '⚙️',
    title: 'Frameworks & Libraries',
    skills: [
      { icon: 'devicon-react-original colored', name: 'React' },
      { icon: 'devicon-nextjs-original colored', name: 'Next.js' },
      { icon: 'devicon-nodejs-plain colored', name: 'Node.js' },
      { icon: 'devicon-express-original colored', name: 'Express' },
    ],
  },
  {
    icon: '🛠️',
    title: 'Tools, AI & Cloud',
    skills: [
      { icon: 'devicon-git-plain colored', name: 'Git' },
      { icon: 'devicon-github-original colored', name: 'GitHub' },
      { icon: 'devicon-docker-plain colored', name: 'Docker' },
      { icon: 'devicon-mongodb-plain colored', name: 'MongoDB' },
      { icon: 'devicon-postgresql-plain colored', name: 'PostgreSQL' },
      { icon: 'devicon-openai-plain colored', name: 'AI/LLM' },
      {
        icon: 'text-icon',
        name: 'REST APIs',
        textIcon: '🔗',
      },
      {
        icon: 'text-icon',
        name: 'Cloud Deploy',
        textIcon: '☁️',
      },
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-3 inline-block">What I work with</span>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.2rem)] font-extrabold mt-2" style={{ letterSpacing: '-1px' }}>
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        {/* Devicons CDN */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css" />

        <div className="flex flex-col gap-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <h3 className="font-alt text-base font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                <span>{cat.icon}</span> {cat.title}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-3"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))' }}
              >
                {cat.skills.map((skill) => (
                  <motion.div key={skill.name} variants={item} className="skill-card">
                    {skill.icon === 'text-icon' ? (
                      <span style={{ fontSize: '2rem' }}>{(skill as { textIcon: string }).textIcon}</span>
                    ) : (
                      <i className={skill.icon} style={{ fontSize: '2rem' }} />
                    )}
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
