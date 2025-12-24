import { usePortfolio } from "@/hooks/use-portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Loader2, Mail, MapPin, Github, Linkedin, FileText, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data, isLoading, error } = usePortfolio();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">Failed to load portfolio data. Please try again later.</p>
      </div>
    );
  }

  const { profile, projects, skills, experience, education } = data;

  const skillCategories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary-foreground">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-tighter">
            {profile.name.split(' ')[0]}<span className="text-primary">.</span>
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <a 
            href={profile.resumeUrl || "#"} 
            target="_blank"
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Resume
          </a>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* Hero Section */}
        <section className="min-h-[90vh] flex items-center relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h2 className="text-primary font-medium mb-4 tracking-wide">HELLO, I'M</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
                {profile.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                {profile.title} building exceptional digital experiences. 
                Focused on creating accessible, pixel-perfect user interfaces.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25">
                  Get in Touch
                </a>
                <div className="flex gap-2">
                  <SocialButton href={profile.github} icon={<Github className="w-5 h-5" />} label="GitHub" />
                  <SocialButton href={profile.linkedin} icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
                  <SocialButton href={`mailto:${profile.email}`} icon={<Mail className="w-5 h-5" />} label="Email" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.a 
            href="#about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.a>
        </section>

        {/* About & Skills Section */}
        <section id="about" className="py-24 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="About Me" subtitle />
            
            <div className="grid md:grid-cols-2 gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-muted-foreground leading-relaxed"
              >
                <p>{profile.summary}</p>
                <div className="flex items-center gap-4 text-sm font-medium pt-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Based in India</span>
                  </div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Available for work</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl border border-border/50"
              >
                <h3 className="text-xl font-bold mb-6 font-display">Technical Arsenal</h3>
                <div className="space-y-6">
                  {skillCategories.map(category => (
                    <div key={category}>
                      <h4 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skills.filter(s => s.category === category).map(skill => (
                          <span 
                            key={skill.id} 
                            className="px-3 py-1.5 text-sm bg-background/50 border border-border rounded-lg text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors cursor-default"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading title="Experience" subtitle />

            <div className="space-y-12 max-w-4xl">
              {experience.map((job, idx) => (
                <motion.div 
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 md:pl-0"
                >
                  {/* Timeline line for mobile */}
                  <div className="absolute left-0 top-2 bottom-0 w-px bg-border md:hidden" />
                  <div className="absolute left-[-4px] top-2.5 w-2 h-2 rounded-full bg-primary md:hidden" />

                  <div className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                    <div className="text-sm font-medium text-muted-foreground pt-1">
                      {job.duration}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground font-display">{job.role}</h3>
                      <div className="text-primary font-medium mb-4">{job.company}</div>
                      <p className="text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Featured Projects" subtitle />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Education" subtitle />

            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, idx) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold font-display">{edu.institution}</h3>
                      <div className="text-primary">{edu.degree}</div>
                    </div>
                    <span className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                      {edu.duration}
                    </span>
                  </div>
                  {edu.grade && (
                    <div className="text-sm text-muted-foreground">
                      Grade: <span className="text-foreground font-medium">{edu.grade}</span>
                    </div>
                  )}
                  {edu.location && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {edu.location}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <SectionHeading title="Get In Touch" subtitle />

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-display font-bold mb-6">Let's work together</h3>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
                  I'll try my best to get back to you!
                </p>

                <div className="space-y-6">
                  <ContactItem 
                    icon={<Mail className="w-6 h-6 text-primary" />} 
                    label="Email" 
                    value={profile.email} 
                    href={`mailto:${profile.email}`}
                  />
                  <ContactItem 
                    icon={<Linkedin className="w-6 h-6 text-primary" />} 
                    label="LinkedIn" 
                    value="View Profile" 
                    href={profile.linkedin}
                  />
                  <ContactItem 
                    icon={<FileText className="w-6 h-6 text-primary" />} 
                    label="Resume" 
                    value="Download PDF" 
                    href={profile.resumeUrl}
                  />
                </div>
              </motion.div>

              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            <p className="mt-2 text-xs opacity-50">Built with React, Tailwind & Love.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  if (!href) return null;
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-4 rounded-xl bg-card border border-border hover:border-primary hover:text-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  if (!href) return null;
  return (
    <a href={href} className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:bg-card hover:border-primary/50 transition-all group">
      <div className="p-3 rounded-lg bg-background group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium text-foreground group-hover:text-primary transition-colors">{value}</div>
      </div>
    </a>
  );
}
