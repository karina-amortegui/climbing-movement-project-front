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
  // endpoint - /movements/admin/all
  const { body } = optional;

  endpoint = base + endpoint;
  // http://localhost:8787/movements/admin/all

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
    window.dispatchEvent(
      new Event("auth:unauthorized"),
      // new CustomEvent("auth:unauthorized", {
      //   detail: {
      //     retry: await request(
      //       method,
      //       endpoint.slice(endpoint.indexOf(base.slice(-4)) + 4),
      //       optional,
      //     ),
      //   },
      // }),
    );
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const json = await res.json();
  return json;
};
