export interface Job {
  id: string;
  title: string;
  company: string;
  logoColor: string; // for custom stylized visual logos
  logoText: string;  // initials of company
  salary: string;
  city: string;
  province: string;
  industry: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  remoteType: 'Remote' | 'Hybrid' | 'On-site';
  experience: 'Entry Level' | 'Mid Level' | 'Senior Level';
  isUrgent: boolean;
  isLMIAAvailable: boolean;
  isImmigrationFriendly: boolean;
  requiresPoliceCheck: boolean;
  employerVerificationLevel: 'Basic' | 'Premium' | 'Enterprise';
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
  saved?: boolean;
  applied?: boolean;
}

export type ProvinceName =
  | 'Greater Toronto Area'
  | 'Ottawa & Eastern Ontario'
  | 'Hamilton, Niagara & Halton'
  | 'Southwestern Ontario'
  | 'Northern Ontario';

export interface ProvinceInfo {
  name: ProvinceName;
  code: string;
  jobCount: number;
  image: string;
}

export interface JobCategory {
  name: string;
  count: number;
  iconName: string;
}

export interface EmployerVerificationTier {
  id: 'Basic' | 'Premium' | 'Enterprise';
  name: string;
  badgeColor: string;
  price: string;
  description: string;
  features: string[];
}

export interface CandidateVerificationTier {
  name: string;
  price: string;
  badgeName: string;
  features: string[];
}

export interface PoliceCheckRecord {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  provinceOfResidence: string;
  address: string;
  status: 'Not Started' | 'Submitted' | 'Identity Verified' | 'Background Searching' | 'Completed';
  submittedAt: string;
  completedAt?: string;
  feePaid: boolean;
}

export interface SiteContent {
  listingsTitle: string;
  listingsSubtitle: string;
  resultsBadgeSuffix: string;
  customResultCount?: string;
  categoriesTitle: string;
  categoriesSubtitle: string;
  regionsTitle: string;
  regionsSubtitle: string;
  heroTitle: string;
  heroSubtitle: string;
}

export interface UserState {
  savedJobs: string[]; // Job IDs
  appliedJobs: { jobId: string; appliedAt: string; status: 'Submitted' | 'Reviewing' | 'Interview Scheduled' | 'Offered' | 'Declined' }[];
  isCandidateVerified: boolean;
  candidateVerificationStatus: 'None' | 'Pending' | 'Verified';
  policeCheck: PoliceCheckRecord | null;
}

export interface SearchFilters {
  title: string;
  city: string;
  province: string;
  industry: string;
  jobType: string;
  remoteType: string;
}

