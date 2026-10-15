import config from "../config/config";

const base = config.serverUrl; // http://localhost:8787/

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestOptions = {
  body?: object;
};

export const request = async (
  method: Method,
  endpoint: string,
  optional: RequestOptions = {},
) => {
  const { body } = optional;

  endpoint = base + endpoint;

  console.log("api/api.ts: request: endpoint=", endpoint);

  const options: {
    method: Method;
    headers?: HeadersInit;
    body?: string;
  } = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (body) options.body = JSON.stringify(body);

  const token = localStorage.getItem("token");

  if (token)
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

  const res = await fetch(endpoint, options);

  if (res.status === 401) {
    window.dispatchEvent(new Event("auth:unauthorized"));
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error("Network Error");
  }

  const json = await res.json();
  return json;
};
