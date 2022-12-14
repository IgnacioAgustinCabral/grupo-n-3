const app = require("./app");
const db = require("./database/models");
require("dotenv").config();

const port = process.env.PORT || 3000;

db.sequelize.authenticate().then(() => {
    console.log("Successful database connection");

    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Servidor funcionando en el puerto ${port}`);
    });
}).catch(error => {
    console.log('Error in connection to database', error);
})