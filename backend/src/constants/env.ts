const getEnv = (key: string) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
}

export const MONGO_URI = getEnv('MONGO_URI');
export const PORT = getEnv('PORT');