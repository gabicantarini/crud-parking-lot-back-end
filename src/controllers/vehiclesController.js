import { openDatabase } from "../database.js";


//função
export const listVehicles = async (request, response) => {
    //select para puxar informações do banco de dados
    const db = await openDatabase();
    /*usamos a crase para pular linha*/
    const vehicles = await db.all(` 
        SELECT * FROM vehicles
    `);
   db.close(); // para fechar o banco de dados quando pararmos de executar
   response.send(vehicles);
};


export const insertVehicles = async (request, response) => {
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
};

export const updateVehicles = async (request, response) => {
    const { model, label, type, owner, description } = request.body;
    const { id } = request.params;

    const db = await openDatabase();

    const vehicle = await db.get(` 
    SELECT * FROM vehicles WHERE id = ?
    `, [id]);

    if (vehicle) { /*se existir o vehicle, ele faz o update com o bd*/
        const data = await db.run(` 
        UPDATE vehicles 
            SET model = ?,
                label = ?, 
                type = ?, 
                owner =?, 
                description =?
         WHERE id = ?
        `, [model, label, type, owner, description, id]);

        db.close(); /*ele fecha a conexão*/
        response.send({ /* e manda a resposta e para a execução*/
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
    response.send(vehicle || {}); /*se não existir o vehicle, ele fecha a conexão e retorna vazio*/

};

export const removeVehicle = async(request, response) => {
    const { id } = request.params;
    const db = await openDatabase();
    const data = await db.run(` 
         DELETE FROM vehicles
         WHERE id = ?
     `, [id]);
    db.close();
    response.send({
        id,
        message: 'Veículo [§{id}] removido com sucesso' 
        
    });
};