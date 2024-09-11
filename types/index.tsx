export interface RegisterType {
  email: string;
  password: string;
  userName: string;
}

export interface AboutBusinessProps {
  ownerName?: string;
  businessName?: string;
  yearFounded?: string;
  employees?: string;
  businessAddress?: string;
  statee?: string;
  startPrice?: string;
  noticePeriod?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  contactPersonEmail?: string;
}

export interface InsuranceFormProps {
  insuringOrganization: string;
  typeOfCover: string;
  description: string;
}

export interface HiringDetails {
  fullName: string;
  jobType: string;
  jobDetails: string;
  location: string;
}

export interface MilestonePer {
  id: string;
  duration: string;
  durationType: string;
  details: string;
  amount: any;
  milestoneStatus: string;
  percentage: any;
}

export interface PostJobType {
  category: string;
  service: string;
  projectTitle: string;
  description: string;
  projectDuration: number | string;
  projectDurationType: string;
  maximumPrice: any;
  bidRange: number | string;
  location: string;
  expertLevel: string;
  milestonesNumber: number;
  budget: any;
}
