import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone, isMoonSunMountains} from '../helpers/zonehelpers';
import {connect, setZone} from '../store/store';
import {Environment, asset, NativeModules, View, StyleSheet, VrButton, Text, Image} from 'react-360';
const {AudioModule} = NativeModules;

class Saltwash360 extends React.Component {

  switchZone = () => {
    
    // Switch zone
    const isSunMountains = isZone(this.props.zone, Zone.SunMountains);
    
    isSunMountains ? Environment.setBackgroundImage(asset('360_world.jpg')) : Environment.setBackgroundImage(asset('360WorldSun.jpg'));
    
    setZone(isSunMountains ? Zone.MoonMountains : Zone.SunMountains);
  };

  componentDidMount() {
    setTimeout(() => { 
      if (!isMoonSunMountains(this.props.zone)) return;

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
      <View style={styles.panel}>

        {isMoonSunMountains(this.props.zone) &&
        <View>
          <VrButton
            onClick={() => setZone(Zone.Exit)} // Exit
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Exit
            </Text>
          </VrButton>

          <VrButton
            onClick={this.switchZone}>
            {isZone(this.props.zone, Zone.SunMountains) ?
              <Image source={asset('Moon.png')} style={styles.switchZone}/> : 
              <Image source={asset('Sun.png')} style={styles.switchZone}/>
            }
          </VrButton>
        </View>
        }

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
    alignItems: 'center',
  },
  greeting: {
    fontSize: 30,
  },
  switchZone: {
    height: 100, 
    width: 100
  },
});

const ConnectedSaltwash360 = connect(Saltwash360);

export default ConnectedSaltwash360;
