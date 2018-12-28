import React from 'react';
import { AppRegistry, StyleSheet, Text, View, VrButton, Image } from 'react-360';
import Truck from './truck';
import { Environment, asset, NativeModules } from 'react-360';
const {AudioModule} = NativeModules;

export default class Saltwash360 extends React.Component {
  state = {
    count: 0,
    isSunEnvironment: false
  };

  incrementCount = () => {
    
    // Increment count
    this.setState({count: this.state.count + 1});
  };

  switchEnvironment = () => {
    
    // Switch environment
    const isSunEnvironment = this.state.isSunEnvironment;
    
    isSunEnvironment ? Environment.setBackgroundImage(asset('360_world.jpg')) : Environment.setBackgroundImage(asset('360WorldSun.jpg'));
    
    this.setState({isSunEnvironment: !isSunEnvironment});
  };

  componentDidMount() {
    setTimeout(() => { 

      // Sound the truck's horn after 15 sec
      AudioModule.createAudio('Horn', {
        source: asset('Horn.wav'),
        is3d: true,
      });

      AudioModule.play('Horn', {
        position: [0, -1, -2.5], // Position horn at truck in 3D space
      });

    }, 15000);
  };

  render() {
    return (
      <View>
        <View style={styles.panel}>
          <VrButton
            onClick={this.incrementCount}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              {`Press me: ${this.state.count}`}
            </Text>
          </VrButton>
          <VrButton
            onClick={this.switchEnvironment}>
            {this.state.isSunEnvironment ?
              <Image source={asset('Moon.png')} style={styles.switchEnvironment}/> : 
              <Image source={asset('Sun.png')} style={styles.switchEnvironment}/>
            }
          </VrButton>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  switchEnvironment: {
    height: 100, 
    width: 100
  },
});

AppRegistry.registerComponent('Saltwash360', () => Saltwash360);