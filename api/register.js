import mysql from 'mysql2/promise';
import { MongoClient } from 'mongodb';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.REDIS_BASE_URL,
    token: process.env.REDIS_TOKEN,
});

export const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { name, email, password } = JSON.parse(event.body || '{}');
    const cleanName = name?.trim();
    const cleanEmail = email?.trim();
    const cleanPassword = password?.trim();

    const caCert = `-----BEGIN CERTIFICATE-----
MIIERDCCAqygAwIBAgIUJ9ZuUeDFcjijK1wc+NuP3R6MpCAwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNjM0YjQ3ZTAtOWY0ZS00NzhiLTgzMGYtOGEzOGZjMDMx
NjZkIFByb2plY3QgQ0EwHhcNMjYwNDMwMDczNjQ3WhcNMzYwNDI3MDczNjQ3WjA6
MTgwNgYDVQQDDC82MzRiNDdlMC05ZjRlLTQ3OGItODMwZi04YTM4ZmMwMzE2NmQg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAMRCPI4u
e1RH/Dnvf/7j7obbS0XTgb74gqW/4qkIA1LS3CzUtbLHx9WPoHckV8uLyD/PxXT/
6dB7xoDSAFn1/pY4t4Aam+eYo4ScjdXRd4znBECHoE1xRcvQk1Z0sNqmTxxwINhB
nm3I1q+dOC6LEqDUkiFQZISTAgzn3q5m0H68vofbgvr+zWOSA15u4UEuepbWCSoy
BsCQfYtWvTJjldkhWMvT0/1Nnr2lAy20agcgfU83T/4hrlvounbhqra1MfdE7jSc
avTJRCu9zDMt+4htJsZFpRHn2tcIXnxDViOEATYWNR8zor3J7zGC3FONEOhQAmFH
yceFXMbds4oCDP/pMOtUUDc3iRf5FxnFGZCXNG+JmgxJN4p3t6tCd6Czi5qteL8G
V/MiSloBqpID1yvr0RwnHsPU/IuoFTU3EXnzaVMc9i1l/mGKdl5ftfQgzRjCm7H6
gtbtJ07vGNG2HfhGHySFtw4IywdEXYk8t/pBTZkH2rqobRKIEBA9COVXlQIDAQAB
o0IwQDAdBgNVHQ4EFgQU3wnmQKl3JQgNE2boeJtAQCFIKlkwEgYDVR0TAQH/BAgw
BgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKg9uAzI5yQg
C1C1Pq7h2w4z7f9rHRpafCv2v01phzre22QdqvntN5ZQUihmttTeaAuCUacyMssk
Qa+FvaGdjET4dllExT4P1UxUmEB+pXQ3hVuPQAcGp2WWDLMZ5rG1Puw8/jghPxhZ
mUa5441Od/C/MtqxaYrY/zEfcGb18FNXaQTqk0d5yH8N0qNj4+onPNSDXDswi8sS
ISZmHbQlvi5p6paiu9zuOnBvOHyKFpzvpWdgZagJvfLwBpd5fmLnTij7RDjegP2X
qC23aexYyzDSd7dYjim/TGSwMSsmEbq5iJ8uG6rT3N8cNxJRiNS8FkKHm+xBqUof
LHp482IzRMTDQWbilrnkS1OrN7PvkTSU9o8FYWGU91FTovuJmigOSSVJR3KXC8kI
r2+HDsBFaQzDocB6NRGI8+oiRYgvkiMQbs91pyGfezIB3rogek9OXkwrsdZgcC+X
V16VlVAdPHcsPW8Tk/vNdzk0KyIB9WsAtz2pLIkc8rXavkqYY/Az6g==
-----END CERTIFICATE-----`;

    let mysqlConn;
    let mongoClient;

    try {
        mysqlConn = await mysql.createConnection({
            host: process.env.SQL_HOST,
            user: process.env.SQL_USER,
            password: process.env.SQL_PASS,
            database: process.env.SQL_DB,
            port: parseInt(process.env.SQL_PORT),
            ssl: { ca: caCert }
        });

        const [existing] = await mysqlConn.execute('SELECT id FROM users WHERE email = ?', [cleanEmail]);
        if (existing.length > 0) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Email already registered' })
            };
        }

        const [result] = await mysqlConn.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [cleanName, cleanEmail, cleanPassword]
        );
        const userId = result.insertId;

        mongoClient = new MongoClient(process.env.MONGO_URI);
        await mongoClient.connect();
        const db = mongoClient.db();
        await db.collection('profiles').insertOne({
            user_id: userId,
            name: cleanName,
            email: cleanEmail,
            dob: '',
            age: '',
            contact: ''
        });

        await redis.set(`session:${userId}`, JSON.stringify({ name: cleanName, email: cleanEmail }));

        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                message: 'Registration successful!',
                user_id: userId,
                name: cleanName
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Registration failed' })
        };
    } finally {
        if (mysqlConn) await mysqlConn.end();
        if (mongoClient) await mongoClient.close();
    }
};
