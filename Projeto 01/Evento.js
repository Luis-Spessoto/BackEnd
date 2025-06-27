const { connect } = require("./projeto");
const logger = require("./logger")

class Evento {
    constructor(nome, descricao, data, horario) {
        this.nome = nome;
        this.descricao = descricao;
        this.data = data;
        this.horario = horario;
    }
    //Inserir
    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("Evento").insertOne({
                nome: this.nome,
                descricao: this.descricao,
                data: this.data,
                horario: this.horario
            });
            console.log("Evento Inserido:", result.insertedId);
            client.close();
        } catch (error) {
            logger.log("Erro ao inserir eventos: " + error);
        }
    }

    //Atualizar
    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("Evento").updateMany(filtro, { $set: novosDados, });
            console.log("Evento atualizados:", result.modifiedCount);
            client.close();
        } catch (error) {
            logger.log("Erro ao atualizar eventos: " + error);
        }
    }

    //buscar
    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const Evento = await
                db.collection("Evento").find(filtro).toArray();
            console.log("Eventos encontrados:", Evento);
            client.close();
        } catch (error) {
            logger.log("Erro ao buscar eventos: " + error);
        }
    }

    //deletar
    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("Evento").deleteMany(filtro);
            console.log("Eventos deletados:", result.deletedCount);
            client.close();
        } catch (error) {
            logger.log("Erro ao deletar eventos: " + error);
        }
    }
}

module.exports = Evento;