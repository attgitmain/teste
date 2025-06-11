import api from "./api";

export const startMaturation = (data) => api.post("/maturation", data);
export const listMaturations = () => api.get("/maturation");
export const getMaturation = (id) => api.get(`/maturation/${id}`);
export const cancelMaturation = (id) => api.delete(`/maturation/${id}`);
export const getMaturationLogs = (id) => api.get(`/maturation/${id}/logs`);
