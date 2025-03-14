declare global {
  var __MONGOINSTANCE:
    | import('mongodb-memory-server').MongoMemoryServer
    | undefined
}

export {}
