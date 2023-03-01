import { request } from "umi";

const CHATGPT_DEFAULT_DATA = {
  chat_id: "bba972a7-4f5e-4980-9c44-0592ec0e5e0e",
  chat_name: "user",
};

const sendMessage = (prompt) => {
  return request.post("/api/message/send", {
    ...CHATGPT_DEFAULT_DATA,
    prompt,
  });
};

export { sendMessage };
