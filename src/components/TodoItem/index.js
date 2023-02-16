import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo} = props
  const {id, todoActivity} = todoDetails

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-item">
      <p className="title">{todoActivity}</p>
      <button type="button" className="delete-btn" onClick={onDeleteTodo}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
