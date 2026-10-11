import config from '../config/config';

const base = config.serverUrl; // http://localhost:8787/


type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async (method: Method, endpoint: string, body?: object) => {
  // method - GET
  // endpoint - movements/1
  // body - undefined
  endpoint = base + endpoint;
  
  console.log("api/api.ts: request: endpoint=", endpoint);

  const options: {
    method: Method,
    headers?: HeadersInit,
    body?: string
  } = {
    method,
    headers: { "Content-Type": "application/json" }
  }

  if(body) options.body = JSON.stringify(body)

  const res = await fetch(endpoint, options);

  if (!res.ok) {
    throw new Error("Network Error");
  }

  const json = await res.json();
  return json;
}