import express from "express";
import ProductManager from "./manager/product.manager.js";

const productManager = new ProductManager("./products.json");

const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const products = await productManager.getProduct();

    const { limit } = req.query
    const productsLimit = products.slice(0,limit).map(p);
    if(limit) {
      products = products.slice(0,limit)
   }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    // console.log(req.body);
    const products = await productManager.addProduct(req.body);
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { idProdpiduct } = req.params;
    const product = await productManager.getUserById(pid);
    if (!product) res.status(404).json({ msg: "User not found" });
    else res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.put("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const ProdUpd = await productManager.updateProduct(req.body, pid);
    if (!ProdUpd) res.status(404).json({ msg: "Error updating user" });
    res.status(200).json(ProdUpd);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.delete("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const delProd = await productManager.deleteUser(pid);
    if(!delProd) res.status(404).json({ msg: "Error delete user" });
    else res.status(200).json({msg : `User id: ${pid} deleted successfully`})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server ok on port ${PORT}`));
