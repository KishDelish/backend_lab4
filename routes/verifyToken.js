import jwt from "jsonwebtoken"


export default function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json('Access Denied');
    }

    try {
        console.log(token);
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        console.log(verified);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json('Invalid Token');
    }
}