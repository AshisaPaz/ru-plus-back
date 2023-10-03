import {router} from './route.js';
import express from 'express';
const app = express();

app.use(express.json());
app.use(router);


app.listen(3001, () => {
    console.log("rodando na porta 3001");
});