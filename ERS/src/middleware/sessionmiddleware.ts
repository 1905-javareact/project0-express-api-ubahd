import session from 'express-session'

const sess =  {
    secret: 'lego',
    //24hr session 
    cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
    resave: false,
    saveUninitialized: false
    
}

export const sessionmiddleware = session(sess)