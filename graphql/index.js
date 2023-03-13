import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { GraphQLScalarType, Kind } from 'graphql'

import { getProducts, getProduct, addProduct, deleteProduct } from './data/products.js'
import { getCustomers, addCustomer, deleteCustomer, editCustomer} from './data/customers.js'
import { getOrders, addOrder, deleteOrder } from './data/orders.js'

const Config = {
  PORT: 4000,
}

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        if (value instanceof Date) {
            return value.getTime()
        }
        throw Error('GraphQL Date Scalar serializer expected a `Date` object')
    },
    parseValue(value) {
        if (typeof value === 'number') {
            return new Date(value)
        }
        throw new Error('GraphQL Date Scalar parser expected a `number`')
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10))
        }
        return null
    },
})

const typeDefs = `#graphql
  type Product {
    id: Int!
    name: String!
    description: String
    price: Float!
    category: Category!
  }

  enum Category {
    BOOKS
    ELECTRONICS
    CLOTHES
    VIDEO_GAMES
  }

  type Customer {
    id: Int!
    name: String!
  }

  scalar Date

  type Order {
    id: Int!
    date: Date!
    customerId: Int!
    productIds: [Int!]
  }

  type Query {
    products: [Product!]
    product(id: Int!): Product!
    customers: [Customer!]
    orders: [Order!]
  }

  type Mutation {
    addProduct(name: String!, description: String, price: Float!, category: Category!): Product!
    deleteProduct(id: Int!): Int!
    addCustomer(name: String!): Customer!
    deleteCustomer(id: Int!): Int!
    editCustomer(id: Int!, name: String!): Customer
    addOrder(date: Date!, customerId: Int!, productIds: [Int!]): Order!
    deleteOrder(id: Int!): Int!
  }
`

const resolvers = {
  Date: dateScalar,
  Query: {
    products: () => getProducts(),
    product: (root, args, context, info) => getProduct(args.id),
    customers: () => getCustomers(),
    orders: () => getOrders()
  },
  Mutation: {
    addProduct: (root, args, context, info) => addProduct(args.name, args.description, args.price, args.category),
    deleteProduct: (root, args, context, info) => deleteProduct(args.id),
    addCustomer: (root, args, context, info) => addCustomer(args.name),
    editCustomer: (root, args, context, info) => editCustomer(args.id, args.name),
    deleteCustomer: (root, args, context, info) => deleteCustomer(args.id),
    addOrder: (root, args, context, info) => addOrder(args.date, args.customerId, args.products),
    deleteOrder: (root, args, context, info) => deleteOrder(args.id),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const { url } = await startStandaloneServer(server, {
  listen: { port: Config.PORT }
});

console.log(`🚀  Server ready at: ${url}`);