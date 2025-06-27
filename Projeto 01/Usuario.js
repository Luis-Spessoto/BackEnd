const { connect } = require("./projeto");
const logger = require("./logger")

class Usuario {
    constructor(nome, email, anoNascimento) {
        this.nome = nome;
        this.email = email;
        this.anoNascimento = anoNascimento;
    }

    //inserir
    async inserir() {
        try {
            const { db, client } = await connect();
            const result = await db.collection("Usuario").insertOne({
                nome: this.nome,
                email: this.email,
                anoNascimento: this.anoNascimento,
            });
            console.log("Usuário Inserido:", result.insertedId);
            client.close();
        } catch (error) {
            logger.log("Erro ao inserir usuarios: " + error);
        }
    }

    //Atualizar
    static async atualizar(filtro, novosDados) {
        try {
            const { db, client } = await connect();
            const result = await db.collection("Usuario").updateMany(filtro, { $set: novosDados, });
            console.log("Usuarios atualizados:", result.modifiedCount);
            client.close();
        } catch (error) {
            logger.log("Erro ao atualizar usuarios: " + error);
        }
    }

    //buscar
    static async buscar(filtro = {}) {
        try {
            const { db, client } = await connect();
            const Usuario = await
                db.collection("Usuario").find(filtro).toArray();
            console.log("Usuarios encontrados:", Usuario);
            client.close();
        } catch (error) {
            logger.log("Erro ao buscar usuarios: " + error);
        }
    }

    //deletar
    static async deletar(filtro) {
        try {
            const { db, client } = await connect();
            const result = await
                db.collection("Usuario").deleteMany(filtro);
            console.log("Usuarios deletados:", result.deletedCount);
            client.close();
        } catch (error) {
            logger.log("Erro ao deletar usuarios: " + error);
        }
    }
}
module.exports = Usuario;
