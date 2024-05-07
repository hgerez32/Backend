import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProduct() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(products); 
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(obj) {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getProduct();
      const prodExist = products.find((p) => p.code === user.code);
      if (prodExist) return "Code already exists";
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      console.log(error);
    }
  }



  async getProductbyId(idProduct){
  try {
    const products = await this.getProduct();
    const prodExist = products.find((p) => p.id === user.id);
    if (!prodExist) return null;
    return prodExist;
  } catch (error) {
    console.log(error);
  }
}

async updateProd(obj, idProduct) {
  try {
    const products = await this.getProduct();
    let prodExist = await this.getProductbyId(idProduct);
          // console.log(userExist);
    if (!prodExist) return null;
    prodExist = { ...prodExist, ...obj };
    // console.log(userExist);
    const newArray = products.filter((p) => p.id !== idProduct);
    newArray.push(prodExist)
    await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    return prodExist;
  } catch (error) {
    console.log(error);
  }
}

async deleteUser(idProduct) {
  const products = await this.getProduct();
  if (products.length > 0) {
    const prodExist = await this.getProductbyId(idProduct);
    // console.log(userExist);
    if (prodExist) {
      const newArray = products.filter((p) => p.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return prodExist
    } 
  } else return null
}

  async deleteFile(){
    try {
        await fs.promises.unlink(this.path);
        console.log('archivo eliminado');
    } catch (error) {
        console.log(error);
    }
  }
}
