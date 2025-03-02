export interface EnvironmentVariables  {
    JWT_PRIVATE_SECRET: string;
    JWT_PUBLIC_SECRET: string;
    JWT_EXPIRATION: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD_USER: string;   
    APP_DOMAIN: string;
    DATABASE_URL: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    CORS_ORIGIN: string;
    SERVER_PORT: number;
    SWAGGER_PATH: string;
    SWAGGER_ENABLED: boolean;
}