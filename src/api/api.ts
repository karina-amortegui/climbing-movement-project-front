import config from "../config/config";

const base = config.serverUrl; // http://localhost:8787/

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async (
  method: Method,
  endpoint: string,
  body?: object,
) => {
  // const { body, token} = optional

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

  if (!res.ok) {
    throw new Error("Network Error");
  }

  // handle 401 unauthorized. ( which would mean -> token expired )
  // res.status === 401
  // modal relogin popup

  const json = await res.json();
  return json;
};
