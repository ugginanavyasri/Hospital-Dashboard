import React, { useEffect, useState } from "react";
import {
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
  getSessions,
  addSession,
  deleteSession,
} from "../services/api";
import "../index.css";

const Dashboard = () => {
  // Patients state
  const [patients, setPatients] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dryWeight, setDryWeight] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterGender, setFilterGender] = useState("");

  // Sessions state
  const [currentPatientId, setCurrentPatientId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [sessionDate, setSessionDate] = useState("");
  const [preWeight, setPreWeight] = useState("");
  const [postWeight, setPostWeight] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [duration, setDuration] = useState("");
  const [machineId, setMachineId] = useState("");
  const [nurseNotes, setNurseNotes] = useState("");

  // Fetch patients
  const fetchPatients = async () => {
    const data = await getPatients();
    setPatients(data);
  };
  useEffect(() => { fetchPatients(); }, []);

  // Patient handlers
  const handleSubmit = async () => {
    if (!name || !age || !gender || !dryWeight) return alert("Fill all fields");
    const patientData = { name, age: Number(age), gender, dryWeight: Number(dryWeight) };
    if (editingId) {
      await updatePatient(editingId, patientData);
      setEditingId(null);
    } else await addPatient(patientData);
    setName(""); setAge(""); setGender(""); setDryWeight("");
    fetchPatients();
  };

  const handleEditPatient = (p: any) => {
    setName(p.name); setAge(p.age.toString()); setGender(p.gender); setDryWeight(p.dryWeight.toString());
    setEditingId(p._id);
  };
  const handleDeletePatient = async (id: string) => {
    if (window.confirm("Delete this patient?")) {
      await deletePatient(id); fetchPatients();
    }
  };

  // Session handlers
  const handleViewSessions = async (patientId: string) => {
    setCurrentPatientId(patientId);
    const data = await getSessions(patientId);
    setSessions(data);
  };
  const handleAddSession = async () => {
    if (!sessionDate || !preWeight || !postWeight || !systolicBP || !diastolicBP || !duration || !machineId)
      return alert("Fill all session fields");
    await addSession({
      patientId: currentPatientId,
      date: sessionDate,
      preWeight: Number(preWeight),
      postWeight: Number(postWeight),
      systolicBP: Number(systolicBP),
      diastolicBP: Number(diastolicBP),
      duration: Number(duration),
      machineId,
      nurseNotes
    });
    const data = await getSessions(currentPatientId!);
    setSessions(data);
    setSessionDate(""); setPreWeight(""); setPostWeight(""); setSystolicBP("");
    setDiastolicBP(""); setDuration(""); setMachineId(""); setNurseNotes("");
  };
  const handleDeleteSession = async (id: string) => {
    await deleteSession(id);
    const data = await getSessions(currentPatientId!);
    setSessions(data);
  };

  // Filtered & sorted patients
  const displayedPatients = patients
    .filter(p => !filterGender || p.gender === filterGender)
    .sort((a,b)=>a.age-b.age);

  return (
    <div className="dashboard-container">
      <h1>Dialysis Dashboard</h1>

      {/* Patient Form */}
      <div className="form-row">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Age" type="number" value={age} onChange={e=>setAge(e.target.value)} />
        <select value={gender} onChange={e=>setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input placeholder="Dry Weight (kg)" type="number" value={dryWeight} onChange={e=>setDryWeight(e.target.value)} />
        <button onClick={handleSubmit}>{editingId ? "Update" : "Add"}</button>
      </div>

      {/* Filter */}
      <div className="form-row">
        <label>Filter by Gender: </label>
        <select value={filterGender} onChange={e=>setFilterGender(e.target.value)}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Patients Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Gender</th><th>Dry Weight</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPatients.map(p=>(
            <tr key={p._id}>
              <td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td><td>{p.dryWeight} kg</td>
              <td>
                <button onClick={()=>handleEditPatient(p)}>Edit</button>
                <button onClick={()=>handleDeletePatient(p._id)}>Delete</button>
                <button onClick={()=>handleViewSessions(p._id)}>Sessions</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sessions Modal */}
      {currentPatientId && (
        <div className="session-modal">
          <h3>Sessions</h3>
          <input type="date" value={sessionDate} onChange={e=>setSessionDate(e.target.value)} />
          <input type="number" placeholder="Pre Weight" value={preWeight} onChange={e=>setPreWeight(e.target.value)} />
          <input type="number" placeholder="Post Weight" value={postWeight} onChange={e=>setPostWeight(e.target.value)} />
          <input type="number" placeholder="Systolic BP" value={systolicBP} onChange={e=>setSystolicBP(e.target.value)} />
          <input type="number" placeholder="Diastolic BP" value={diastolicBP} onChange={e=>setDiastolicBP(e.target.value)} />
          <input type="number" placeholder="Duration (hrs)" value={duration} onChange={e=>setDuration(e.target.value)} />
          <input type="text" placeholder="Machine ID" value={machineId} onChange={e=>setMachineId(e.target.value)} />
          <input type="text" placeholder="Nurse Notes" value={nurseNotes} onChange={e=>setNurseNotes(e.target.value)} />
          <button onClick={handleAddSession}>Add Session</button>

          <table>
            <thead>
              <tr>
                <th>Date</th><th>Pre</th><th>Post</th><th>BP</th><th>Duration</th><th>Machine</th><th>Notes</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(s=>(
                <tr key={s._id}>
                  <td>{new Date(s.date).toLocaleDateString()}</td>
                  <td>{s.preWeight} kg</td>
                  <td>{s.postWeight} kg</td>
                  <td>{s.systolicBP}/{s.diastolicBP}</td>
                  <td>{s.duration} hrs</td>
                  <td>{s.machineId}</td>
                  <td>{s.nurseNotes}</td>
                  <td><button onClick={()=>handleDeleteSession(s._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={()=>setCurrentPatientId(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;