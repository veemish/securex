import axios from "axios";
import type { PatientDemographics, PatientSummary } from "../types/patient";

export const API_URL =
  "http://41.188.172.204:3033/test/patient-registration";

function extractPatientList(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;

    if (Array.isArray(data.data)) {
      return data.data;
    }

    if (data.data && typeof data.data === "object") {
      const nested = data.data as Record<string, unknown>;
      if (Array.isArray(nested.data)) {
        return nested.data;
      }
    }

    if (Array.isArray(data.patients)) {
      return data.patients;
    }

    if (Array.isArray(data.results)) {
      return data.results;
    }
  }

  return [];
}

function asString(value: unknown): string {
  if (value == null) {
    return "";
  }

  return String(value);
}

export function toPatientSummary(patient: Record<string, unknown>): PatientSummary {
  return {
    registrationId: Number(patient.Registration_ID ?? 0),
    patientName:
      asString(patient.Patient_Name) ||
      asString(patient.patientName) ||
      asString(patient.patient_name) ||
      asString(patient.name),
    patientNumber:
      asString(patient.Member_Number) ||
      asString(patient.Mrn_Number) ||
      asString(patient.Registration_ID) ||
      asString(patient.patientNumber) ||
      asString(patient.patient_number),
    guarantorName:
      asString(patient.guarantorName) ||
      asString(patient.guarantor_name) ||
      asString(patient.guarantor),
    dateOfBirth:
      asString(patient.Date_Of_Birth) ||
      asString(patient.dateOfBirth) ||
      asString(patient.date_of_birth) ||
      asString(patient.dob),
    region: asString(patient.Region) || asString(patient.region),
    ward: asString(patient.Ward) || asString(patient.ward),
  };
}

export function toPatientDemographics(
  patient: Record<string, unknown>
): PatientDemographics {
  return {
    registrationId: Number(patient.Registration_ID ?? 0),
    title: asString(patient.Title),
    patientName: asString(patient.Patient_Name),
    gender: asString(patient.Gender),
    dateOfBirth: asString(patient.Date_Of_Birth),
    country: asString(patient.Country),
    region: asString(patient.Region),
    district: asString(patient.District),
    ward: asString(patient.Ward),
    village: asString(patient.village),
    phoneNumber: asString(patient.Phone_Number),
    emailAddress: asString(patient.Email_Address),
    memberNumber: asString(patient.Member_Number),
    mrnNumber: asString(patient.Mrn_Number),
    maritalStatus: asString(patient.marital_status),
    occupation: asString(patient.Occupation),
    status: asString(patient.Status),
    patientType: asString(patient.patient_type),
    registrationDate: asString(patient.Registration_Date_And_Time),
    emergencyContactName: asString(patient.Emergence_Contact_Name),
    emergencyContactNumber: asString(patient.Emergence_Contact_Number),
    disability: asString(patient.disability),
    bloodGroup: asString(patient.Blood_Group),
  };
}

export async function fetchPatients(): Promise<PatientSummary[]> {
  const response = await axios.get(API_URL);
  return extractPatientList(response.data).map(toPatientSummary);
}

export async function fetchPatientById(
  registrationId: number
): Promise<PatientDemographics | null> {
  const response = await axios.get(API_URL);
  const patient = extractPatientList(response.data).find(
    (record) => Number(record.Registration_ID) === registrationId
  );

  return patient ? toPatientDemographics(patient) : null;
}
