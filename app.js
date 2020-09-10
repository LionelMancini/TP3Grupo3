const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const uri = "mongodb+srv://admin:1234@cluster0.jxxjh.mongodb.net/pwitt?retryWrites=true&w=majority";
async function conectar() {
    try{
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Conectado a la base de datos metodo: mongoodb - async-await");
    }
    catch(e){
        console.log(e);
    }
};
conectar();

// Paso 1 Definir esquema/s
const BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    gender: String,
    id: String,
    lended: String

});

// Paso 2 Armo el modelo
const BookModel = mongoose.model("books", BookSchema);

app.post("/book", async (req, res)=>{
    try {
        // verificacion de la info que recibo;
        let name = req.body.name;
        let author = req.body.author;
        let gender = req.body.gender;
        let id = req.body.id;
        let lended = req.body.lended;

        if(name == undefined){
            throw new Error("No enviaste nombre");
        }
        if(author == undefined){
            throw new Error("No enviaste autor");
        }
        if( gender == undefined){
            throw new Error("No enviaste genero");
        }
        if(id == undefined){
            throw new Error("No enviaste id");
        }
        if(lended == undefined){
            throw new Error("No enviaste cuit");
        }
        if(name == ''){
            throw new Error("El nombre no puede estar vacio");
        }
        if(author == ''){
            throw new Error("El autor no puede estar vacio");
        }
        if(gender == '' ){
            throw new Error("El  genero no puede estar vacio");
        }
        if(id == ''){
            throw new Error("El id no puede estar vacio");
        }
        if(lended == ''){
            throw new Error("El prestamo no puede estar vacio");
        }

        let book = {
        name:  name,
        author: author,
        gender: gender,
        id: id,
        lended: lended
        }

        let BookSave = await BookModel.create(book);
        
        console.log(BookSave);
        res.status(200).send(BookSave);
    }
     catch(e){
        console.log(e);
        res.status(422).send(e);
    }
}

app.listen(3000, ()=>{
    console.log("Servidor escuchando en el puerto 3000");
}))