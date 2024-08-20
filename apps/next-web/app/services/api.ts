import fetch from 'isomorphic-fetch';

const apiUrl = '';
const assistantId = 'asst_zKTC440WR5c1pr5T9QshqK69';

export const getThread = async (threadId: string) => fetch(`${apiUrl}/assistant/threads/${threadId}`).then((body) => body.json());

export const startThread = async () => fetch(`${apiUrl}/assistant/threads`, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "messages": []
  })
}).then((body) => body.json());

export const postMessage = async (threadId: string, content: string) => fetch(`${apiUrl}/assistant/chat`, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    threadId,
    content,
    "assistantId": assistantId,
    "attachments": [],
    "metadata": {}
  })
}).then((body) => body.json());