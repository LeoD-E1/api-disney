import jwt from 'jsonwebtoken'

async function authToken(req, res, next) {
    const authHeader = await req.headers.authorization;
    const token = await authHeader && authHeader.split(' ')[1];
    if (token == null) return res.json({
        message: 'You have not the credentials, Login for it'
    }).status(403);
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(404)
        req.user = user
        console.log(user);
        next();
    })
}

export default authToken;