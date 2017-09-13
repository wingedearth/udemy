function TodoList (props) {
  return (
    <ul>
      {
        props.todos.map((todo, indx) => {
          return (<li key={indx}>{todo.text}</li>);
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
  }

  onShowCompletedChanged (e) {
    this.setState({
      filter: {showCompleted: e.target.checked}
    });
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
        <TodoList todos={filteredTodos}>
          <li>I am a child.</li>
        </TodoList>
      </div>
    );
  }
}

ReactDOM.render(
  <AppComponent />,
  document.getElementById('application')
);
