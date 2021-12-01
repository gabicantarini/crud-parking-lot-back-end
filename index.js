import express from 'express';
import { activityCheckin, 
         activityCheckout,
         removeActivity,
         listActivities } from './controllers/activitiesController.js';
import { insertVehicles, 
         listVehicles, 
         removeVehicle, 
         updateVehicles } from './controllers/vehiclesController.js';


const app = express();

app.use(express.json());

app.get('/api/ping', (request, response) => {
    response.send({
        message: 'pong'
    });
});


/*Endpoints Vehicles*/
//função para buscar informações no banco de dados
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