import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Code2,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Kanban,
  Clock,
  BarChart3,
  CheckCircle2,
  Download,
} from 'lucide-react'

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37z" />
  </svg>
)

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

export const AboutView: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const skills = [
    'Project Management',
    'Agile & Scrum',
    'Business Design',
    'JIRA Workflows',
    'Power BI & Analytics',
    'React.js + Vite',
    'Tailwind CSS',
    'TypeScript',
    'ERP / HRM Systems',
    'AI Sales & Digital Strategy',
    'Figma to Code',
    'Sprint Planning',
  ]

  const projects = [
    {
      title: 'SoapRemedies',
      url: 'https://soapremedies.com',
      role: 'Project Manager & Tech Lead',
      description: 'Astrology-focused wellness and e-commerce platform connecting spirituality, beauty, and wellness.',
      badge: 'Product Launch',
      color: '#059669',
    },
    {
      title: 'Astro Raagas',
      url: 'https://astroraagas.com',
      role: 'Project Manager',
      description: 'Innovative digital entertainment platform exploring the harmony between Indian classical music, mood, and astrology.',
      badge: 'Product Launch',
      color: '#7c3aed',
    },
    {
      title: 'Neal Foundation',
      url: 'https://nealfoundation.org',
      role: 'Web Development & Delivery',
      description: 'Official NGO portal showcasing social campaigns, impact metrics, and volunteer onboarding.',
      badge: 'Non-Profit',
      color: '#d97706',
    },
    {
      title: 'Vahlay Astro EdTech',
      url: 'https://vahlayastro.com',
      role: 'Project Manager & Developer',
      description: 'Comprehensive digital learning platform with automated consultation booking workflows and student management.',
      badge: 'EdTech Portal',
      color: '#4f46e5',
    },
  ]

  const experience = [
    {
      company: 'Vahlay Consulting Inc',
      period: '2024 – Present (2 yrs)',
      role: 'Developer - Project Manager & Team Lead Digital',
      location: 'Ahmedabad, Gujarat, India',
      description:
        'Led cross-functional teams of developers and designers through sprint planning, daily standups, code reviews, and stakeholder alignment. Spearheaded development of responsive web applications, custom CRM/ERP solutions, and product launches including SoapRemedies and Astro Raagas.',
      highlights: ['Agile Team Leadership', 'Figma to React + Vite + Tailwind', 'Client Requirements Translation'],
    },
    {
      company: 'JSpiders - Training & Development Center',
      period: 'Jun 2024 – Nov 2024 (6 mos)',
      role: 'Java Specialist & Trainee',
      location: 'Ahmedabad, Gujarat, India',
      description:
        'Intensive training covering Core Java, OOP architecture, data structures, and backend fundamentals with practical enterprise applications.',
      highlights: ['Core Java', 'OOP Design Patterns', 'Database Systems'],
    },
    {
      company: 'Nuclear Power Corporation of India Limited (NPCIL)',
      period: 'Jun 2022 – Jul 2022 (2 mos)',
      role: 'Web Development Intern',
      location: 'Vyara, Gujarat, India',
      description:
        'Designed and delivered a dynamic PHP township centralization portal with administrative security controls and user access management.',
      highlights: ['Dynamic PHP/HTML/CSS', 'Role-Based Access Control', 'Township Centralization'],
    },
    {
      company: 'Teachnook',
      period: 'May 2021 – Jul 2021 (3 mos)',
      role: 'Development Intern',
      location: 'Bangalore, Karnataka, India',
      description:
        'Developed Android mobile application using Android Studio, resolving performance bottlenecks and integrating offline local storage.',
      highlights: ['Android Studio', 'Bug Fixing & Testing', 'Offline Local Storage'],
    },
  ]

  const certifications = [
    {
      title: 'Agile Project Management',
      issuer: 'HP LIFE / HP Foundation',
      year: '2024',
      badge: 'Agile / Scrum / Kanban',
    },
    {
      title: 'Introduction to JIRA',
      issuer: 'Simplilearn SkillUp',
      year: '2024',
      badge: 'Sprints & Epic Tracking',
    },
    {
      title: 'Project Management Professional',
      issuer: 'Simplilearn SkillUp',
      year: '2024',
      badge: 'Scope, Risk & Stakeholders',
    },
    {
      title: 'Power BI for Beginners',
      issuer: 'Microsoft & Simplilearn',
      year: '2024',
      badge: 'Data Visualizations & Dashboards',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Hero Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar with Initials */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white flex items-center justify-center text-3xl font-extrabold shadow-xl shadow-indigo-500/25 ring-4 ring-white dark:ring-slate-800 select-none">
              KC
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px]" title="Active">
              ✓
            </span>
          </div>

          {/* Core Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Krishna Chouhan
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Project Manager &amp; Lead
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 mb-3 leading-snug">
              Specializing in Business Design, AI Sales, Custom Enterprise Software (ERP/HRM), &amp; Digital Strategy
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Ahmedabad, Gujarat, India
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Vahlay Consulting Inc
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                NMIMS (BTech IT)
              </span>
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Phone */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
                <a
                  href="tel:9294872858"
                  className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 truncate block"
                >
                  9294872858
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('9294872858', 'phone')}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
              title="Copy phone"
            >
              {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email</p>
                <a
                  href="mailto:krish.chouhan1025@gmail.com"
                  className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 truncate block"
                  title="krish.chouhan1025@gmail.com"
                >
                  krish.chouhan1025@...
                </a>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('krish.chouhan1025@gmail.com', 'email')}
              className="p-1 rounded text-slate-400 hover:text-slate-600"
              title="Copy email"
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/krishna-chouhan-4948231a0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">LinkedIn</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 truncate">
                  krishna-chouhan
                </p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/krishnachouhan1011"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0">
                <GithubIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">GitHub</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 truncate">
                  krishna-chouhan
                </p>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
          </a>
        </div>
      </div>

      {/* About & Philosophy Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          About Me &amp; Business Philosophy
        </h2>

        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
          <p>
            I love the <strong>&ldquo;blank canvas&rdquo;</strong> stage of a business. Most companies start with a great idea but struggle to connect the dots between their brand, their website, and their daily operations. That’s where I come in.
          </p>
          <p>
            With a background in development and a dedicated focus on <strong>Business Design</strong>, I help companies build their entire digital world from scratch. I don't just build websites; I build the systems that help businesses actually run.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mb-1">01. Identity</div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Brand &amp; Web Platform</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Crafting distinctive visual identities, logos, and responsive web platforms that define market presence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mb-1">02. Growth</div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Digital &amp; Performance</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Strategy-backed performance marketing, social calendars, and conversion optimization to scale revenue.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 mb-1">03. Efficiency</div>
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Custom Software (ERP/HRM)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Designing unified CRM, ERP, and HRM software so teams run their work in one seamless digital ecosystem.
            </p>
          </div>
        </div>
      </div>

      {/* Core Skills & Competencies */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-indigo-600" />
          Core Skills &amp; Capabilities
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Application: PlanFlow Studio */}
      <div className="bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800/80 p-6 sm:p-7 shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-indigo-500/25">
              PF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  PlanFlow — Agile Project Management Utility
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                  Current Application
                </span>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                Designed &amp; Developed by Krishna Chouhan
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-2.5 mb-5">
          <p>
            <strong>What is PlanFlow?</strong> PlanFlow is a streamlined, client-side project management web application created to eliminate enterprise bloat, account setup friction, and slow load times. Built from scratch with <strong>React 19, TypeScript, Tailwind CSS v4, and Vite</strong>, it delivers a lightning-fast agile environment that runs directly in the browser with full local persistence.
          </p>
          <p>
            <strong>The Problem it Solves:</strong> Most teams only need an intuitive way to organize sprint deliverables, track checklists, monitor hours, and align stakeholders without wading through confusing enterprise menus. PlanFlow gives teams complete data ownership, instant search/filtering, and automatic standup report generation with zero database dependencies.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">
              <Kanban className="w-3.5 h-3.5 text-indigo-600" />
              <span>5-Stage Kanban Pipeline</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Fluid drag-and-drop &amp; one-click status transitions across Backlog, To Do, In Progress, Review, and Done.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sprint Milestones Engine</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Group deliverables into target release sprints with automated progress percentages and hour burn rates.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Checklists &amp; Time Logs</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Granular subtasks with interactive checkboxes, progress calculation, and quick +0.5h / +1.0h time logging.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
              <span>Live Analytics Dashboard</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Automated completion gauges, stage distributions, team workload distribution, and overdue alert lists.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>1-Click Standup Reports</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              Instant generation of pre-formatted Markdown summaries ready to paste directly into Slack or Teams.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200 text-xs mb-1">
              <Download className="w-3.5 h-3.5 text-rose-600" />
              <span>Zero-Lockin Portability</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              100% private in-browser localStorage persistence with RFC 4180 CSV export and full JSON backup/restore.
            </p>
          </div>
        </div>

        {/* Tech Stack Footer */}
        <div className="pt-3 border-t border-indigo-100 dark:border-indigo-900/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5 font-medium">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Stack:</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">React 19</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">TypeScript</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Vite</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Tailwind CSS v4</span>
            <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Vitest</span>
          </div>

          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            100% Verified &bull; 20 Automated Tests Passing
          </span>
        </div>
      </div>

      {/* Featured Projects Shipped */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          Featured Shipped Products &amp; Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.title}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.title}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1">{p.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                  {p.description}
                </p>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 mt-auto pt-2 border-t border-slate-200/60 dark:border-slate-700/60"
              >
                <span>Visit {p.title}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Experience & Education Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Experience Timeline */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            Experience Timeline
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.company} className="relative pl-5 border-l-2 border-indigo-500/30 dark:border-indigo-500/20">
                <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50 dark:ring-indigo-950/60" />
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{exp.role}</h3>
                  <span className="text-[11px] font-semibold text-slate-400">{exp.period}</span>
                </div>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1.5">
                  {exp.company} • <span className="text-slate-400 font-normal">{exp.location}</span>
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="space-y-6">
          {/* Education */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Education
            </h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Bachelor of Technology (BTech) — IT
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  SVKM&rsquo;s NMIMS (Mukesh Patel MPSTME)
                </p>
                <p className="text-[11px] text-slate-400">2019 – 2023</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  High School Diploma
                </h3>
                <p className="text-xs text-slate-500">CBSE Board</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <h2 className="text-base font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              Certifications
            </h2>
            <div className="space-y-2.5">
              {certifications.map((c) => (
                <div key={c.title} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{c.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{c.year}</span>
                  </div>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{c.issuer}</p>
                  <span className="text-[10px] font-medium text-slate-400">{c.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
