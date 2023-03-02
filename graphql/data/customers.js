import { generateUUID } from "../utils/generateUUID.js"

const customers = []

function getCustomers() {
    return customers
}

function addCustomer(name) {
    const customer = {
      id: generateUUID(),
      name,
    }
    
    customers.push(customer)
    
    return customer
}

function deleteCustomer(id) {
    const index = customers.findIndex(customer => customer.id === id)
    customers.splice(index, 1)
    return id
}

function editCustomer(id, name) {
    const customer = customers.find(customer => customer.id === id)

    if (customer) {
        customer.name = name
    }

    return customer
}

export {
    getCustomers,
    addCustomer,
    deleteCustomer,
    editCustomer,
}