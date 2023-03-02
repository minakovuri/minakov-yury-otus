import { generateUUID } from "../utils/generateUUID.js"

const products = []

function getProducts() {
    return products
}

function getProduct(id) {
    return products.find(product => product.id === id)
}

function addProduct(name, description, price, category) {
  const product = {
    id: generateUUID(),
    name,
    description,
    price,
    category,
  }

  products.push(product)

  return product
}

function deleteProduct(id) {
    const index = products.findIndex(product => product.id === id)
    products.splice(index, 1)
    return id
}

export {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
}