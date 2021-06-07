const express = require ("express");
const app = express();
const path = require ("path");
const PUERTO = 3000;

let usuarios = [
    {
      usuario : "jose",
      contraseña : "1234",
    },
    {
      usuario : "juana",
      contraseña : "2222",  
    },
    {
      usuario : "lola",
      contraseña : "3333",
    },
];

//Middleware pone datos de un form post en req.body
app.use(express.urlencoded({extended: true}));

//Middleware busca archivos estaticos imagenes,css,etc
app.use(express.static(__dirname + "/cliente" ));

//GET inicial retorna a la pagina de login
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "cliente/login.html"));
});

//POST cuando realiza el submit
app.post("/login", function  (req, res){
    const userIngresado = req.body.usuario;
    const passIngresado = req.body.contraseña;
    let validado = false;

//Recorre el array de usuarios y si encuentra que ya esta registrado, cambia el valor de validado a true    
    for (let i=0; i< usuarios.length; i++){
        if(userIngresado === usuarios[i].usuario && passIngresado === usuarios[i].contraseña ){
        validado = true;
    }
 }

 if(validado){
     res.sendFile(path.join(__dirname, "cliente/bienvenido.html"));
 } else{
     res.sendFile(path.join(__dirname, "cliente/login.html")); //si no coincide lo redirige a login
 }
});

//Redirige al formulario de Registro
app.get("/registro", function (req, res){
    res.sendFile(path.join(__dirname, "cliente/registro.html"));
});

//POST de submit de registro
app.post("/registro", function (req, res){
    const usuario = req.body.usuarioNuevo;
    const contraseña = req.body.contraseñaNueva;
    const repetirCont= req.body.repetirContraseña;
    let usuarioRegistrado = false;
    
    for (let i=0; i< usuarios.length; i++){
        if(usuario === usuarios[i].usuarioNuevo || contraseña !== repetirCont){
            usuarioRegistrado = true;
        }
    }

    if(usuarioRegistrado){
        res.sendFile(path.join(__dirname, "cliente/registro.html"));
    } else {
        usuarios.push({ usuario : usuario, contraseña: contraseña});
        res.sendFile(path.join(__dirname, "cliente/login.html"));
    }
});

//Iniciando Servidor
app.listen(3000, function (){
    console.log(`Iniciando servidor en puerto 3000`);
})