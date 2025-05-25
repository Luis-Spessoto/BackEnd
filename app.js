const Evento = require("./evento");
const Usuario = require("./Usuario");
const Tag = require("./Tag");
const logger = require("./logger");

//teste de inserção
async function testarInsercaoEvento() {
    const evento = new Evento("Palestra", "Palestra sobre software em Londrina", "24/05/2025", "14:30");
    await evento.inserir();
}
async function testarInsercaoUsuario() {
    const usuario = new Usuario("Jonas", "jonas@gmail.com", "01/01/1998");
    await usuario.inserir();
}
async function testarInsercaoTag() {
    const tag = new Tag("Educação", "Educação - refere-re aos eventos que sejam correlacionados com algo de educação (palestras, seminários, aulas, etc)");
    await tag.inserir();
}


//testarInsercaoEvento();
//testarInsercaoUsuario();
//testarInsercaoTag();


//teste de atualização
async function atualizarEvento() {
    const filtro = { nome: "Palestra" };
    const novosDados = {
        horario: "14:31"
    };

    await Evento.atualizar(filtro, novosDados);
}

async function atualizarUsuario() {
    const filtro = { nome: "Luis" };
    const novosDados = {
        email: "p@email.com",
        anoNascimento: "19/09/89"
    };

    await Usuario.atualizar(filtro, novosDados);
}

async function atualizarTags() {
    const filtro = { nome: "Festa" };
    const novosDados = {
        descricao: "Tag Atualizada",
    };

    await Tag.atualizar(filtro, novosDados);
}


//atualizarEvento();
//atualizarUsuario();
//atualizarTags();

//teste de busca
async function testarBuscaTodosEventos() {
    await Evento.buscar();  // Sem filtro, traz todos os eventos
}

async function testarBuscaTodosUsuarios() {
    await Usuario.buscar();  
}

async function testarBuscaTodosTags() {
    await Tag.buscar();  
}

//testarBuscaTodosEventos();
//testarBuscaTodosUsuarios();
//testarBuscaTodosTags();

//teste de deleção
async function testarDelecaoEvento() {
    const filtro = { nome: "Palestra" };  

    await Evento.deletar(filtro);
}
async function testarDelecaoUser() {
    const filtro = { nome: "Jonas" };  

    await Usuario.deletar(filtro);
}
async function testarDelecaoTag() {
    const filtro = { nome: "Festa" };  

    await Tag.deletar(filtro);
}

//testarDelecaoEvento();
//testarDelecaoUser();
//testarDelecaoTag();

