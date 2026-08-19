import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchPatients } from "../../api/patients";
import type { PatientSummary } from "../../types/patient";
import type { PatientDemographics } from "../../types/patient";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", {
            message: err.message,
            code: err.code,
            status: err.response?.status,
            data: err.response?.data,
            url: err.config?.url,
          });
          setError(
            err.response
              ? `Server error: {err.response.status}`
              : `Request failed: {err.message}`
          );
        } else {
          console.error("Unknown error:", err);
          setError("Failed to fetch patients.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  if (loading) {
    return <p>Loading patients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="patienttableheader">Patients</h2>

      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Patient Number</th>
              <th>Guarantor Name</th>
              <th>Date of Birth</th>
              <th>Region</th>
              <th>Ward</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.registrationId}
                onClick={() => navigate(`/patients/${patient.registrationId}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{patient.patientName}</td>
                <td>{patient.patientNumber}</td>
                <td>{patient.guarantorName}</td>
                <td>{patient.dateOfBirth}</td>
                <td>{patient.region}</td>
                <td>{patient.ward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/*updating API function */

const patientUrl =  "http://41.188.172.204:3033/test/patient-registration";

export async function updatePatient( 
   registrationId: number,  
  patientName: string,  
  gender: "Female" | "Male"): Promise<PatientDemographics>
   {  const response = await axios.put<PatientDemographics>
    (  `${patientUrl}/${registrationId}`,    
    {  Patient_Name: patientName, 
       Gender: gender,  
     } 
    );
  return response.data;
}


export default Patients;
