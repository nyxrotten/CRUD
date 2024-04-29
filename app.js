const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let luchadores = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get("/", (req, res) => {
    res.send(
        `<h1>Street Fighter</h1>
            <ul>
            ${luchadores.map((luchador) => `<li>${luchador.nombre}</li>`).join("")}
            </ul>
            <form action="/luchadores" method="post">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>
            <button type="submit">Agregar luchador</button>
            </form>
            <a href="/luchadores">Luchadores</a>`)
});

app.post("/luchadores", (req, res) => {
    const nuevoluchador = {
        id: luchadores.length + 1,
        nombre: req.body.nombre
    };
    luchadores.push(nuevoluchador);
    res.redirect("/");
})

app.get("/luchadores", (req, res) => {
    res.json(luchadores);
})

app.get("/:nombre", (req, res) => {
    const luchadorName = req.params.nombre;
    const luchador = luchadores.find((luchador) => luchador.nombre.toLocaleLowerCase() === luchadorName);

    if(!luchador) {
        return res.status(404).send(`<h1>Luchador no encontrado</h1>`);
    }

    res.json(luchador)
})

app.listen(3000, () => {
    console.log("Express está escuchando en el puerto 3000")
});