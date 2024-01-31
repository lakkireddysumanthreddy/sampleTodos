import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todosLists: [],
    todoActivity: '',
  }

  deleteTodo = id => {
    const result = localStorage.getItem('todoLists')
    const resultList = JSON.parse(result)
    const updatedTodosList = resultList.filter(eachTodo => eachTodo.id !== id)
    localStorage.setItem('todoLists', JSON.stringify(updatedTodosList))
  }

  onInputChangetodoActivity = event => {
    this.setState({todoActivity: event.target.value})
  }

  onAddTodo = () => {
    const {todoActivity} = this.state
    if (todoActivity !== '') {
      const todoItem = {
        id: uuidv4(),
        todoActivity,
      }

      const todoLists = JSON.parse(localStorage.getItem('todoLists') || '[]')
      todoLists.push(todoItem)
      localStorage.setItem('todoLists', JSON.stringify(todoLists))

      this.setState({todoActivity: ''})
      const result = localStorage.getItem('todoLists')
      const resultList = JSON.parse(result)

      this.setState(prevState => ({
        todosLists: [...prevState.todosLists, resultList],
      }))
    }
  }

  renderThis = () => {
    const result = localStorage.getItem('todoLists')
    const resultList = JSON.parse(result)

    return (
      <ul className="todos-list">
        {resultList.map(eachTodo => (
          <TodoItem
            key={eachTodo.id}
            todoDetails={eachTodo}
            deleteTodo={this.deleteTodo}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {todoActivity} = this.state
    const result = localStorage.getItem('todoLists')
    const resultList = JSON.parse(result)
    return (
      <div className="app-container">
        <div className="second-constainer">
          <div className="input-container">
            <h1>TODO Application</h1>
            <input
              value={todoActivity}
              placeholder="todo"
              type="text"
              onChange={this.onInputChangetodoActivity}
            />
            <br />
            <button className="button" onClick={this.onAddTodo} type="button">
              Add Task
            </button>
          </div>
        </div>
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          {resultList === null ? (
            <p className="Empty">Empty Todo List</p>
          ) : (
            this.renderThis()
          )}
        </div>
      </div>
    )
  }
}

export default SimpleTodos
