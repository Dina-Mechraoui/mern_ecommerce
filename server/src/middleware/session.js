import session from "express-session";
import MongoStore from 'connect-mongo';

const sessionMiddleware = session({
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collectionName: "sessions", 
        ttl: 14 * 24 * 60 * 60, 
        debug: true,
    }),
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure:true, 
        httpOnly: true,
        sameSite: 'none',
        maxAge: 14 * 24 * 60 * 60 * 1000,
    }
});

export default sessionMiddleware;
