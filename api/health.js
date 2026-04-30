export const handler = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ 
            mysql: !!process.env.SQL_HOST, 
            mongo: !!process.env.MONGO_URI, 
            redis: !!process.env.REDIS_BASE_URL,
            host: process.env.SQL_HOST || 'MISSING',
            database: process.env.SQL_DB || 'MISSING'
        })
    };
};
