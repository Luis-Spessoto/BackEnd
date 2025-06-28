const express = require('express');
const path = require('path');
const http = require('http');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('./config/bancoDados');
const bcrypt = require('bcryptjs');
const exphbs = require('express-handlebars');

const mongooseLib = require('mongoose');
const userSchema = new mongooseLib.Schema({
    usuario: String,
    senha: String
});
const User = mongooseLib.model('User', userSchema);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

function checkLogin(req, res, next) {
    if (req.session.logado) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;

    const user = await User.findOne({ usuario });
    if (user && await bcrypt.compare(senha, user.senha)) {
        req.session.logado = true;
        res.redirect('/');
    } else {
        res.send(`
            <script>
                alert('Usuário e/ou senha inválidos.');
                window.location.href = '/login';
            </script>    
        `);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/', checkLogin, (req, res) => {
    res.render('index');
});

// Iniciar o servidor
http.createServer(app).listen(3000, () => {
    console.log('Servidor Iniciado! Rodando em http://localhost:3000');
});
