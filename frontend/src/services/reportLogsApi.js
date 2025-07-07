import api from "./api";

export const listReportLogs = () => api.get("/reportlogs");
