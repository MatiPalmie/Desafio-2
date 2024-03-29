const fs = require("fs");

class ProductManager {
  constructor(filename) {
    this.path = filename;
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } else {
      this.products = [];
    }
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    let product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    let productValues = Object.values(product);
    let productsLength = this.products.length;
    let productCode = this.products.find((e) => e["code"] === code);

    if (!productValues.includes(undefined)) {
      if (productCode === undefined) {
        if (productsLength === 0) {
          product["id"] = 1;
        } else {
          product["id"] = this.products[productsLength - 1]["id"] + 1;
        }
        this.products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, "\t")
        );
      } else {
        console.log("El código ingresado esta repetido");
      }
    } else {
      console.log("Se omitió algun dato");
    }
  }
  getProducts() {
    console.log(this.products);
  }
  getProductById(id) {
    let product = this.products.find((e) => e["id"] === id);
    if (product === undefined) {
      console.log("Not Found");
    } else {
      console.log("El producto que corresponde al id ingresado es:", product);
    }
  }
  async deleteProduct(id) {
    let product = this.products.findIndex((e) => e["id"] === id);
    if (product === -1) {
      console.log("Not Found");
    } else {
      this.products.splice(product,1);
      await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,"\t"))
      console.log("Ha sido eliminado el producto con el id:", id);
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock){
    let productUpt = {
    title: title,
    description: description,
    price: price,
    thumbnail: thumbnail,
    code: code,
    stock: stock,
    }
    let compare = (a,b) =>{
      if(b ===''){
        return a
      }else{
        return b
      }
    }
    let productIndex = this.products.findIndex((e) => e["id"] === id);
    if (productIndex === -1) {
      console.log("Not Found");
    } else {
      let productDlt = this.products[productIndex];
      let product = {
        title: compare(productDlt.title,productUpt.title),
        description: compare(productDlt.description,productUpt.description) ,
        price: compare(productDlt.price,productUpt.price),
        thumbnail: compare(productDlt.thumbnail,productUpt.thumbnail),
        code:  compare(productDlt.code,productUpt.code),
        stock:  compare(productDlt.stock,productUpt.stock),
        id: id
      }
      console.log(product)
      this.products.splice(productIndex,1,product);
      await fs.promises.writeFile(this.path,JSON.stringify(this.products,null,"\t"))
      console.log("ha sido modificado el producto con el id:", id);
    }
  }
}

const pcComponents = new ProductManager("products.json");

//pcComponents.getProducts();

pcComponents.addProduct("producto prueba", "Este es un producto prueba2",300, "Sin imagen", "abc12124", 45);

//pcComponents.getProducts();

//pcComponents.getProductById(1);

//pcComponents.updateProduct(1,'','','','','',500);

//pcComponents.deleteProduct(1);
