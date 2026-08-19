
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { fetchPatientById } from "../../api/patients";
import type { PatientDemographics } from "../../types/patient";
/*Adding Editing state */
//import { updatePatient } from "../../api/patients";

type PatientDetailProps = {
  registrationId: number | string;
};

function DetailRow({ label, value }: { label: string; value?: string | number }) {
  return (
    <tr>
      <th>{label}</th>
      <td>{value || "—"}</td>
    </tr>
  );
}

/**(alias) useState<boolean>(initialState: boolean | (() => boolean)): [boolean, (value: React.SetStateAction<boolean>) => void] (+1 overload)
import useState

Returns a stateful value, and a function to update it. @version — 16.8.0@see — https://react.dev/reference/react/useState */

function PatientDetail({ registrationId }: PatientDetailProps) {
  const [patient, setPatient] = useState<PatientDemographics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {id} = useParams();
  console.log(id);

  /*editingstate */

//const [editing, setEditing] = useState(false);
//const [patientName, setPatientName] = useState("");
//const [gender, setGender] = useState<"Female" | "Male">("Male");
//const [saving, setSaving] = useState(false);


  useEffect(() => {
    const uid = Number(id);

    // if (!registrationId || Number.isNaN(id)) {
    //   setError("Invalid patient ID.");
    //   setLoading(false);
    //   return;
    // }

    async function loadPatient() {
      try {
        setLoading(true);
        setError("");
        
        const data = await fetchPatientById(uid);

        if (!data) {
          setError("Patient not found.");
          return;
        }
        setPatient(data);
        //setPatientName(data.patientName);
        //setGender(data.gender as "Female" | "Male");

        setPatient(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response
              ? `Server error: ${err.response.status}`
              : `Request failed: ${err.message}`
          );
        } else {
          setError("Failed to fetch patient details.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [id]);

  if (loading) {
    return <p>Loading patient details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to patients</Link>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="table_screen">
      <p>
        <Link to="/">← Back to patients</Link>
      </p>

      <h2> Patient_Name: {patient.patientName}</h2>
      <p>Registration ID: {patient.registrationId}</p>

      <table border={1} cellPadding={8} cellSpacing={0} className="patient_table" >
        <tbody >
          <DetailRow label="Title" value={patient.title} />
          <DetailRow label="Gender" value={patient.gender} />
          <DetailRow label="Date of Birth" value={patient.dateOfBirth} />
          <DetailRow label="Marital Status" value={patient.maritalStatus} />
          <DetailRow label="Blood Group" value={patient.bloodGroup} />
          <DetailRow label="Disability" value={patient.disability} />
          <DetailRow label="Country" value={patient.country} />
          <DetailRow label="Region" value={patient.region} />
          <DetailRow label="District" value={patient.district} />
          <DetailRow label="Ward" value={patient.ward} />
          <DetailRow label="Village" value={patient.village} />
          <DetailRow label="Phone Number" value={patient.phoneNumber} />
          <DetailRow label="Email Address" value={patient.emailAddress} />
          <DetailRow label="Member Number" value={patient.memberNumber} />
          <DetailRow label="MRN Number" value={patient.mrnNumber} />
          <DetailRow label="Occupation" value={patient.occupation} />
          <DetailRow label="Patient Type" value={patient.patientType} />
          <DetailRow label="Status" value={patient.status} />
          <DetailRow label="Registration Date" value={patient.registrationDate} />
          <DetailRow
            label="Emergency Contact Name"
            value={patient.emergencyContactName}
          />
          <DetailRow
            label="Emergency Contact Number"
            value={patient.emergencyContactNumber}
          />
        </tbody>
      </table>
    </div>
  );
}


/*Save function */
/** 
 * async function handleSave() {
  if (!patient) return;

  try {
    setSaving(true);
    setError("");

    const updatedPatient = await updatePatient(
      Number(patient.registrationId),
      patientName,
      gender
    );

    setPatient(updatedPatient);
    setEditing(false);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(
        err.response
          ? `Server error: ${err.response.status}`
          : `Request failed: ${err.message}`
      );
    } else {
      setError("Failed to update patient details.");
    }
  } finally {
    setSaving(false);
  }
}
*/




export default PatientDetail;

/*
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { fetchPatientById } from "../../api/patients";
import type { PatientDemographics } from "../../types/patient";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <th>{label}</th>
      <td>{value || "—"}</td>
    </tr>
  );
}

function PatientDetail() {
  const { id } = useParams();
  const Registration_Id = Number(id);
  const [patient, setPatient] = useState<PatientDemographics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!Registration_Id || Number.isNaN(Registration_Id)) {
      setError("Invalid patient ID.");
      setLoading(false);
      return;
    }

    async function loadPatient() {
      try {
        const data = await fetchPatientById(Registration_Id);
        if (!data) {
          setError("Patient not found.");
          return;
        }

        setPatient(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response
              ? `Server error: ${err.response.status}`
              : `Request failed: ${err.message}`
          );
        } else {
          setError("Failed to fetch patient details.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [Registration_Id]);

  if (loading) {
    return <p>Loading patient details...</p>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <Link to="/">Back to patients</Link>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div>
      <p>
        <Link to="/">← Back to patients</Link>
      </p>

      <h2>{patient.patientName}</h2>
      <p>Registration ID: {patient.registrationId}</p>

      <table border={1} cellPadding={8} cellSpacing={0}>
        <tbody>
          <DetailRow label="Title" value={patient.title} />
          <DetailRow label="Gender" value={patient.gender} />
          <DetailRow label="Date of Birth" value={patient.dateOfBirth} />
          <DetailRow label="Marital Status" value={patient.maritalStatus} />
          <DetailRow label="Blood Group" value={patient.bloodGroup} />
          <DetailRow label="Disability" value={patient.disability} />
          <DetailRow label="Country" value={patient.country} />
          <DetailRow label="Region" value={patient.region} />
          <DetailRow label="District" value={patient.district} />
          <DetailRow label="Ward" value={patient.ward} />
          <DetailRow label="Village" value={patient.village} />
          <DetailRow label="Phone Number" value={patient.phoneNumber} />
          <DetailRow label="Email Address" value={patient.emailAddress} />
          <DetailRow label="Member Number" value={patient.memberNumber} />
          <DetailRow label="MRN Number" value={patient.mrnNumber} />
          <DetailRow label="Occupation" value={patient.occupation} />
          <DetailRow label="Patient Type" value={patient.patientType} />
          <DetailRow label="Status" value={patient.status} />
          <DetailRow
            label="Registration Date"
            value={patient.registrationDate}
          />
          <DetailRow
            label="Emergency Contact Name"
            value={patient.emergencyContactName}
          />
          <DetailRow
            label="Emergency Contact Number"
            value={patient.emergencyContactNumber}
          />
        </tbody>
      </table>
    </div>
  );
}

export default PatientDetail;
*/