import { Container } from '@cloudflare/containers';

export class ApiContainer extends Container {
  defaultPort = 3001;
  sleepAfter = '10m';
}

export interface Env {
  API_CONTAINER: DurableObjectNamespace<ApiContainer>;
  DATABASE_URL: string;
  DIRECT_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN?: string;
  CORS_ORIGIN: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const container = env.API_CONTAINER.getByName('primary-api');

    await container.startAndWaitForPorts({
      startOptions: {
        envVars: {
          NODE_ENV: 'production',
          PORT: '3001',
          DATABASE_URL: env.DATABASE_URL,
          DIRECT_URL: env.DIRECT_URL,
          JWT_SECRET: env.JWT_SECRET,
          JWT_EXPIRES_IN: env.JWT_EXPIRES_IN ?? '1d',
          CORS_ORIGIN: env.CORS_ORIGIN,
        },
      },
    });

    return container.fetch(request);
  },
};
