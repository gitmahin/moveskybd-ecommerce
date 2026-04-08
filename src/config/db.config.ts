type PostgresConfigType = {
  HOST: string;

  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
};

export const DbConfig: PostgresConfigType = {
  HOST: process.env.PG_HOST!,
  PORT: Number(process.env.PG_PORT) || 5432,
  USERNAME: process.env.PG_USERNAME!,
  PASSWORD: process.env.PG_PASSWORD!,
  DATABASE: process.env.PG_DATABASE!,
};

export const DB_CONNECTION_URI = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : `postgresql://${DbConfig.USERNAME}:${DbConfig.PASSWORD}@${DbConfig.HOST}:${DbConfig.PORT}/${DbConfig.DATABASE}`;
