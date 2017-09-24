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

class TodoForm extends React.Component {
  constructor (props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  focusInput () {
    this._todoText.focus();
  }

  onSubmit(e) {
    e.preventDefault();
    const todoText = this._todoText.value.trim();
    if (todoText.length != 0) {
      this._todoText.value = '';
      this.props.onAddTodo(todoText);
    }
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" ref={input => this._todoText = input} />
        <button>Add Todo</button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  onAddTodo: React.PropTypes.func.isRequired
};

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
    this._onAddTodo = this._onAddTodo.bind(this);
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

  _onAddTodo (text) {
    console.log('todos:', this.state.todos);
    this.setState({
      todos: this.state.todos.concat({
        id: this.nextTodoId++,
        text,
        isCompleted: false
      })
    });
    console.log('todos (after):', this.state.todos);
  }

  componentDidMount () {
    this._todoForm.focusInput();
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
        <TodoForm onAddTodo={this._onAddTodo} ref={form => this._todoForm = form} />
      </div>
    );
  }
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('application')
);
