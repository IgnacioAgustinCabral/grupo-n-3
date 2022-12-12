const { getTokenFromRequest, verify } = require("./jwt")

const verifyIfOwnerOrAdmin = (req, res, next) => {
    const token = getTokenFromRequest(req)
    const userId = parseInt(req.params.id)
    try {
        const userAuthenticated = verify(token)

        const isOwner = userId === userAuthenticated.id;
        const isAdmin = userAuthenticated.roleId === 1;
        if (isOwner || isAdmin) {
            req.user = userAuthenticated
            return next();
        }

        res.status(403).json({ error: "Unauthorized" });
    } catch (e) {
        res.status(403).json({ error: "Token expired or invalid" });
    }
}

module.exports = {
    verifyIfOwnerOrAdmin
}