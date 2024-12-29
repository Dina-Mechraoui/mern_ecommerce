import session from "express-session";
import MongoStore from 'connect-mongo';

const sessionMiddleware = session({
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,  // Ensure the MongoDB URL is correct
        collectionName: "sessions",         // Session data will be saved in this collection
        ttl: 14 * 24 * 60 * 60,             // Session expiration time (14 days)
    }),
    secret: process.env.SESSION_SECRET,      // Make sure you have a secret key in your .env
    resave: false,                          // Do not resave the session if it was not modified
    saveUninitialized: false,               // Do not save a session if it's not modified
    cookie: {
        secure: process.env.NODE_ENV === "production",  // Use secure cookies only in production
        httpOnly: true,                                  // Make the cookie accessible only by the server
        maxAge: 14 * 24 * 60 * 60 * 1000,                  // Cookie expiration (14 days)
    }
});

export default sessionMiddleware;
