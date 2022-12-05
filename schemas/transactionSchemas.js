const idSchema = {
    isInt: true,
    errorMessage: 'Id is wrong, should be number'
}

const postTransactionSchema = {
    userId: {
        ...idSchema
    },
    categoryId: {
        ...idSchema
    },
    amount: {
        isNumeric: true
    },
    date: {
        isISO8601: true
    },
    description: {
        isString: true,
        optional: true
    }
}

module.exports = {
    postTransactionSchema
}