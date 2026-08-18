export type PatientSummary = {
  registrationId: number;
  patientName: string;
  patientNumber: string;
  guarantorName: string;
  dateOfBirth: string;
  region: string;
  ward: string;
};

export type PatientDemographics = {
  registrationId: number;
  title: string;
  patientName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  region: string;
  district: string;
  ward: string;
  village: string;
  phoneNumber: string;
  emailAddress: string;
  memberNumber: string;
  mrnNumber: string;
  maritalStatus: string;
  occupation: string;
  status: string;
  patientType: string;
  registrationDate: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  disability: string;
  bloodGroup: string;
};
