import React from 'react';
import Zone from '../constants/zoneconstants';

const State = {
  zone: Zone.MoonMountains,
  action: '',
  karma: 0
};

const listeners = new Set();

function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
};

export function setZone(zone) {
  State.zone = zone;
  updateComponents();
};

export function setAction(action) {
  State.action = action;
  updateComponents();
};

export function incrementKarma() {
  State.karma++;
  updateComponents();
};

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      zone: State.zone,
      action: State.action,
      karma: State.karma
    };

    _listener = () => {
      this.setState({
        zone: State.zone,
        action: State.action,
        karma: State.karma
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
          zone={this.state.zone}
          action={this.state.action}
          karma={this.state.karma}
        />
      );
    };
  };
};
