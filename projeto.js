const { MongoClient } = require("mongodb"); //para conectar ao bando de dados mongo db

const url = "mongodb://localhost:27017";

const dbName = "AgendaEletronica";


async function connect() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return { db, client };
}

async function run() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Conectado com sucesso ao MongoDB!");

        const db = client.db(dbName);

        // Teste: listar collections
        const collections = await db.listCollections().toArray();
        console.log("Collections disponíveis no MongoDB:", collections.map(c => c.name));
    } catch (err) {
        console.error("Erro ao conectar ao MongoDB:", err);
    } finally {
        await client.close();
    }
}

run();

module.exports = { connect };