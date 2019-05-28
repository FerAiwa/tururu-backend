import Mongoose from 'mongoose';

// that class only can be extended
class MongoRepository {
  /** Creates a Mongo Repository with basic CRUD operations for the model
   * @param  {Mongoose.Model} model
   */
  constructor(modelName) {
    const model = Mongoose.model(modelName);
    if (!model) throw new Error(`${modelName} not accesible`);
    this.model = model;
  }

  async create(item) {
    return this.model.create(item);
  }

  async find(id) {
    const result = await this.model.find(id);
    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  async update(item) {
    return this.model.save(item);
    // return this.model.findOneAndUpdate(id, query);
  }

  async delete(id) {
    return this.model.deleteOne(id);
  }

  async findOne(filter) {
    return this.model.findOne(filter);
  }

  async findOneAndUpdate(conditions, updateQ, options) {
    return this.model.findOneAndUpdate(conditions, updateQ, options);
  }
}

export default MongoRepository;
