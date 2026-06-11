import apiClient from "../index";
import type { Message } from "../types/contactus.types";

export const contactusApi = {
  sendMessage: (data: Message) => {
    return apiClient.post("/contact-us", data);
  },
};
