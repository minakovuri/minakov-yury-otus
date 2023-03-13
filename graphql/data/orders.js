import { generateUUID } from "../utils/generateUUID.js"

const orders = []

function getOrders() {
    return orders
}

function addOrder(date, customerId, productIds) {
    const order = {
        id: generateUUID(),
        date,
        customerId,
        productIds,
    }

    orders.push(order)

    return order
}

function deleteOrder(id) {
    const index = orders.findIndex(order => order.id === id)
    orders.splice(index, 1)
    return id
}

export {
    getOrders,
    addOrder,
    deleteOrder,
}