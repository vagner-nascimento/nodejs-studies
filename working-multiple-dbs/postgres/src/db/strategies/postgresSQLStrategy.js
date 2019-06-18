const IDb = require('./base/interfaceDb');
const Sequelize = require('sequelize');
class PostgreSQLConnection {
  static connect() {}
}
class PostgreSQLStrategy extends IDb {
  constructor() {
    super();
    this._heroes = null;
    this._sequelize = null;
    this._connect();
  }

  defineModel() {
    this._heroes = this._sequelize.define( 
      'heroes',
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        //database options
        tableName: 'TB_HEROES',
        freezeTableName: false,
        timestamps: false,
      },
    );
  }

  _connect() {
    this._sequelize = new Sequelize(
      'heroes', //database
      'admin', // user
      'admin', //senha
      {
        host: 'localhost',
        dialect: 'postgres',
        port: 54320,
        // case sensitive
        quoteIdentifiers: false,
        // deprecation warning
        operatorsAliases: false
    
        //, dialectOptions: {
        //   ssl: true,
        // }
        },
    );

    this.defineModel();
  }

  async isConnected() {
    try {
      await this._sequelize.authenticate();
      return true;
    } catch (error) {
      console.error('fail!', error);
      return false;
    }
  }

  create(item) {
    return this._heroes.create(item, { raw: true });
  }

  read(item) {
    return this._heroes.findAll({ where: item, raw: true });
  }

  update(id, item) {
    return this._heroes.update(item, { where: { id } });
  }
  
  delete(id) {
    const query = id ? { id } : {};
    return this._heroes.destroy({ where: query });
  }
}

module.exports = PostgreSQLStrategy;
