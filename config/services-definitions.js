const Todo = require('../src/models/todo')
const Database = require('../src/services/database')

module.exports = [
  {
    name: 'todo_model',
    definition: Todo,
    dependencies: ['@database'],
    singleton: true
  },
  {
    name: 'database',
    definition: Database,
    dependencies: ['%ttl%'],
    singleton: true
  }
]
