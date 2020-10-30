import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
import Product from '../app/models/Product';
// import Favorite from '../app/models/Favorite';

const models = [User, File, Appointment, Product];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // estou utilizando um formato novo na string de conexão
      useFindAndModify: true, // para poder buscar e atualizar os registros
      useUnifiedTopology: true, // DeprecationWarning apareceu no console então eu estou usando, conforme a recomendação do mongo
    });
  }
}

export default new Database();
