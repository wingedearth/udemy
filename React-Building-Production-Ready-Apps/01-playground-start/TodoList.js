const TodoList = props => {
  const {todos} = props;

  return (
    <ul>
      {
        todos.map((todo, indx) => {
          return (<li key={indx}>
          {
            todo.isCompleted
            ? <del>{todo.text}</del>
            : todo.text
          }
          </li>);
        })
      }
    </ul>
  );
}

export default TodoList;
