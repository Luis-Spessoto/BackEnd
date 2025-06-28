const mongoose = require('./config/bancoDados');
const bcrypt = require('bcryptjs');
const mongooseLib = require('mongoose');

const userSchema = new mongooseLib.Schema({
    usuario: String,
    senha: String
});
const User = mongooseLib.model('User', userSchema);

(async () => {
    const senhaCriptografada = await bcrypt.hash('123', 10);
    const novoUsuario = new User({ usuario: 'admin', senha: senhaCriptografada });

    await novoUsuario.save();
    console.log(`Usuário criado com sucesso.`);
    mongoose.disconnect();
})();


//se quiser alterar a senha e username do usuario, fique a vontade em apenas alterar os valores passados