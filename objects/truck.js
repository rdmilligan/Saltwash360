import React from 'react';
import {isMoonSunMountains} from '../helpers/zonehelpers';
import {play3DAudio} from './helpers/objecthelpers';
import {connect} from '../store/store';
import {View, AmbientLight, PointLight, asset} from 'react-360';
import Entity from 'Entity';

class Truck extends React.Component {
  state = {
    translateX: 0,
    rotateY: 0
  };

  componentDidMount() {
    setTimeout(() => { 
      if (!isMoonSunMountains(this.props.zone)) return;

      // Sound the truck's horn after 15 sec
      play3DAudio('Horn.wav', 0.8, [0, -0.7, -2.5]);

      // Rotate truck and drive off!
      this.interval = setInterval(() => { 
        if (!isMoonSunMountains(this.props.zone)){
          clearInterval(this.interval);
          return;
        }

        if (this.state.rotateY < 120){
          this.setState({rotateY: this.state.rotateY + 1});
          this.setState({translateX: this.state.translateX + 0.01});
        } else {
          this.setState({translateX: this.state.translateX + 0.1});
        }
      }, 50);

    }, 15000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  render() {
    return (
      isMoonSunMountains(this.props.zone) && 
      <View>
        <AmbientLight intensity={ 1.5 } />
        <PointLight distance={ 10 } style={{color: 'white', transform: [{translate: [0, 1, 2]}]}} />
        <Entity
          source={{
            obj: asset('Light.obj'),
            mtl: asset('Light.mtl')
          }}
          style={{
            transform: [
              {translate: [0, 1, 2]}
            ]
          }}
        />
        <Entity
          source={{
            obj: asset('Truck.obj'),
            mtl: asset('Truck.mtl')
          }}
          lit={true}
          style={{
            transform: [
              {translate: [this.state.translateX, -1, -2.8]},
              {rotateY: this.state.rotateY},
              {scale: 10}
            ]
          }}
        />
      </View>
    );
  };
};

const ConnectedTruck = connect(Truck);

export default ConnectedTruck;
