const { connect } = require("./projeto");
const logger = require("./logger")

class Tags {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;

    }

    //Inserir
    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("Tags").insertOne({
                nome: this.nome,
                descricao: this.descricao,
            });
            console.log("Tag Inserida:", result.insertedId);
            client.close();
        } catch (error) {
            console.log("Erro ao inserir a Tag:", error);
        }
    }

    //Atualizar
    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("Tags").updateMany(filtro, { $set: novosDados, });
            console.log("Tags atualizadas:", result.modifiedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao atualizar tags: " + error);
        }
    }

    //buscar
    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const Tags = await
                db.collection("Tags").find(filtro).toArray();
            console.log("Tags encontradas:", Tags);
            client.close();
        } catch (error) {
            logger.log("Erro ao buscar tags: " + error);
        }
    }

    //deletar
    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("Tags").deleteMany(filtro);
            console.log("Tags deletadas:", result.deletedCount);
            client.close();
        } catch (error) {
            Logger.log("Erro ao deletar tags: " + error);
        }
    }
}
module.exports = Tags;
