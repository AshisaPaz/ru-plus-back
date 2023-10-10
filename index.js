require('dotenv').config();
const app = require('./app');


app.listen(3002, () => {
    console.log("rodando na porta 3002");
});