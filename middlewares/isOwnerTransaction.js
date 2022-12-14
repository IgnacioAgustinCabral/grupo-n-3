const { findOneTransaction } = require("../services/transactionServices");
const { httpUnauthorizedError } = require("./isAdminRole");

const isOwnerTransaction = async (req, res, next) => {
    try {
        const tansactionIdParams = parseInt(req.params.id)

        const userAuthenticated = req.user
        const transaction = await findOneTransaction(tansactionIdParams)

        const isOwner = userAuthenticated.id === transaction.userId;
        const isAdmin = userAuthenticated.roleId === 1;
        if (isOwner || isAdmin) {
            return next();
        }

        next(httpUnauthorizedError)
    } catch (e) {
        next(httpUnauthorizedError)
    }
}

module.exports = {
    isOwnerTransaction
}