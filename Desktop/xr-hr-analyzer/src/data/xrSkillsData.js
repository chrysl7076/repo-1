export const XR_ROLES = [
  'HR Business Partner',
  'Talent Acquisition Manager',
  'Learning & Development Manager',
  'HR Director',
  'Recruitment Specialist',
  'Performance Management Lead',
];

// Each role has exactly 6 skills. At least 2 per role have current > required (strengths).
// Each skill carries a role-specific insight explaining why the gap (or strength) matters.
const data = {
  'HR Business Partner': {
    summary:
      'HR Business Partners need strong XR skills to facilitate immersive change management, virtual collaboration, and employee experience design. The largest gaps lie in XR-enabled coaching and spatial analytics — areas where most HR professionals currently have minimal exposure.',
    skills: [
      {
        skill: 'XR Change Management',
        required: 8, current: 2, category: 'XR',
        insight: 'Immersive simulations make complex org changes tangible and build employee buy-in faster than slide decks',
      },
      {
        skill: 'Immersive Coaching',
        required: 7, current: 2, category: 'MR',
        insight: 'VR role-play gives coaches observable, repeatable scenarios to develop leaders safely',
      },
      {
        skill: 'VR Employee Experience',
        required: 7, current: 2, category: 'VR',
        insight: 'Simulated environments surface cultural friction points before costly programme rollouts',
      },
      {
        skill: 'XR People Analytics',
        required: 6, current: 2, category: 'XR',
        insight: 'Spatial engagement data reveals patterns that pulse surveys consistently miss',
      },
      {
        skill: 'Virtual Meeting Platforms',
        required: 6, current: 8, category: 'VR',
        insight: 'Strong baseline — these skills transfer directly to enterprise XR collaboration tools',
      },
      {
        skill: 'Digital Collaboration Tools',
        required: 5, current: 7, category: 'MR',
        insight: 'Existing Miro/Mural fluency is the natural bridge into mixed-reality whiteboarding',
      },
    ],
    recommendations: [
      {
        title: 'XR-Enabled Change Management',
        description: 'Learn to design and facilitate immersive change programmes using VR simulations and AR communication overlays to drive employee adoption at scale.',
        priority: 'High',
        duration: '4 weeks',
      },
      {
        title: 'Immersive Coaching Techniques',
        description: 'Apply evidence-based coaching frameworks within VR environments, including avatar-based role-play and biometric feedback sessions for leadership development.',
        priority: 'High',
        duration: '3 weeks',
      },
      {
        title: 'VR Employee Experience Design',
        description: 'Design immersive employee lifecycle experiences — from VR onboarding journeys to spatial culture diagnostics — that surface hidden engagement drivers.',
        priority: 'Medium',
        duration: '3 weeks',
      },
      {
        title: 'XR People Analytics Fundamentals',
        description: 'Interpret spatial behaviour data, engagement heatmaps, and XR interaction analytics to inform people strategy decisions with greater precision.',
        priority: 'Medium',
        duration: '2 weeks',
      },
    ],
  },

  'Talent Acquisition Manager': {
    summary:
      'Talent Acquisition Managers face a major shift as VR candidate assessments and AR job previews become mainstream recruiting tools. The highest priority gaps are in immersive assessment design and employer branding, which directly affect candidate quality and offer acceptance rates.',
    skills: [
      {
        skill: 'VR Candidate Assessment',
        required: 8, current: 3, category: 'VR',
        insight: 'Standardised VR scenarios remove interviewer bias and predict job performance more accurately than interviews',
      },
      {
        skill: 'XR Employer Branding',
        required: 7, current: 2, category: 'XR',
        insight: 'Immersive career microsites are now the key differentiator in competitive Gen Z hiring markets',
      },
      {
        skill: 'AR Job Previews',
        required: 7, current: 2, category: 'AR',
        insight: 'AR "day-in-the-life" previews cut mis-hire rates by setting accurate role expectations upfront',
      },
      {
        skill: 'Immersive Onboarding',
        required: 6, current: 2, category: 'MR',
        insight: 'VR onboarding reduces time-to-productivity and measurably improves 90-day retention',
      },
      {
        skill: 'Video Interview Platforms',
        required: 7, current: 8, category: 'VR',
        insight: 'High video fluency is the launchpad for advancing to full VR interview facilitation',
      },
      {
        skill: 'Digital Candidate Experience',
        required: 6, current: 7, category: 'XR',
        insight: 'Strong digital CX instincts transfer directly to designing immersive hiring journeys',
      },
    ],
    recommendations: [
      {
        title: 'Virtual Interview Platform Certification',
        description: 'Get certified in leading virtual interview tools including VR behavioural assessment platforms and asynchronous immersive video interviewing.',
        priority: 'High',
        duration: '2 weeks',
      },
      {
        title: 'Immersive Employer Brand Strategy',
        description: 'Build compelling VR career microsites and AR job-shadow experiences that differentiate your employer brand and resonate with digitally-native talent.',
        priority: 'High',
        duration: '4 weeks',
      },
      {
        title: 'VR Competency-Based Assessment Design',
        description: 'Design and validate scenario-based VR assessments that measure job-relevant competencies more reliably than traditional structured interviews.',
        priority: 'Medium',
        duration: '5 weeks',
      },
      {
        title: 'AR Candidate Experience Design',
        description: 'Use augmented reality to create interactive job previews and workplace tours that increase offer acceptance and reduce early attrition.',
        priority: 'Low',
        duration: '2 weeks',
      },
    ],
  },

  'Learning & Development Manager': {
    summary:
      'L&D Managers have the highest XR skill requirements of any HR role, particularly in VR scenario authoring and simulation development. Bridging existing instructional design expertise to spatial computing authoring tools is the critical development challenge for this role.',
    skills: [
      {
        skill: 'VR Scenario Authoring',
        required: 9, current: 3, category: 'VR',
        insight: 'Branching VR scenarios are now the gold standard for practising high-stakes, high-consequence skills',
      },
      {
        skill: 'MR Simulation Development',
        required: 8, current: 2, category: 'MR',
        insight: 'Mixed reality simulations cut training time and boost knowledge retention by up to 75% vs. e-learning',
      },
      {
        skill: 'XR Learning Analytics',
        required: 7, current: 3, category: 'XR',
        insight: 'Spatial xAPI data gives granular proof of skill acquisition that LMS completion scores cannot',
      },
      {
        skill: 'Spatial Computing Pedagogy',
        required: 7, current: 2, category: 'Spatial',
        insight: 'Embodied learning theory must inform XR design to prevent cognitive overload and motion sickness',
      },
      {
        skill: 'E-Learning Authoring',
        required: 7, current: 9, category: 'XR',
        insight: 'Strong Articulate/Lectora skills map directly onto no-code XR authoring platforms like Motive.io',
      },
      {
        skill: 'Digital Learning Platforms',
        required: 6, current: 8, category: 'XR',
        insight: 'Deep LMS expertise accelerates adoption of XR learning ecosystem integrations and xAPI pipelines',
      },
    ],
    recommendations: [
      {
        title: 'VR Authoring Tools Bootcamp',
        description: 'Hands-on training in leading no-code VR authoring platforms (Motive.io, Talespin, Strivr) to build branching simulations without engineering support.',
        priority: 'High',
        duration: '6 weeks',
      },
      {
        title: 'Immersive Learning Design Principles',
        description: 'Apply cognitive load theory, embodied cognition, and presence research to design XR experiences that consistently outperform traditional e-learning on retention.',
        priority: 'High',
        duration: '4 weeks',
      },
      {
        title: 'XR Learning Measurement & ROI',
        description: 'Use xAPI and spatial behaviour data to measure knowledge transfer, skill acquisition, and ROI from immersive learning programmes in a way boards will believe.',
        priority: 'High',
        duration: '3 weeks',
      },
      {
        title: 'AR Job Aid & Performance Support',
        description: 'Design augmented reality job aids and step-by-step AR overlays that support on-the-job performance without interrupting workflow.',
        priority: 'Medium',
        duration: '3 weeks',
      },
    ],
  },

  'HR Director': {
    summary:
      'HR Directors require strategic XR literacy to lead enterprise-wide immersive technology adoption, govern ethical use, and demonstrate ROI to the board. The most critical gaps are in ethics governance and ROI measurement — without these, XR HR investment stalls at pilot stage.',
    skills: [
      {
        skill: 'XR Ethics & Governance',
        required: 9, current: 3, category: 'XR',
        insight: 'Biometric and behavioural XR data creates significant legal exposure without a clear governance framework',
      },
      {
        skill: 'XR ROI Measurement',
        required: 8, current: 2, category: 'XR',
        insight: 'Without rigorous ROI methodology, XR HR investment fails to secure or retain board-level approval',
      },
      {
        skill: 'XR Strategic Planning',
        required: 8, current: 2, category: 'XR',
        insight: 'Organisations without an XR talent roadmap risk falling 3–5 years behind on workforce capabilities',
      },
      {
        skill: 'Digital Twin Workforce Modelling',
        required: 6, current: 1, category: 'MR',
        insight: 'Spatial workforce simulations allow org-design decisions to be stress-tested before costly implementation',
      },
      {
        skill: 'Digital HR Strategy',
        required: 6, current: 8, category: 'XR',
        insight: 'Proven digital strategy skills are the executive platform for championing XR transformation',
      },
      {
        skill: 'Remote Workforce Leadership',
        required: 5, current: 8, category: 'VR',
        insight: 'Pandemic-era distributed leadership experience directly informs scalable XR work design',
      },
    ],
    recommendations: [
      {
        title: 'XR Business Case & ROI Framework',
        description: 'Develop a rigorous framework for calculating ROI on XR HR investments, covering productivity gains, training cost savings, and talent retention uplift.',
        priority: 'High',
        duration: '3 weeks',
      },
      {
        title: 'Responsible XR: Ethics & Data Governance',
        description: 'Navigate the ethical and legal complexities of biometric data, avatar representation, and psychological safety in enterprise immersive environments.',
        priority: 'High',
        duration: '2 weeks',
      },
      {
        title: 'Executive XR Strategy Programme',
        description: 'A senior programme covering XR technology roadmaps, vendor selection, change management, and building measurable organisational XR capability.',
        priority: 'High',
        duration: '5 weeks',
      },
      {
        title: 'Digital Twin & Workforce Simulation',
        description: 'Explore how digital twin technology and spatial simulation can model workforce scenarios, predict skills gaps, and optimise org design before commitment.',
        priority: 'Medium',
        duration: '4 weeks',
      },
    ],
  },

  'Recruitment Specialist': {
    summary:
      'Recruitment Specialists need hands-on XR skills to deliver modern candidate experiences and conduct bias-reduced assessments. The key gaps are in VR job shadowing and AR assessment tools — both fast becoming expected competencies in competitive talent markets.',
    skills: [
      {
        skill: 'VR Job Shadowing',
        required: 7, current: 2, category: 'VR',
        insight: '360° job shadowing lets candidates experience the role before accepting, reducing regret-quit resignations',
      },
      {
        skill: 'AR Candidate Assessment',
        required: 7, current: 2, category: 'AR',
        insight: 'AR task simulations assess practical skills more validly than verbal interview questions alone',
      },
      {
        skill: 'XR Candidate Experience',
        required: 7, current: 3, category: 'XR',
        insight: 'Immersive hiring journeys directly improve offer acceptance rates and candidate Net Promoter Scores',
      },
      {
        skill: 'Immersive Employer Branding',
        required: 6, current: 2, category: 'MR',
        insight: 'VR employer brand content is the most-shared and longest-remembered recruitment asset type',
      },
      {
        skill: 'Video Screening Platforms',
        required: 6, current: 8, category: 'VR',
        insight: 'High-volume video fluency is the established launchpad for XR-based assessment tools',
      },
      {
        skill: 'Digital Talent Sourcing',
        required: 5, current: 7, category: 'XR',
        insight: 'Strong LinkedIn Recruiter skills translate well into emerging spatial talent network platforms',
      },
    ],
    recommendations: [
      {
        title: 'Virtual Interview Skills for Recruiters',
        description: 'Build confidence running structured virtual interviews, managing technical issues, and assessing candidate authenticity in immersive environments.',
        priority: 'High',
        duration: '2 weeks',
      },
      {
        title: 'VR Job Preview Design Workshop',
        description: 'Create realistic job previews using 360° video and interactive VR that help candidates self-select and measurably reduce first-year turnover.',
        priority: 'High',
        duration: '3 weeks',
      },
      {
        title: 'Bias Reduction in XR Assessment',
        description: 'Understand how avatar design, voice modulation, and algorithmic scoring in VR assessments can either reduce or amplify unconscious recruiter bias.',
        priority: 'Medium',
        duration: '2 weeks',
      },
      {
        title: 'XR Talent CRM & Pipeline Analytics',
        description: 'Use XR-integrated applicant tracking tools and spatial data to build richer candidate profiles and more accurately prioritise talent pipelines.',
        priority: 'Low',
        duration: '2 weeks',
      },
    ],
  },

  'Performance Management Lead': {
    summary:
      'Performance Management Leads can use XR to shift from retrospective reviews to continuous, observable performance data. The largest gaps are in VR performance simulation and AR feedback tooling — both enable a fundamental move away from annual review cycles toward real-time development.',
    skills: [
      {
        skill: 'VR Performance Simulation',
        required: 8, current: 2, category: 'VR',
        insight: 'Standardised VR scenarios make performance evidence objective, consistent, and legally defensible',
      },
      {
        skill: 'AR Real-Time Feedback',
        required: 8, current: 3, category: 'AR',
        insight: 'In-the-moment AR feedback closes the gap between observed behaviour and self-awareness instantly',
      },
      {
        skill: 'XR Competency Assessment',
        required: 8, current: 2, category: 'XR',
        insight: 'Immersive assessments measure competencies in action rather than relying on self-reported intent',
      },
      {
        skill: 'VR Coaching Environments',
        required: 7, current: 2, category: 'VR',
        insight: 'Private VR coaching spaces remove social anxiety and significantly improve manager-employee candour',
      },
      {
        skill: 'Digital Performance Platforms',
        required: 6, current: 8, category: 'XR',
        insight: 'Lattice/Workday fluency directly accelerates adoption of XR-integrated performance management tools',
      },
      {
        skill: 'Online 360 Feedback Tools',
        required: 5, current: 7, category: 'MR',
        insight: 'Existing 360 survey expertise provides the design framework for immersive multi-rater assessments',
      },
    ],
    recommendations: [
      {
        title: 'VR-Based Performance Scenario Design',
        description: 'Design standardised VR performance scenarios that let managers observe, record, and evaluate employees against consistent behavioural benchmarks at scale.',
        priority: 'High',
        duration: '5 weeks',
      },
      {
        title: 'AR Feedback & Coaching Tools',
        description: 'Implement AR-assisted real-time feedback overlays that provide employees with in-the-moment performance data during live work tasks without interrupting flow.',
        priority: 'High',
        duration: '3 weeks',
      },
      {
        title: 'Immersive 360-Degree Review Facilitation',
        description: 'Facilitate multi-rater 360 reviews through immersive platforms that improve response quality and significantly reduce social desirability bias.',
        priority: 'Medium',
        duration: '2 weeks',
      },
      {
        title: 'Spatial Performance Analytics',
        description: 'Interpret spatial interaction data and movement analytics from XR environments to build richer, evidence-based performance narratives for talent decisions.',
        priority: 'Medium',
        duration: '3 weeks',
      },
    ],
  },
};

export function getXRSkillsData(role) {
  return data[role] ?? null;
}

export const ALL_XR_SKILLS = Object.values(data)
  .flatMap(r => r.skills)
  .map(({ skill, category }) => ({ skill, category }));

// benchmark = the role-defined required level for each skill
export const SKILL_BENCHMARKS = Object.fromEntries(
  Object.values(data)
    .flatMap(r => r.skills)
    .map(({ skill, required }) => [skill, { benchmark: required }])
);
