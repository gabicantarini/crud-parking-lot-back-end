import { openDatabase } from "../database.js";

export const activityCheckin = async (request, response) => {
    const { label } = request.body; /*manda a placa do carro no checkin*/

    const db = await openDatabase();
    /*verifica se a placa existe*/
    const vehicle = await db.get(`
        SELECT * FROM vehicles WHERE label = ?
        `, [label]);

    if (vehicle) { /*se existir o vehicle*/
        const checkinAt = (new Date()).getTime(); /*variavel*//*pega a data atual*/
        /*insere na tabela de atividade*/
        const data = await db.run(` 
        INSERT INTO activities (vehicle_id, checkin_at) 
        VALUES (?, ?)
        `, [vehicle.id, checkinAt]);
        /*fecha atividade*/
        db.close();  
        /*responde pra api*/
        response.send({
            vehicle_id: vehicle.id,
            checkin_at: checkinAt,
            message: 'Veículo [§{vehicle.label}] Entrou no estacionamento',
            
        });
        return;
    }
    db.close(); /* se não tiver o veídulo, ele vai fechar e dizer que não foi cadastrado*/
    response.send({
        message: 'Veículo [§{label}] não cadastrado' 
        
    });
};

export const activityCheckout = async (request, response) => {
    const { label, price } = request.body; /*manda a placa do carro no checkin*/
    const db = await openDatabase();
    /*verifica se a placa existe*/

    const vehicle = await db.get(`
        SELECT * 
            FROM vehicles 
           WHERE label = ?
        `, [label]);

    if (vehicle) { /*se existir o vehicle cadastrado*/
        /*variavel*//*pega a data atual e executa*/
        const activityOpen = await db.get(`
            SELECT * 
                FROM activities 
               WHERE vehicle_id = ?
                 AND checkout_at IS NULL
        `, [vehicle.id]);
        
        if (activityOpen) { /*se tiver atividade*/
            const checkoutAt = (new Date()).getTime(); 
            /*executa a atividade*/
            const data = await db.run(` 
                UPDATE activities 
                    SET checkout_at = ?,
                        price = ?
                 WHERE id = ?
            `, [checkoutAt, price, activityOpen.id]);
            /*fecha atividade*/
            db.close();  
            /*responde pra api*/
            response.send({
                vehicle_id: vehicle.id,
                checkin_at: checkoutAt,
                price: price,
                message: 'Veículo [§{vehicle.label}] saiu do estacionamento',
            
            });
            return;
        }
        /* se não tiver o veículo, ele vai fechar e dizer que não foi cadastrado*/
        db.close();
        response.status(400).send({
            message: `Veículo [${label}] não realizou nenhum check-in`
        });
        return;
    }

    db.close(); /* se não tiver o veículo, ele vai fechar e dizer que não foi cadastrado*/
    response.status(400).send({
        message: 'Veículo [§{label}] não cadastrado' 
        
    });
}

export const removeActivity = async (request, response) => {
    const { id } = request.params;
    const db = await openDatabase();
    const data = await db.run(` 
         DELETE FROM activities
         WHERE id = ?
     `, [id]);
    db.close();
    response.send({
        id,
        message: 'Atividade [§{id}] removida com sucesso' 
        
    });
};

export const listActivities = async (request, response) => {
    const db = await openDatabase();
       const activities = await db.all(` 
        SELECT * FROM activities
    `);
   db.close(); // para fechar o banco de dados quando pararmos de executar
   response.send(activities);
};