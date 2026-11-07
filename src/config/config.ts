interface IConfig {
  appMode: "DEV" | "STAGING" | "PROD"
  serverUrl: string;
}

const config: IConfig = {
  appMode: import.meta.env.VITE_APP_MODE,
  serverUrl: import.meta.env[`VITE_${import.meta.env.VITE_APP_MODE}_SERVER_URL`]
}

console.log('config =', config);
console.log('import.meta.env =', import.meta.env);

export default config

