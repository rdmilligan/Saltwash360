import React from 'react';
import { AppRegistry, StyleSheet, Text, View, VrButton } from 'react-360';
import Truck from './truck';
import {asset, NativeModules} from 'react-360';
const {AudioModule} = NativeModules;

export default class Saltwash360 extends React.Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    
    // Increment count
    this.setState({count: this.state.count + 1});
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
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  panel: {
    width: 1000,
    height: 600,
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
});

AppRegistry.registerComponent('Saltwash360', () => Saltwash360);