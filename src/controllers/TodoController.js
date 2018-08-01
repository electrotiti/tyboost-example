const Controller = require('tyboost/lib/tools/Controller')

class TodoController extends Controller {
  constructor () {
    super()

    this.router.get('/todos', this.async(this.getTodos.bind(this)))
    this.router.post('/todo', this.async(this.createTodo.bind(this)))
    this.router.get('/todo/:id/toogle', this.async(this.toogleTodo.bind(this)))
    this.router.delete('/todo/:id', this.async(this.deleteTodo.bind(this)))
  }

  async getTodos (req, res) {
    const  todoList =  await this._getModel(req).getAll()
    res.json(todoList)
  }

  async createTodo (req, res) {
    const message = req.body.message
    const todo =  await this._getModel(req).create(message)
    return res.json(todo)
  }

  async toogleTodo (req, res) {
    const id = req.params.id
    const todo =  await this._getModel(req).toogle(id)
    return res.json(todo)
  }

  async deleteTodo (req, res) {
    const id = req.params.id
    await this._getModel(req).delete(id)
    return res.json({deleted: true})
  }

  _getModel(req) {
    return req.app.get('container').get('todo_model')
  }
}

const controller = new TodoController()
module.exports = controller.router
