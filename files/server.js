const express = require("express");
const app = express();
const Contenedor = require("./contenedor");
const objetos = require("./mocks");

//Instancio la clase
let container = new Contenedor("productos.txt");

//Creo la función que agrega los objetos
async function addItems() {
  await container.save(objetos[0]);
  await container.save(objetos[1]);
  await container.save(objetos[2]);
  await container.save(objetos[3]);
  await container.save(objetos[4]);
}

//Creo función para traer todos los items
async function readContainer() {
  const items = await container.getAll();
  return items;
}

//Creo función para traer un item random
async function generateRandomItem() {
  const items = await container.getAll();
  const randomItem = await container.getById(
    Math.floor(Math.random() * items.length + 1)
  );
  return randomItem;
}

//Creo la función que inicializar el servidor

const createServer = () => {
  PORT = 8080;
  const server = app.listen(PORT, () => {
    console.log("Server corriendo en el puerto", PORT);
  });
  
  //Generar rutas
  
  //Ruta productos
  app.get("/productos", async (req, res) => {
    const items = await readContainer()
    res.send(items);
  });
};
//Ruta producto random
app.get("/productosRandom", async (req, res) => {
  const item = await generateRandomItem()
  res.send(item);
});

async function mainFunciton() {
  await addItems();
  createServer();
}

mainFunciton();
