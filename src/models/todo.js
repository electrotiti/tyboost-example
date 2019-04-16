const uuid = require('uuid')

module.exports = class Todo {

  constructor (database) {
    this.db = database
  }

  async getAll () {
    const keys = await this.db.keys()
    if (keys.length > 0)
      return this.db.mget(keys)
    else
      return []
  }

  async create (message) {
    const id = uuid.v4()
    let todo = {id, message, done: false}
    await this.db.set(id, todo)
    return todo
  }

  async toogle (id) {
    const todo = await this.db.get(id)
    todo.done = !todo.done
    await this.db.set(id, todo)
    return todo
  }

  async delete (id) {
    await this.db.del(id)
    return true
  }
}
