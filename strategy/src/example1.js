class NotImplementedException extends Error {
  constructor() {
    super('Not Implemented Exception');
  }
}

//"interface", simulation of one
class ICrud {
  create(item) {
    throw new NotImplementedException();
  }
  read(item) {
    throw new NotImplementedException();
  }
  update(id, item) {
    throw new NotImplementedException();
  }
  delete(id) {
    throw new NotImplementedException();
  }
}

class MongoDBStrategy extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log('Inserted on Mongo');
  }
}
class PostgreSQLStrategy extends ICrud {
  constructor() {
    super();
  }
  create(item) {
    console.log('Inserted on PostgresSQL');
  }
}

class ContextoStrategy extends ICrud {
  constructor(database) {
    super();
    this._database = database;
  }
  create(item) {
    return this._database.create(item);
  }
  read(item) {
    return this._database.read(item);
  }
  update(id, item) {
    return this._database.update(id, item);
  }
  delete(id) {
    return this._database.delete(id, item);
  }
}

const contextMongo = new ContextoStrategy(new MongoDBStrategy());
contextMongo.create();

const context = new ContextoStrategy(new PostgreSQLStrategy());
context.create();

// context.read(); //It should throws a NotImplementedException from the "interface"
