import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Experience APIs
export const getExperiences = () => API.get("/experiences");
export const getExperienceById = (id: string) => API.get(`/experiences/${id}`);

// Booking APIs
export const createBooking = (data: any) => API.post("/bookings", data);
export const validatePromo = (code: string) => API.post("/bookings/promo", { code });
