import React from 'react';
import {isMoonSunMountains} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, PointLight, NativeModules, asset} from 'react-360';
import Entity from 'Entity';
const {AudioModule} = NativeModules;

class Truck extends React.Component {
  state = {
    translateX: 0,
    rotateY: 0
  };

  componentDidMount() {
    setTimeout(() => { 
      if (!isMoonSunMountains(this.props.zone)) return;

      // Sound the truck's horn after 15 sec
      AudioModule.createAudio('Horn', {
        source: asset('Horn.wav'),
        is3d: true
      });

      AudioModule.play('Horn', {
        position: [0, -1, -2.5] // Position horn at truck in 3D space
      });

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
        <AmbientLight intensity={ 2 } />
        <PointLight distance='5' style={{color: 'white', transform: [{translate: [0, 1, 2]}]}} />
        <Entity
          source={{
            obj: asset('Truck.obj'),
            mtl: asset('Truck.mtl')
          }}
          lit={true}
          style={{
            transform: [
              {translateX: this.state.translateX},
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
