import session from "express-session";
import MongoStore from 'connect-mongo'


const sessionMiddleware = session({
    store : MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collectionName: "sessions",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
})

export default sessionMiddleware