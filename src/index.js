import express from 'express';
import { activityCheckin, 
         activityCheckout,
         removeActivity,
         listActivities } from './controllers/activitiesController.js';
import { insertVehicles, 
         listVehicles, 
         removeVehicle, 
         updateVehicles } from './controllers/vehiclesController.js';
import cors from 'cors';


const app = express();
//const { cors } = pkg;
//teste de função para liberar cors
//const  cors  = require('cors');
app.use(cors({
   origin: "http://127.0.0.1:5500",
}))



//para liberar a API - problema CROS
//app.use((req, res, next) => {
//res.header("Access-Control-Allow-Origin", "*");// qualquer um que tover acesso ao link da api poderá fazer get, put, post ou delete
//    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
//    next();
//})



app.use(express.json());

app.get('/api/ping', (request, response) => {
    response.send({
        message: 'pong'
    });
});


/*Endpoints Vehicles*/
//função para buscar informações no banco de dados dos veiculos
app.get('/api/vehicles', listVehicles);
app.post('/api/vehicles', insertVehicles);
//para atualizações
app.put('/api/vehicles/:id', updateVehicles);
app.delete('/api/vehicles/:id', removeVehicle);


/*Endpoints Activities*/
app.post('/api/activities/checkin', activityCheckin);
app.put('/api/activities/checkout', activityCheckout);
app.delete('/api/activities/:id', removeActivity);
app.get('/api/activities', listActivities);
app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...");
});


/* pro js se a variável tem valor é true, se não tem valor, é falso. Neste caso o id tem valor, é true*/
 //   if (id) {
 //       response.send(vehicles.filter(vehicles => vehicles.id == id));
 //       return;

 //   }
 /* pra rodar a API no postman precisa dar o comando no console npm run dev*/
 /*const = variavel*/

 