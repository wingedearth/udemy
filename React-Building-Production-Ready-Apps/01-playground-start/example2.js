// import TodoList from './TodoList';
function TodoList (props) {
  const {todos, onSetTodoStatus} = props;

  return (
    <ul>
      {
        todos.map((todo, indx) => {
          return (
            <li key={indx}>
              <label>
                <input type="checkbox" checked={todo.isCompleted} onChange={e => onSetTodoStatus(todo, e.target.checked)} />
                {
                  todo.isCompleted
                  ? <del>{todo.text}</del>
                  : todo.text
                }
              </label>
            </li>
          )
        })
      }
    </ul>
  );
}

class AppComponent extends React.Component {
  constructor (props) {
    super(props);

    this.nextTodoId = 1;
    this.state = {
      filter: {showCompleted: true},
      todos: [
        {id: this.nextTodoId++, text: "Hey!", isCompleted: false},
        {id: this.nextTodoId++, text: "Ho!", isCompleted: true},
        {id: this.nextTodoId++, text: "Stuff", isCompleted: true},
        {id: this.nextTodoId++, text: "Things", isCompleted: false}
      ]
    };
    this.onShowCompletedChanged = this.onShowCompletedChanged.bind(this);
    this.setTodoStatus = this.setTodoStatus.bind(this);
  }

  onShowCompletedChanged (e) {
    this.setState({
      filter: {showCompleted: e.target.checked}
    });
  }

  setTodoStatus(todo, isCompleted) {
    const {todos} = this.state;
    this.setState({
      todos: todos.map(oldTodo => {
        if (oldTodo.id != todo.id) {
          return oldTodo;
        }
        return Object.assign({}, oldTodo, {isCompleted});
      })
    })
  }

  render () {
    console.log('Rendered');
    const {filter, todos} = this.state;
    const filteredTodos = filter.showCompleted
    ? todos
    : todos.filter(todo => !todo.isCompleted);

    return (
      <div>
        <h2>Todo List</h2>
        <label>
          Show Completed
          <input type="checkbox" checked={filter.showCompleted} onChange={this.onShowCompletedChanged} />
        </label>
        <TodoList onSetTodoStatus={this.setTodoStatus} todos={filteredTodos} />
      </div>
    );
  }
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('application')
);
