const fs = require("fs");
class Contenedor {
  constructor(path) {
    this.path = path;
    this.cont = 0;
  }

  async save(object) {
    this.cont++;
    let id;

    let agregarItem = async (item) => {
      try {
        await fs.promises.writeFile(this.path, JSON.stringify(item));
        return "ok";
      } catch (error) {
        ("Error de escritura");
      }
    };

    if (this.cont === 1) {
      let item = [{ ...object, id: 1 }];
      id = item[0].id;
      await agregarItem(item);
    } else {
      try {
        const items = await this.getAll();
        id = items[items.length - 1].id + 1;
        items.push({ ...object, id: id });
        await agregarItem(items);
        return id;
      } catch (error) {
        console.log("Error de escritura - método save", error);
      }
    }
    return id;
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
      const content = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      return (content);
    } catch (error) {
      console.log("Error de lectura", error);
      return [];
    }
  }

  async deleteById(id) {
    try {
      const content = JSON.parse(await fs.promises.readFile(this.path));
      const object = content.filter((obj) => obj.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(object));
    } catch (error) {
      console.log("Error de supreción por Id - método deleteById");
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile(this.path, "[]");
    } catch (error) {
      console.log("Error de supreción total - método deleteAll");
    }
  }
}

module.exports = Contenedor

/* let container = new Contenedor("productos.txt");

Función que:
 -agrega 5 objetos al archivo en forma de lista y consologuea el id que retorna cada operación.
 -busca un elemento de la lista del archivo por id y lo consologuea
 -busca un elemento de la lista del archivo por id y lo elimina
 -elimina todo el contenido del archivo


 async function Secuencia() {
  const object1 = await container.save(objects[0]);
  console.log("id", object1);
  const object2 = await container.save(objects[1]);
  console.log("id", object2);
  const object3 = await container.save(objects[2]);
  console.log("id", object3);
  const object4 = await container.save(objects[3]);
  console.log("id", object4);
  const object5 = await container.save(objects[4]);
  console.log("id", object5);

  let elementoBuscado = await container.getById(3);
  console.log("El buscado:", elementoBuscado);

  await container.deleteById(3);
  const afterDeleteById = await container.getAll();
  console.log("Despues de eliminar por id quedó así:", afterDeleteById);

  await container.deleteAll();
  const afterDeleteAll= await container.getAll();
  console.log("Despues de eliminar todo quedó así:", afterDeleteAll)
}

Secuencia() */