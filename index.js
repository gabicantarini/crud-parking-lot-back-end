import express from 'express';
import { openDatabase } from './database.js';

const app = express();

app.use(express.json());

app.get('/api/ping', (request, response) => {
    response.send({
        message: 'pong'
    });
});


/*Endpoints Vehicles*/
//função para buscar informações no banco de dados
app.get('/api/vehicles', async (request, response) => {
     //select para puxar informações do banco de dados
     const db = await openDatabase();
     /*usamos a crase para pular linha*/
     const vehicles = await db.all(` 
         SELECT * FROM vehicles
     `);
    db.close(); // para fechar o banco de dados quando pararmos de executar
    response.send(vehicles);
});

app.post('/api/vehicles', async (request, response) => {
    const { model, label, type, owner, description } = request.body;
    const db = await openDatabase();
    const data = await db.run(` 
         INSERT INTO vehicles (model, label, type, owner, description)
         VALUES (?, ?, ?, ?, ?)
     `, [model, label, type, owner, description]);
    db.close();
    response.send({
        id: data.lastID,
        model, 
        label, 
        type, 
        owner,
        description
    });
});

//para atualizações
app.put('/api/vehicles/:id', async (request, response) => {
    const { model, label, type, owner, description } = request.body;
    const { id } = request.params;

    const db = await openDatabase();

    const vehicle = await db.get(` 
    SELECT * FROM vehicles WHERE id = ?
    `, [id]);

    if (vehicle) {
        const data = await db.run(` 
        UPDATE vehicles 
            SET model = ?,
                label = ?, 
                type = ?, 
                owner =?, 
                description =?
         WHERE id = ?
        `, [model, label, type, owner, description, id]);

        db.close();
        response.send({
            id: data.lastID,
            model, 
            label, 
            type, 
            owner,
            description
        });
        return;
    }
    
    db.close();
    response.send(vehicle || {});

});

app.delete('/api/vehicles/:id', (request, response) => {

});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...");
});


/* pro js se a variável tem valor é true, se não tem valor, é falso. Neste caso o id tem valor, é true*/
 //   if (id) {
 //       response.send(vehicles.filter(vehicles => vehicles.id == id));
 //       return;

 //   }