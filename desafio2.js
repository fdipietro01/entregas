const fs = require("fs");
class Contenedor {
  constructor(path) {
    this.path = path;
    this.cont = 0;
  }

  save(object) {
    this.cont++;
    let id;

    let agregarItem = async (item) => {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(item));
        return "ok"
      } catch (error) {
        ("Error de escritura");
      }
    };

    if (this.cont === 1) {
      let item = [{...object, id: 1}];
      id = item[0].id
      agregarItem(item);
      return id
    } else {
      (async () => {
        try {
          const items = await this.getAll();
          /* console.log("previos", items); */
          id = items[items.length - 1].id + 1;
          items.push({...object, id: id});
          /* console.log("despues", items); */
          await agregarItem(items);
          return id
        } catch (error) {
          console.log("Error de escritura - método save", error);
        }
      })();
    }
   
  }

  async getById(id) {
    try {
      const content = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      const object = content.filter((obj) => obj.id === id);
      object !== [] ? object[0] : null;
      return object;
    } catch (error) {
      console.log("Error de búsqueda por Id - método getById", error);
    }
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      console.log("Error de búsqueda total - método getAll");
      return []
    }
  }

  async deleteById(id) {
    try {
      const content = await JSON.parse(fs.promises.readFile(this.path));
      const object = content.filter((obj) => obj.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(object));
    } catch (error) {
      console.log("Error de supreción por Id - método deleteById");
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "");
    } catch (error) {
      console.log("Error de supreción total - método deleteAll");
    }
  }
}

const objects = [
  {
    title: "nombre1",
    price: 100,
    thumbnail: "imagen1",
  },

  {
    title: "nombre2",
    price: 200,
    thumbnail: "imagen2",
  },
  {
    title: "nombre3",
    price: 300,
    thumbnail: "imagen3",
  },
];

let container = new Contenedor("productos.txt");
const agregarItems = () => {
  let obj = 0;
  const id = setInterval(() => {
    console.log(container.save(objects[obj]));
    obj++;
  }, 1000);
  setTimeout(() => {
    clearInterval(id);
  }, 3500);
};

const agregarObjetos = async()=>{
  await container.save(objects[0]);
  await container.save(objects[1]);
  await container.save(objects[2]);
}

const buscar = async () => {
  let elementoBuscado = await container.getById(1);
  console.log(elementoBuscado, "el buscado");
};

agregarItems();
buscar();
/* agregarObjetos() */

