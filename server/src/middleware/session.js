import session from "express-session";
import MongoStore from 'connect-mongo';

const sessionMiddleware = session({
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collectionName: "sessions", 
        ttl: 14 * 24 * 60 * 60, 
    }),
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production" ? true :false, 
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
    }
});

export default sessionMiddleware;
