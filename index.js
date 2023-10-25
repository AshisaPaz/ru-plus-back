require('dotenv').config();
const app = require('./app');


app.listen(3001, () => {
    console.log("rodando na porta 3001");
});