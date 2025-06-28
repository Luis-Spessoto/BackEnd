const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvcLogin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB conectado.");
}).catch(err => {
    console.error("Erro ao conectar:", err);
});

module.exports = mongoose;
