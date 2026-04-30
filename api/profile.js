import { MongoClient } from 'mongodb';

export const handler = async (event, context) => {
    const user_id = event.httpMethod === 'GET' 
        ? event.queryStringParameters.user_id 
        : JSON.parse(event.body || '{}').user_id;

    if (!user_id) {
        return { statusCode: 400, body: JSON.stringify({ status: 'error', message: 'User ID is required' }) };
    }

    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('profiles');

        if (event.httpMethod === 'GET') {
            const profile = await collection.findOne({ user_id: parseInt(user_id) });
            return { statusCode: 200, body: JSON.stringify({ status: 'success', data: profile }) };
        } 
        
        if (event.httpMethod === 'POST') {
            const { dob, age, contact } = JSON.parse(event.body || '{}');
            await collection.updateOne(
                { user_id: parseInt(user_id) },
                { $set: { dob, age, contact } },
                { upsert: true }
            );
            return { statusCode: 200, body: JSON.stringify({ status: 'success', message: 'Profile updated' }) };
        }

        return { statusCode: 405, body: 'Method Not Allowed' };

    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ status: 'error', message: 'Internal server error' }) };
    } finally {
        await client.close();
    }
};
