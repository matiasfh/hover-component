import React from "react";
import invariant from "invariant";

const HoverContext = React.createContext({
  on: false
});

const HoverConsumer = props => (
  <HoverContext.Consumer>
    {context => {
      invariant(
        context,
        "Hover Compound Component must be rendered inside a Hover Provider"
      );
      return props.children(context);
    }}
  </HoverContext.Consumer>
);
class Hover extends React.Component {
  static On = ({ children }) => (
    <HoverConsumer>{({ hover }) => (hover ? children : null)}</HoverConsumer>
  );
  static Off = ({ children }) => (
    <HoverConsumer>{({ hover }) => (hover ? null : children)}</HoverConsumer>
  );

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }
  onMouseEnter = () => {
    this.setState(({ hover }) => ({ hover: !hover }));
  };

  onMouseLeave = () => {
    this.setState(({ hover }) => ({ hover: !hover }));
  };

  render() {
    const { children } = this.props;
    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <HoverContext.Provider value={this.state}>
          {children}
        </HoverContext.Provider>
      </div>
    );
  }
}

/*
* Usage
const App = () => (
  <div>
    <Hover>
      <div>
      <Hover.On><h1>Hover</h1></Hover.On>
      </div>
      <Hover.Off><h1>Not Hover</h1></Hover.Off>
    </Hover>
  </div>
);
*/

export default Hover;
