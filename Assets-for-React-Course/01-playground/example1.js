class AppComponent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      count: 0,
      title: "Merry Meet, multiverse!",
      foo: props.foo
    };
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
  }

  render () {
    const {count, title, foo} = this.state;
    return (
      <div className="main">
        <h2>Header: {title}</h2>
        <h3>The counter is: {count}</h3>
        <h3>foo: {foo}</h3>
        <div>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }

  increment (e) {
    const {count} = this.state;
    this.setState({
      count: count + 1
    });
  }

  decrement () {
    const {count} = this.state;
    this.setState({
      count: count - 1
    });
  }
}

ReactDOM.render(
  <AppComponent foo="bar" />,
  document.getElementById('application')
);
