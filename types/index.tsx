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
