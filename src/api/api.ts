import config from '../config/config';

const base = config.serverUrl; // http://localhost:8787/


type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async (
  method: Method, 
  endpoint: string, 
  body?: object,
  token?: string
) => {
 
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

  if(token) options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`
  };

  const res = await fetch(endpoint, options);

  if (!res.ok) {
    throw new Error("Network Error");
  }

  const json = await res.json();
  return json;
}