type BaseConfigType = {
  PORT: number;
  HOST: string;
  NODE_ENV: string;
};

export const BaseConfig: BaseConfigType = {
  HOST: process.env.HOST || "localhost",
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV,
};
