import { Job, ProvinceInfo, JobCategory } from '../types';
import ottImage from '../assets/images/regenerated_image_1784697228569.jpg';
import hamImage from '../assets/images/regenerated_image_1784697142703.avif';
import swImage from '../assets/images/regenerated_image_1784697143275.jpg';
import northImage from '../assets/images/regenerated_image_1784697143573.jpg';

export const mockJobs: Job[] = [
  // Greater Toronto Area (7 jobs)
  {
    id: 'job-1',
    title: 'Registered Practical Nurse (RPN)',
    company: 'Toronto Grace Health Network',
    logoColor: 'bg-emerald-100 text-emerald-700',
    logoText: 'TG',
    salary: '$34.50 - $42.00 / hour',
    city: 'Toronto',
    province: 'Greater Toronto Area',
    industry: 'Healthcare',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'We are seeking a compassionate and dedicated Registered Practical Nurse (RPN) to join our growing clinical care team in Toronto. In this role, you will provide top-quality nursing care to residents, collaborate with an interdisciplinary medical team, and ensure patient safety and dignity at all times.',
    requirements: [
      'Active registration in good standing with the College of Nurses of Ontario (CNO).',
      'Valid CPR/First Aid certification.',
      'Strong interpersonal and clinical communication skills.',
      'Must pass a Vulnerable Sector Police Check (available through this portal).'
    ],
    benefits: [
      'Comprehensive dental and medical health coverage.',
      'Paid sick leave and vacation days.',
      'Opportunities for continuing education and tuition reimbursement.',
      'Employer-sponsored RRSP matching program.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-2',
    title: 'Financial Analyst',
    company: 'Bay Street Capital Partners',
    logoColor: 'bg-indigo-100 text-indigo-700',
    logoText: 'BS',
    salary: '$78,000 - $92,000 / year',
    city: 'Toronto',
    province: 'Greater Toronto Area',
    industry: 'Finance',
    jobType: 'Full-time',
    remoteType: 'Hybrid',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Join our premier finance team on Bay Street. We are looking for a detailed Financial Analyst to build predictive models, analyze provincial market opportunities, and manage corporate investment portfolios with institutional grade compliance and oversight.',
    requirements: [
      'Bachelor’s degree in Finance, Accounting, Economics, or related field.',
      'Completed or active pursuit of CFA or CPA designation.',
      'Advanced financial modeling skills in Excel and SQL.',
      'Credit and comprehensive national criminal background check clearance.'
    ],
    benefits: [
      'Standard corporate health, vision, and dental benefits.',
      'Annual performance-based cash bonuses.',
      'Paid professional association dues.',
      'Hybrid work model (3 days office, 2 days remote).'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-3',
    title: 'Lead Software Engineer',
    company: 'Vaughan Tech Labs',
    logoColor: 'bg-blue-100 text-blue-700',
    logoText: 'VT',
    salary: '$125,000 - $145,000 / year',
    city: 'Vaughan',
    province: 'Greater Toronto Area',
    industry: 'IT',
    jobType: 'Full-time',
    remoteType: 'Remote',
    experience: 'Senior Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Vaughan Tech Labs designs security-first software utilities for public networks. We are looking for a Lead Engineer to manage our microservices architecture, implement secure authentication layers, and lead a remote-first team of developers.',
    requirements: [
      '6+ years of software architecture and development experience in Node.js, React, and AWS.',
      'Strong knowledge of modern secure coding standards and cryptography.',
      'Excellent mentorship skills for junior and mid-level engineering staff.',
      'Mandatory criminal background check verification.'
    ],
    benefits: [
      '100% remote flexibility within Ontario.',
      'Generous home office equipment stipend ($2,000).',
      'Stock options and annual company-wide profit-sharing.',
      'Unlimited paid personal time off.'
    ],
    postedAt: '2026-07-17'
  },
  {
    id: 'job-4',
    title: 'Inventory Control Specialist',
    company: 'Mississauga LogiPort Inc',
    logoColor: 'bg-amber-100 text-amber-800',
    logoText: 'ML',
    salary: '$22.00 - $26.50 / hour',
    city: 'Mississauga',
    province: 'Greater Toronto Area',
    industry: 'Warehouse',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Entry Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Seeking a detail-focused Inventory Control Specialist to operate warehouse management systems, perform regular cycle counts, manage high-value incoming freight, and ensure secure stock transfers at our major Mississauga shipping hub.',
    requirements: [
      '1+ year of warehouse logistics, inventory control, or shipping/receiving experience.',
      'Proficiency with hand-held RF scanners and computerized inventory software.',
      'Able to lift up to 50 lbs comfortably and work on foot for extended periods.',
      'Clear police background check is mandatory due to secure warehouse bond.'
    ],
    benefits: [
      'Competitive hourly wage with weekly direct deposit.',
      'Paid training and forklift certification opportunities.',
      'Comprehensive group health and dental plan.',
      'Annual safety boot allowance ($200).'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-5',
    title: 'Bilingual Customer Success Representative',
    company: 'Markham Global Connect',
    logoColor: 'bg-purple-100 text-purple-700',
    logoText: 'MG',
    salary: '$24.50 - $28.00 / hour',
    city: 'Markham',
    province: 'Greater Toronto Area',
    industry: 'Customer Service',
    jobType: 'Full-time',
    remoteType: 'Remote',
    experience: 'Entry Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Support our national enterprise client base from your home office in Markham. You will address client inquiries, help coordinate software provisioning, and resolve billing issues with an emphasis on empathetic, polite communication.',
    requirements: [
      'Fluent bilingualism in written and spoken English and French.',
      'Strong digital literacy and experience with CRM platforms (Salesforce, Zendesk).',
      'High-speed home internet and a quiet, dedicated home workspace.',
      'Security screening and criminal history check required.'
    ],
    benefits: [
      'Full computer setup, dual monitors, and noise-cancelling headset provided.',
      'Paid 4-week virtual onboarding and training program.',
      'Health and vision benefits from day one.',
      'Performance-based career advancement pathways.'
    ],
    postedAt: '2026-07-16'
  },
  {
    id: 'job-6',
    title: 'Construction Foreman',
    company: 'Brampton Infrastructure Builders',
    logoColor: 'bg-rose-100 text-rose-700',
    logoText: 'BI',
    salary: '$38.00 - $46.00 / hour',
    city: 'Brampton',
    province: 'Greater Toronto Area',
    industry: 'Construction',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Senior Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Manage an active highway and civic infrastructure construction crew in Brampton. You will oversee daily operations, coordinate heavy equipment scheduling, enforce provincial safety codes, and report directly to project engineers.',
    requirements: [
      '5+ years of lead hand or foreman experience in civil construction and concrete work.',
      'Valid Ontario Class G driver’s license with a clean abstract.',
      'Certifications in Working at Heights and WHMIS.',
      'Standard criminal record clearance required for civic project site access.'
    ],
    benefits: [
      'Highly competitive salary with extensive overtime availability.',
      'Company vehicle, fuel card, and mobile phone provided.',
      'Excellent commercial health insurance package.',
      'Generous company pension contribution.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-7',
    title: 'Civil Engineer (EIT)',
    company: 'Richmond Hill Development Group',
    logoColor: 'bg-teal-100 text-teal-700',
    logoText: 'RH',
    salary: '$70,000 - $82,000 / year',
    city: 'Richmond Hill',
    province: 'Greater Toronto Area',
    industry: 'Engineering',
    jobType: 'Full-time',
    remoteType: 'Hybrid',
    experience: 'Entry Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'We are seeking an enthusiastic Engineer-in-Training (EIT) to assist with site grading, stormwater design plans, municipal submission reviews, and construction inspections across major residential projects in Richmond Hill.',
    requirements: [
      'University degree in Civil Engineering or related field.',
      'Registered as an EIT with Professional Engineers Ontario (PEO).',
      'Proficiency in AutoCAD Civil 3D and storm modelling software.',
      'Passing a criminal history check for access to municipal job sites.'
    ],
    benefits: [
      'Mentorship program under senior P.Eng. staff to count toward license.',
      'PEO registration fees and exam preparation courses fully funded.',
      'Flexible hybrid schedule (3 days office, 2 days remote).',
      'Extended health, massage therapy, and dental benefits.'
    ],
    postedAt: '2026-07-15'
  },

  // Ottawa & Eastern Ontario (5 jobs)
  {
    id: 'job-8',
    title: 'Public Health Policy Officer',
    company: 'Ottawa Federal Relations Office',
    logoColor: 'bg-cyan-100 text-cyan-800',
    logoText: 'OF',
    salary: '$84,000 - $98,000 / year',
    city: 'Ottawa',
    province: 'Ottawa & Eastern Ontario',
    industry: 'Government',
    jobType: 'Full-time',
    remoteType: 'Hybrid',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: false,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Coordinate health policy development and regulatory reviews in our central Ottawa office. This role involves researching preventative health guidelines, consulting with regional healthcare providers, and preparing briefing decks for senior officials.',
    requirements: [
      'Master’s degree in Public Health, Public Administration, or related social sciences.',
      '3+ years of professional policy development or analysis experience.',
      'Excellent written English (French bilingualism is highly preferred).',
      'Must pass a high-level Federal Vulnerable Sector and Criminal Records Check.'
    ],
    benefits: [
      'Defined-benefit public service pension plan.',
      '4 weeks of paid annual vacation plus personal days.',
      'Excellent job security and union-supported environment.',
      'Comprehensive medical, travel, and dental insurance.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-9',
    title: 'Child and Youth Worker',
    company: 'Kingston Community Care',
    logoColor: 'bg-pink-100 text-pink-700',
    logoText: 'KC',
    salary: '$26.00 - $31.50 / hour',
    city: 'Kingston',
    province: 'Ottawa & Eastern Ontario',
    industry: 'Education',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Provide emotional, behavioral, and educational support to youth in group residences and school programs across Kingston. Design customized intervention programs, teach life skills, and guide positive community reintegration.',
    requirements: [
      'Diploma or Degree in Child and Youth Care (CYC) or equivalent.',
      'Valid First Aid/CPR-C and Safe Management / CPI certification.',
      'Strong crisis intervention, de-escalation, and counseling skills.',
      'Mandatory up-to-date Vulnerable Sector Check (CRA/CPIC).'
    ],
    benefits: [
      'Competitive wages with annual cost-of-living increases.',
      'Comprehensive health, dental, and vision benefit packages.',
      'Generous paid sick and mental health days.',
      'Extensive professional development and workshop funding.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-10',
    title: 'Distribution Center Lead',
    company: 'Cornwall Safe Shipping Ltd',
    logoColor: 'bg-yellow-100 text-yellow-800',
    logoText: 'CS',
    salary: '$25.00 - $29.00 / hour',
    city: 'Cornwall',
    province: 'Ottawa & Eastern Ontario',
    industry: 'Warehouse',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Manage a shift of 20 distribution operatives at our major Cornwall logistics park. You will coordinate outgoing transport schedules, audit storage protocols, ensure strict safety compliance, and operate heavy warehouse mechanics.',
    requirements: [
      '3+ years in a senior warehouse position, lead hand, or supervisor role.',
      'Valid license to operate stand-up and sit-down forklifts.',
      'Working knowledge of barcode structures, WMS software, and inventory control.',
      'Must pass a detailed criminal background search.'
    ],
    benefits: [
      'Excellent health benefits and paid sick leave.',
      'Overtime premium pay (1.5x) for holiday shifts.',
      'Matched RSP retirement savings contributions.',
      'Free parking and active transit commuter bonus.'
    ],
    postedAt: '2026-07-15'
  },
  {
    id: 'job-11',
    title: 'Guest Relations Supervisor',
    company: 'Belleville Bay Hotel & Resort',
    logoColor: 'bg-orange-100 text-orange-700',
    logoText: 'BB',
    salary: '$22.50 - $26.00 / hour',
    city: 'Belleville',
    province: 'Ottawa & Eastern Ontario',
    industry: 'Hospitality',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Supervise guest check-ins, resolve booking inquiries, and maintain high safety and hospitality standards at our premier lakeside resort in Belleville. Coordinate with housekeeping and maintenance teams to ensure flawless stays.',
    requirements: [
      '2+ years of hospitality front desk, hotel service, or resort operations experience.',
      'Strong interpersonal skills and friendly, welcoming demeanor.',
      'Comfortable with computerized PMS booking systems (Opera, Maestro, etc.).',
      'Valid police record clearance check due to secure cash-handling responsibilities.'
    ],
    benefits: [
      'Free meal during every shift and dry cleaning for professional attire.',
      'Subsidized local gym membership.',
      'Employee discounts on hotel stays worldwide.',
      'Generous medical and dental benefits.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-12',
    title: 'IT Helpdesk Specialist',
    company: 'Peterborough Digital Solutions',
    logoColor: 'bg-blue-100 text-blue-800',
    logoText: 'PD',
    salary: '$25.00 - $31.00 / hour',
    city: 'Peterborough',
    province: 'Ottawa & Eastern Ontario',
    industry: 'IT',
    jobType: 'Contract',
    remoteType: 'Hybrid',
    experience: 'Entry Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Join our managed IT services desk in Peterborough. You will provide remote and on-site technical support, troubleshoot network connectivity issues, configure hardware, and manage software licenses for municipal clients.',
    requirements: [
      'Diploma in Network Administration, Computer Systems, or equivalent.',
      'Strong familiarity with Windows Server, Office 365, Active Directory, and Linux.',
      'CompTIA A+, Network+, or Security+ certifications are high-value assets.',
      'Criminal background check required due to accessing secure municipal servers.'
    ],
    benefits: [
      'A structured environment with rapid promotion tracks.',
      'Fully paid technical certifications and continuous education courses.',
      'Hybrid flexibility (2 days remote, 3 days office).',
      'Modern equipment provision (Mac or ThinkPad, dual monitors).'
    ],
    postedAt: '2026-07-17'
  },

  // Hamilton, Niagara & Halton (4 jobs)
  {
    id: 'job-13',
    title: 'Steelworks Maintenance Technician',
    company: 'Hamilton Industrial Steel Corp',
    logoColor: 'bg-amber-100 text-amber-700',
    logoText: 'HI',
    salary: '$35.00 - $41.50 / hour',
    city: 'Hamilton',
    province: 'Hamilton, Niagara & Halton',
    industry: 'Construction',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Perform predictive maintenance, troubleshoot heavy conveyor machinery, and repair hydraulic steel smelting systems at our primary Hamilton manufacturing facility. Ensure minimal downtime while adhering strictly to heavy industry safety codes.',
    requirements: [
      'Completed Industrial Mechanic / Millwright (433A) apprenticeship or license.',
      '3+ years repairing industrial machinery in heavy manufacturing environments.',
      'Strong ability to read engineering blue-prints and schematic drawings.',
      'Standard industrial security and criminal record check clearance.'
    ],
    benefits: [
      'Highly competitive unionized hourly wages with automatic annual increases.',
      'Excellent defined-benefit pension scheme.',
      '100% employer-funded premium health, dental, and disability insurance.',
      'All tools, boots, and safety gear fully paid.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-14',
    title: 'Quality Assurance Analyst',
    company: 'Oakville Automotive Engineering',
    logoColor: 'bg-violet-100 text-violet-700',
    logoText: 'OA',
    salary: '$75,000 - $88,000 / year',
    city: 'Oakville',
    province: 'Hamilton, Niagara & Halton',
    industry: 'Engineering',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Review manufacturing tolerances, conduct stress testing, and maintain ISO 9001 quality compliance databases at our automotive manufacturing plant in Oakville. Coordinate inspections with engineering and assembly teams.',
    requirements: [
      'Degree or Diploma in Mechanical, Industrial, or Quality Engineering.',
      '2+ years in automotive quality control or manufacturing inspection.',
      'Proficiency with precision measurement tools (CMM, calipers, micrometers).',
      'Successful passing of a detailed background safety screen.'
    ],
    benefits: [
      'Comprehensive corporate health, prescription, and dental coverage.',
      'Annual profit-sharing performance bonuses.',
      'Relocation assistance package within Ontario.',
      'Continuous training on state-of-the-art diagnostic equipment.'
    ],
    postedAt: '2026-07-16'
  },
  {
    id: 'job-15',
    title: 'Concierge & Hospitality Lead',
    company: 'Niagara Falls Resort Group',
    logoColor: 'bg-emerald-100 text-emerald-800',
    logoText: 'NF',
    salary: '$21.00 - $25.00 / hour',
    city: 'Niagara Falls',
    province: 'Hamilton, Niagara & Halton',
    industry: 'Hospitality',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Entry Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Lead a team of hospitality hosts at our premier high-traffic resort in Niagara Falls. You will coordinate guest arrival experiences, manage group excursions, resolve disputes, and maintain absolute safety and presentation standards.',
    requirements: [
      '1+ year of hotel front desk, supervisor, or senior hospitality experience.',
      'Warm, outgoing, and deeply customer-centric attitude.',
      'Excellent English communication (additional languages are a strong asset).',
      'Must pass a police criminal background check.'
    ],
    benefits: [
      'Paid shift meals, complimentary uniforms, and dry-cleaning.',
      'Exceptional performance-based tips pool distribution.',
      'Generous corporate discounts on rooms, dining, and attractions.',
      'Comprehensive health and life insurance plans.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-16',
    title: 'Safety & Logistics Coordinator',
    company: 'St. Catharines Transport',
    logoColor: 'bg-cyan-100 text-cyan-700',
    logoText: 'SC',
    salary: '$23.00 - $27.00 / hour',
    city: 'St. Catharines',
    province: 'Hamilton, Niagara & Halton',
    industry: 'Transportation',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Entry Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Audit transport driver safety logs, ensure compliance with Ministry of Transportation (MTO) regulations, plan regional shipping routes, and coordinate routine maintenance checks for our commercial trucking fleet in St. Catharines.',
    requirements: [
      'Familiarity with commercial driver logbooks, ELD systems, and cargo regulations.',
      'Strong organization skills and comfortable with digital dispatching databases.',
      'Exceptional communication and conflict resolution skills.',
      'MTO-compliant background screen and police check clearance.'
    ],
    benefits: [
      'Consistent weekday hours with no weekend or night shifts.',
      'Excellent group benefits plan (medical, dental, massage).',
      'Matched savings and pension plans.',
      'Paid vacation and personal health days.'
    ],
    postedAt: '2026-07-15'
  },

  // Southwestern Ontario (9 jobs)
  {
    id: 'job-17',
    title: 'Registered Nurse (ER)',
    company: 'London Health Sciences Centre',
    logoColor: 'bg-teal-100 text-teal-800',
    logoText: 'LH',
    salary: '$38.50 - $48.00 / hour',
    city: 'London',
    province: 'Southwestern Ontario',
    industry: 'Healthcare',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Senior Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Provide high-quality emergency nursing care at our major regional trauma hospital in London. Coordinate with medical specialists, manage fast-paced patient triage, and advocate for absolute safety and patient welfare.',
    requirements: [
      'Active registration in good standing with the College of Nurses of Ontario (CNO) as an RN.',
      '3+ years of clinical emergency room or acute care nursing experience.',
      'ACLS, PALS, and Trauma Nursing Core Course (TNCC) certifications.',
      'Mandatory clear Vulnerable Sector Police Check.'
    ],
    benefits: [
      'Highly competitive ONA-standard wages with premiums.',
      'Incredible HOOPP (Healthcare of Ontario Pension Plan) defined-benefit pension.',
      'Full, comprehensive health, dental, and massage therapy package.',
      'Paid professional development, education, and career track funding.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-18',
    title: 'Automotive Systems Programmer',
    company: 'Windsor Smart Mobility Inc',
    logoColor: 'bg-blue-100 text-blue-800',
    logoText: 'WS',
    salary: '$90,000 - $112,000 / year',
    city: 'Windsor',
    province: 'Southwestern Ontario',
    industry: 'IT',
    jobType: 'Full-time',
    remoteType: 'Hybrid',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Design and test safety-critical automotive embedded software systems in Windsor. You will write clean C/C++ scripts, model electrical controls, and ensure compliance with ISO 26262 functional safety metrics.',
    requirements: [
      'Degree in Computer Science, Software Engineering, or Electrical Engineering.',
      '3+ years programming embedded systems (C/C++, Python).',
      'Knowledge of CAN bus systems and hardware diagnostics.',
      'Must pass a detailed background safety check.'
    ],
    benefits: [
      'Highly competitive salary with stock options.',
      'Hybrid work flexibility (2 days remote, 3 days office).',
      'Comprehensive healthcare, dental, and vision packages.',
      'Relocation allowances available within Ontario.'
    ],
    postedAt: '2026-07-17'
  },
  {
    id: 'job-19',
    title: 'Software QA Engineer',
    company: 'Kitchener-Waterloo Innovation Hub',
    logoColor: 'bg-indigo-100 text-indigo-700',
    logoText: 'KW',
    salary: '$85,000 - $98,000 / year',
    city: 'Kitchener',
    province: 'Southwestern Ontario',
    industry: 'IT',
    jobType: 'Full-time',
    remoteType: 'Remote',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Coordinate automated software testing frameworks for our secure cloud document management platform in Kitchener. Build test scripts, run security vulnerability audits, and monitor CI/CD pipelines.',
    requirements: [
      '3+ years in automated software testing with Selenium, Cypress, or Playwright.',
      'Strong coding skills in TypeScript, Javascript, or Python.',
      'Understanding of database testing, REST API schemas, and cloud platforms (Azure/AWS).',
      'Passing standard criminal history background checks.'
    ],
    benefits: [
      '100% remote work flexibility within Ontario.',
      'Annual learning budget ($1,500) and home-office stipends.',
      'Excellent mental health and medical spending accounts.',
      'Company matching pension program.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-20',
    title: 'Robotics Research Engineer',
    company: 'Waterloo AI Systems',
    logoColor: 'bg-rose-100 text-rose-800',
    logoText: 'WA',
    salary: '$92,000 - $115,000 / year',
    city: 'Waterloo',
    province: 'Southwestern Ontario',
    industry: 'Engineering',
    jobType: 'Full-time',
    remoteType: 'Hybrid',
    experience: 'Mid Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Work at the leading edge of robotic automation in Waterloo. Design computer vision algorithms, program automated guided vehicle (AGV) controls, and lead prototype deployments in high-tech research spaces.',
    requirements: [
      'Master’s or Ph.D. in Robotics, Mechatronics, or Computer Engineering.',
      'Excellent programming skills in Python, C++, and experience with ROS / ROS2.',
      'Familiarity with OpenCV, PyTorch, or TensorFlow.',
      'Vetted national background check clearance.'
    ],
    benefits: [
      'Highly competitive base salary with performance equity shares.',
      'Robust corporate benefits plan including health and vision care.',
      'Flexible working arrangements and core family hours.',
      'On-site gourmet cafe and fitness facility.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-21',
    title: 'Veterinary Technician',
    company: 'Guelph Animal Wellness Clinic',
    logoColor: 'bg-emerald-100 text-emerald-700',
    logoText: 'GA',
    salary: '$24.00 - $29.50 / hour',
    city: 'Guelph',
    province: 'Southwestern Ontario',
    industry: 'Healthcare',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Support our veterinary surgeons, manage animal anesthetic monitoring, administer medications, take digital radiographs, and deliver compassionate veterinary nursing care at our leading clinic in Guelph.',
    requirements: [
      'Registered Veterinary Technician (RVT) designation in Ontario.',
      'Strong clinical animal handling skills and anesthetic experience.',
      'Warm communication skills and comfortable explaining care plans to owners.',
      'Police background check required due to access to veterinary narcotics.'
    ],
    benefits: [
      'Highly competitive RVT wages with annual performance increments.',
      'Fully paid OAVT professional registration dues.',
      'Generous staff pet medical care discount program.',
      'Comprehensive medical and dental benefits.'
    ],
    postedAt: '2026-07-16'
  },
  {
    id: 'job-22',
    title: 'Bilingual Support Specialist',
    company: 'Cambridge Services Group',
    logoColor: 'bg-purple-100 text-purple-700',
    logoText: 'CS',
    salary: '$22.00 - $25.50 / hour',
    city: 'Cambridge',
    province: 'Southwestern Ontario',
    industry: 'Customer Service',
    jobType: 'Part-time',
    remoteType: 'Remote',
    experience: 'Entry Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Provide exceptional bilingual customer, technical, and billing assistance via chat and email for our business platform. Part-time schedule offers great flexibility with shifts on evenings and weekends.',
    requirements: [
      'Fully bilingual with fluent verbal and written English and French.',
      'Comfortable using ticketing software (Zendesk, Jira Service Desk).',
      'Quiet and dedicated workspace inside Ontario.',
      'Requires clean police background check.'
    ],
    benefits: [
      'All necessary computer terminal and security devices provided.',
      'Paid professional training program (online).',
      'Pro-rated health and drug benefits program.',
      'Regular team development virtual workshops.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-23',
    title: 'Store Protection Officer',
    company: 'Brantford Retail Group',
    logoColor: 'bg-slate-100 text-slate-800',
    logoText: 'BR',
    salary: '$19.50 - $23.00 / hour',
    city: 'Brantford',
    province: 'Southwestern Ontario',
    industry: 'Retail',
    jobType: 'Part-time',
    remoteType: 'On-site',
    experience: 'Entry Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Provide asset protection and customer safety support at our major Brantford retail storefront. Monitor CCTV networks, conduct active patrols, report safety concerns, and liaise with local emergency services when necessary.',
    requirements: [
      'Valid Ontario Security Guard License and Emergency First Aid / CPR.',
      'Strong observational skills and authoritative, respectful communication.',
      'Comfortable writing detailed incident and daily shift reports.',
      'Mandatory clean criminal record check for security licensing compliance.'
    ],
    benefits: [
      'Regular, predictable shift work schedule.',
      'All security uniforms and tactical equipment provided.',
      'Generous employee retail discounts (30% off).',
      'Health and dental benefits package.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-24',
    title: 'Chemical Plant Operator',
    company: 'Sarnia Petrochemical Ltd',
    logoColor: 'bg-rose-100 text-rose-800',
    logoText: 'SP',
    salary: '$33.00 - $41.00 / hour',
    city: 'Sarnia',
    province: 'Southwestern Ontario',
    industry: 'Construction',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Senior Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: false,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Oversee and control computerized chemical refinery processes, perform periodic inspections on pipe systems, adjust valves, and implement environmental safety shutdowns at our major Sarnia refinery facility.',
    requirements: [
      'Diploma in Chemical Engineering Technology or Process Operator certification.',
      '4+ years operating in industrial oil, gas, or chemical manufacturing facilities.',
      'Strict adherence to high safety protocols (OSG/WHMIS/Hazardous chemicals).',
      'Must pass a detailed federal background screening and criminal search.'
    ],
    benefits: [
      'Highly competitive hourly rate with exceptional overtime bonuses.',
      'Extensive defined-benefit corporate retirement plan.',
      'Premium health, dental, vision, and travel insurance.',
      'Relocation assistance available within Ontario.'
    ],
    postedAt: '2026-07-14'
  },
  {
    id: 'job-25',
    title: 'Education Program Assistant',
    company: 'Stratford Festival Academy',
    logoColor: 'bg-orange-100 text-orange-800',
    logoText: 'SF',
    salary: '$23.50 - $28.00 / hour',
    city: 'Stratford',
    province: 'Southwestern Ontario',
    industry: 'Education',
    jobType: 'Contract',
    remoteType: 'Hybrid',
    experience: 'Entry Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Support the coordination of school field-trips, summer arts camps, and local drama workshops at our prestigious Stratford arts facility. Manage booking schedules, draft digital education guides, and welcome students.',
    requirements: [
      'Completed or active university studies in Education, Fine Arts, or Drama.',
      'Strong organizational, scheduling, and digital publishing skills.',
      'Warm and professional communication style with children and parents.',
      'Mandatory clean Vulnerable Sector Search due to active instruction of minors.'
    ],
    benefits: [
      'Complimentary tickets to Stratford seasonal theatre performances.',
      'Paid professional training, first-aid certification, and mentoring.',
      'Excellent creative working environment.',
      'Flexible, family-friendly hybrid schedule.'
    ],
    postedAt: '2026-07-19'
  },

  // Northern Ontario (5 jobs)
  {
    id: 'job-26',
    title: 'Mining Electrical Supervisor',
    company: 'Sudbury Nickel Operations',
    logoColor: 'bg-amber-100 text-amber-800',
    logoText: 'SN',
    salary: '$48.00 - $56.00 / hour',
    city: 'Greater Sudbury',
    province: 'Northern Ontario',
    industry: 'Engineering',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Senior Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Lead a team of mine electricians repairing high-voltage electrical distribution networks, automated haulers, and ventilation systems at our Sudbury underground mine site. Ensure strict electrical safety compliance.',
    requirements: [
      'Ontario Journeyperson Industrial Electrician License (309A).',
      '4+ years of supervisory experience in underground or heavy mining operations.',
      'Deep knowledge of the Ontario Electrical Safety Code.',
      'Must pass an intensive background check and safety screening.'
    ],
    benefits: [
      'Highly competitive salary with excellent quarterly mine safety bonuses.',
      'Incredible mining company pension program with 8% company matching.',
      '100% employer-covered executive-grade medical and dental plans.',
      'Northern living cost-of-living allowance.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-27',
    title: 'Community Mental Health Counsellor',
    company: 'Thunder Bay Health Services',
    logoColor: 'bg-emerald-100 text-emerald-800',
    logoText: 'TB',
    salary: '$35.00 - $44.00 / hour',
    city: 'Thunder Bay',
    province: 'Northern Ontario',
    industry: 'Healthcare',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Enterprise',
    description: 'Deliver mental health support, crisis counseling, and case-management solutions for vulnerable individuals across Thunder Bay. Work in partnership with outpatient teams, hospitals, and indigenous organizations.',
    requirements: [
      'Active registration in good standing with the Ontario College of Social Workers (OCSWSSW).',
      '2+ years in community-based counseling, crisis support, or mental health therapy.',
      'Strong cultural sensitivity and understanding of Northern health systems.',
      'Mandatory clear Vulnerable Sector Check (CRA/CPIC).'
    ],
    benefits: [
      'Excellent wage scale conforming to provincial public service health grids.',
      'Unmatched defined-benefit pension (HOOPP) program.',
      'Generous paid annual leave, mental health days, and sick days.',
      'Comprehensive health, dental, and alternative therapy benefits.'
    ],
    postedAt: '2026-07-18'
  },
  {
    id: 'job-28',
    title: 'Heavy Duty Equipment Mechanic',
    company: 'Sault Industrial Services',
    logoColor: 'bg-cyan-100 text-cyan-800',
    logoText: 'SI',
    salary: '$34.00 - $42.00 / hour',
    city: 'Sault Ste. Marie',
    province: 'Northern Ontario',
    industry: 'Transportation',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Senior Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Premium',
    description: 'Diagnose, troubleshoot, and repair large CAT excavation loaders, drilling rigs, and heavy diesel forestry trucks at our central Sault Ste. Marie heavy industrial workshop and field operations.',
    requirements: [
      'Ontario Heavy Duty Equipment Technician (421A) journeyman license.',
      '3+ years troubleshooting heavy industrial mechanics and hydraulics.',
      'Valid driver’s license with clean driving abstract for field service calls.',
      'Passing standard criminal history background check.'
    ],
    benefits: [
      'Generous hourly wages with extensive double-time overtime opportunities.',
      'Excellent tool allowance ($1,000 annually) and boot allowance ($250).',
      'Robust corporate pension and savings plans.',
      '100% company-paid prescription, dental, and health coverage.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-29',
    title: 'Wildfire Operations Dispatcher',
    company: 'North Bay Aviation & Safety',
    logoColor: 'bg-rose-100 text-rose-700',
    logoText: 'NB',
    salary: '$24.00 - $29.00 / hour',
    city: 'North Bay',
    province: 'Northern Ontario',
    industry: 'Government',
    jobType: 'Temporary',
    remoteType: 'On-site',
    experience: 'Entry Level',
    isUrgent: true,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Liaise with firefighting teams and aviation controllers to coordinate regional wildfire tracking, emergency resources dispatching, and radio communications at our central North Bay hangar facility.',
    requirements: [
      'Strong radio communication skills and calm demeanor under intense pressure.',
      'Experience with mapping databases, GIS platforms, and computerized dispatching.',
      'Available to work flexible shift rotations including nights and weekends.',
      'Must pass a detailed emergency operations background screen.'
    ],
    benefits: [
      'Fully paid emergency training and radio operation certifications.',
      'Great hourly shift premium rates for nights and holidays.',
      'Accrued vacation pay and contract extension opportunities.',
      'Full safety equipment and communications gear provided.'
    ],
    postedAt: '2026-07-19'
  },
  {
    id: 'job-30',
    title: 'Forestry Logistics Officer',
    company: 'Timmins Woodland Resources',
    logoColor: 'bg-emerald-100 text-emerald-800',
    logoText: 'TW',
    salary: '$26.50 - $32.00 / hour',
    city: 'Timmins',
    province: 'Northern Ontario',
    industry: 'Transportation',
    jobType: 'Full-time',
    remoteType: 'On-site',
    experience: 'Mid Level',
    isUrgent: false,
    isLMIAAvailable: false,
    isImmigrationFriendly: true,
    requiresPoliceCheck: true,
    employerVerificationLevel: 'Basic',
    description: 'Coordinate heavy timber hauling logistics, monitor GPS navigation devices across our corporate logging truck fleet, manage timber weigh-scale operations, and maintain MTO compliance logs in Timmins.',
    requirements: [
      '2+ years in shipping coordination, transportation dispatch, or forestry logistics.',
      'Proficient with logistics software, GPS tracking devices, and Excel.',
      'Excellent communication and coordination skills under dynamic field conditions.',
      'Requires standard police criminal background clearance.'
    ],
    benefits: [
      'Competitive salary with predictable weekday schedule.',
      'Company matching group savings plans (RSP).',
      'Generous medical, dental, and eye-care insurance packages.',
      'Annual winter-wear and protective boot allowance ($300).'
    ],
    postedAt: '2026-07-15'
  }
];

export const provincesList: ProvinceInfo[] = [
  { name: 'Greater Toronto Area', code: 'GTA', jobCount: 7, image: 'https://images.unsplash.com/photo-1588733103629-b77afe0425ce?auto=format&fit=crop&w=800&q=80' },
  { name: 'Ottawa & Eastern Ontario', code: 'OTT', jobCount: 5, image: ottImage },
  { name: 'Hamilton, Niagara & Halton', code: 'HAM', jobCount: 4, image: hamImage },
  { name: 'Southwestern Ontario', code: 'SW', jobCount: 9, image: swImage },
  { name: 'Northern Ontario', code: 'NORTH', jobCount: 5, image: northImage }
];

export const categoriesList: JobCategory[] = [
  { name: 'Healthcare', count: 4, iconName: 'HeartPulse' },
  { name: 'Construction', count: 3, iconName: 'Hammer' },
  { name: 'Engineering', count: 4, iconName: 'Compass' },
  { name: 'IT', count: 4, iconName: 'Laptop' },
  { name: 'Government', count: 2, iconName: 'Building' },
  { name: 'Retail', count: 1, iconName: 'ShoppingBag' },
  { name: 'Hospitality', count: 2, iconName: 'Coffee' },
  { name: 'Warehouse', count: 2, iconName: 'Package' },
  { name: 'Transportation', count: 3, iconName: 'Truck' },
  { name: 'Finance', count: 1, iconName: 'Briefcase' },
  { name: 'Education', count: 2, iconName: 'GraduationCap' },
  { name: 'Customer Service', count: 2, iconName: 'PhoneCall' }
];
