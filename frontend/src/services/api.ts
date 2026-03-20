import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// ----------------- PATIENTS -----------------
export const getPatients = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/patients`);
    return res.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

export const addPatient = async (patient: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/patients`, patient);
    return res.data;
  } catch (error) {
    console.error("Error adding patient:", error);
  }
};

export const updatePatient = async (id: string, patient: any) => {
  try {
    const res = await axios.put(`${BASE_URL}/patients/${id}`, patient);
    return res.data;
  } catch (error) {
    console.error("Error updating patient:", error);
  }
};

export const deletePatient = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/patients/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting patient:", error);
  }
};

// ----------------- SESSIONS -----------------
export const getSessions = async (patientId: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/sessions/${patientId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return [];
  }
};

export const addSession = async (session: any) => {
  try {
    const res = await axios.post(`${BASE_URL}/sessions`, session);
    return res.data;
  } catch (error) {
    console.error("Error adding session:", error);
  }
};

export const deleteSession = async (id: string) => {
  try {
    const res = await axios.delete(`${BASE_URL}/sessions/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting session:", error);
  }
};