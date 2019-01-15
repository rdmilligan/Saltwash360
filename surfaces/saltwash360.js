import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone, isMoonSunMountains} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {connect, setZone} from '../store/store';
import {Environment, NativeModules, asset, View, StyleSheet, VrButton, Text, Image} from 'react-360';
const {VideoModule} = NativeModules;

class Saltwash360 extends React.Component {

  switchZone = () => {
    
    // Switch zone
    const isSunMountains = isZone(this.props.zone, Zone.SunMountains);
    
    isSunMountains ? Environment.setBackgroundImage(asset('360_world.jpg')) : Environment.setBackgroundImage(asset('360WorldSun.jpg'));
    
    setZone(isSunMountains ? Zone.MoonMountains : Zone.SunMountains);
  };

  fishVideo = () => {

    // Play fish video
    VideoModule.createPlayer('myplayer');
    VideoModule.play('myplayer', { source: {url: asset('StripeFish.mp4').uri}, muted: false });
    Environment.setScreen('default', 'myplayer', 'default', 0, 0, 1000, 500);
  };

  render() {
    return (
      <View>

        {isMoonSunMountains(this.props.zone) &&
        <View style={styles.panel}>
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
        <View style={styles.panel}>
          <Text style={styles.greeting}>
          {
            isAction(this.props.action, Action.TrashcanJam) ? 'Damn. The lid won\'t budge. Take a sharp exit.' :
            isAction(this.props.action, Action.PencilSeek) ? 'Just the ricket to crank the gunge. Try it on the trash can.' :
            isAction(this.props.action, Action.TrashcanSpew) ? 'Trash can needs to be brought down a peg or two. Seek a wedge.' :
            'Hit the trash till it spins, and again till it spews.'
          }
          </Text>
        </View>
        }

        {isZone(this.props.zone, Zone.Tikjo) && this.fishVideo()}

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
