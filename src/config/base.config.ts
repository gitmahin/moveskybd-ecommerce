type BaseConfigType = {
  PORT: number;
  HOST: string;
  APP_URL: string
  NODE_ENV: string;
};

export const BaseConfig: BaseConfigType = {
  HOST: process.env.HOST || "localhost",
  PORT: Number(process.env.PORT) || 3000,
  APP_URL: process.env.APP_URL || "http://localhost:3001",
  NODE_ENV: process.env.NODE_ENV,
};
