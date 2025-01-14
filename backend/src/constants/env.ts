const getEnv = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}

export const MONGO_URI = getEnv('MONGO_URI');
export const PORT = getEnv('PORT');
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_REFRESH_SECRET = getEnv('JWT_REFRESH_SECRET');