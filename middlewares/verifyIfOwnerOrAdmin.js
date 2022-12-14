const { httpUnauthorizedError } = require("./isAdminRole")
const { getTokenFromRequest, verify } = require("./jwt")

const verifyIfOwnerOrAdmin = (req, res, next) => {
    const token = getTokenFromRequest(req)

    try {
        const userIdParams = parseInt(req.params.id)

        const userAuthenticated = verify(token)

        const isOwner = userIdParams === userAuthenticated.id;
        const isAdmin = userAuthenticated.roleId === 1;
        if (isOwner || isAdmin) {
            req.user = userAuthenticated
            return next();
        }

        next(httpUnauthorizedError)
    } catch (e) {
        next(httpUnauthorizedError)
    }
}

module.exports = {
    verifyIfOwnerOrAdmin
}