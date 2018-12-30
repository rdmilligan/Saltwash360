import React from 'react';

const State = {
  isSunEnvironment: false
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
};

export function initialize() {
  updateComponents();
};

export function setSunEnvironment(isSunEnvironment) {
  State.isSunEnvironment = isSunEnvironment;
  updateComponents();
};

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
        isSunEnvironment: State.isSunEnvironment
    };

    _listener = () => {
      this.setState({
        isSunEnvironment: State.isSunEnvironment
      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    };

    componentWillUnmount() {
      listeners.delete(this._listener);
    };

    render() {
      return (
        <Component
          {...this.props}
          isSunEnvironment={this.state.isSunEnvironment}
        />
      );
    };
  };
};
