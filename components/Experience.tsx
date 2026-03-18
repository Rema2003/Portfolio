'use client';

import { motion } from 'framer-motion';

const JOBS = [
  {
    role:    'Junior Full Stack Developer',
    company: 'EDVES LTD',
    date:    '01/2024 – 11/2025',
    bullets: [
      'Architected and deployed dynamic, scalable web applications, resulting in a 25% increase in UI/UX efficiency through optimized rendering and state management.',
      'Engineered robust backend services using Node.js, ensuring high-availability data exchange and consistent application reliability.',
      'Spearheaded database optimization by refining SQL schema structures and query tuning, significantly reducing system latency and improving response times.',
      'Collaborated cross-functionally with product and design teams to implement secure, maintainable features aligned with business goals.',
      'Instituted structured debugging and performance testing protocols to enhance long-term application stability and code quality.',
    ],
    tags: ['React.js', 'Node.js', 'SQL', 'Git'],
  },
  {
    role:    'Web Development Intern',
    company: 'F5 Labs',
    date:    '08/2022 – 10/2023',
    bullets: [
      'Developed responsive, interactive interfaces utilizing modern JavaScript frameworks to enhance user engagement.',
      'Maintained CI/CD integrity through disciplined Git workflows and version control best practices.',
      'Executed performance tuning and rigorous debugging to strengthen application robustness across diverse environments.',
      'Assisted in backend integration, focusing on secure database interactions and efficient data retrieval.',
    ],
    tags: ['JavaScript Frameworks', 'Git', 'SQL'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mb-3 inline-block">My journey</span>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.2rem)] font-extrabold mt-2" style={{ letterSpacing: '-1px' }}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="timeline">
          {JOBS.map((job, i) => (
            <motion.div
              key={job.role}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true }}
              className="relative pl-10 mb-8 last:mb-0"
            >
              <div className="timeline-dot" />
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="card p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {job.role}
                    </h3>
                    <span className="text-sm font-medium" style={{ color: 'var(--accent-light)' }}>
                      {job.company}
                    </span>
                  </div>
                  <span
                    className="text-[0.75rem] px-3 py-1 rounded-full border"
                    style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', background: 'rgba(108,99,255,0.06)' }}
                  >
                    {job.date}
                  </span>
                </div>

                <ul className="mb-4 space-y-1">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed pl-4 relative" style={{ color: 'var(--text-secondary)' }}>
                      <span className="absolute left-0" style={{ color: 'var(--accent)' }}>▹</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
