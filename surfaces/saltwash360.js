import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone, isMoonSunMountains} from '../helpers/zonehelpers';
import {connect, setZone} from '../store/store';
import {Environment, asset, View, StyleSheet, VrButton, Text, Image} from 'react-360';

class Saltwash360 extends React.Component {

  switchZone = () => {
    
    // Switch zone
    const isSunMountains = isZone(this.props.zone, Zone.SunMountains);
    
    isSunMountains ? Environment.setBackgroundImage(asset('360_world.jpg')) : Environment.setBackgroundImage(asset('360WorldSun.jpg'));
    
    setZone(isSunMountains ? Zone.MoonMountains : Zone.SunMountains);
  };

  render() {
    return (
      <View style={styles.panel}>

        {isMoonSunMountains(this.props.zone) &&
        <View>
          <VrButton
            onClick={() => setZone(Zone.Lypzo)}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Enter
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

        {isZone(this.props.zone, Zone.Lypzo) &&
          <Text style={styles.greeting}>
            Hit the trash till it spins, and again till it spews.
          </Text>
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
