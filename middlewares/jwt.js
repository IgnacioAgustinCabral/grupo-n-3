const jwt = require("jsonwebtoken");
require('dotenv').config()

const decode = (req, _, next) => {
    const token = req.headers["authorization"];

    req.body.decodedToken = jwt.decode(token, { complete: true });

    next();
};


const encode = (payload) => {

    const privateKey = process.env.JWT_SECRET || 'default_jwtsecret'

    const signOptions = {
        algorithm: 'HS512',
        expiresIn: '7d',
    }

    return jwt.sign(payload, privateKey, signOptions)
}

const verify = (token) => {

    const privateKey = process.env.JWT_SECRET || 'default_jwtsecret'

    return jwt.verify(token, privateKey)
}

const getTokenFromRequest = (request) => {
    const authorization = request.headers["authorization"]
    const token = authorization ? authorization.substring(7) : null
    return token
}

const isUserAuthenticated = (req, res, next) => {
    const token = getTokenFromRequest(req)

    try {
        const user = verify(token)
        if (user.id && user.roleId <= 2) {
            req.user = user
            return next();
        }

        res.status(403).json({ error: "Unauthorized" });
    } catch (e) {
        res.status(403).json({ error: "Token expired or invalid" });
    }
};

const isAdmin = (req, res, next) => {
    const token = req.headers["authorization"];

    try {
        const user = encode(token)

        if (user.roleId === 1) return next();

        res.status(401).json({ error: "Unauthorized" });

    } catch (e) {

        res.status(401).json({ error: "Token expired" });
    }
};

module.exports = {
    verify,
    decode,
    encode,
    isUserAuthenticated,
    isAdmin,
    getTokenFromRequest
};