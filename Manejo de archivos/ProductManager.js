const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }







getProductbyId(idProduct){
  return this.product.find((event) => this.product.id === idProduct);
}



  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const Products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(Products); //javascript
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock = new Date()){
    const product = {
        id: this.getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock}; {
    try {
      const Products = await this.getProduct();
      Products.push(product);
      await fs.promises.appendFile(this.path, JSON.stringify(Products));
    } catch (error) {
      console.log(error);
    }
  }
}


getMaxId() {
  let maxId = 0;
  this.product && this.product.map((event) => { 
    if (event.id > maxId) maxId = event.id;
    });
    return maxId;
}

  // updateProduct


  // deleteProduct
  async deleteFile(){
    try {
        await fs.promises.unlink(this.path);
        console.log('archivo eliminado');
    } catch (error) {
        console.log(error);
    }
  }
}

const manager = new ProductManager("./users.json");

const product1 = {
  title: "Titulo",
  description: "Description",
  price: 12,
  thumbnail: "sin imagen",
  code: "001",
  stock: 50,
};

const product2 = {
  title: "Titulo2",
  description: "Description2",
  price: 20,
  thumbnail: "sin imagen2",
  code: "002",
  stock: 150,
};

const test = async() =>{
    console.log(await manager.getProduct())
    await manager.addProduct(product1)
    await manager.addProduct(product2)
    console.log(await manager.getProduct())
    // await manager.deleteFile()
}

test()