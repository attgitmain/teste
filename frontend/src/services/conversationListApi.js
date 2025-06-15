import api from "./api";

export const listConversationLists = () => api.get("/conversation-lists");
export const uploadConversationList = formData =>
  api.post("/conversation-lists", formData);
export const deleteConversationList = id =>
  api.delete(`/conversation-lists/${id}`);
