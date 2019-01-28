import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone, isMoonSunMountains} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {connect, setZone} from '../store/store';
import {Environment, NativeModules, asset, View, StyleSheet, VrButton, Text, Image} from 'react-360';
const {VideoModule} = NativeModules;
VideoModule.createPlayer('myplayer');

class Saltwash360 extends React.Component {

  switchBackground = () => {
    
    // Switch background
    const isSunMountains = isZone(this.props.zone, Zone.SunMountains);
    
    isSunMountains ? Environment.setBackgroundImage(asset('360_world.jpg')) : Environment.setBackgroundImage(asset('360WorldSun.jpg'));
    
    setZone(isSunMountains ? Zone.MoonMountains : Zone.SunMountains);
  };

  playVideo = (filename, duration, nextZone) => {

    // Play video
    VideoModule.play('myplayer', { source: {url: asset(filename).uri}, muted: false });
    Environment.setScreen('default', 'myplayer', 'default', 0, 0, 1000, 500);

    // Stop video
    setTimeout(function(){
      VideoModule.stop('myplayer');
      Environment.setScreen('default', 'myplayer', 'default', 0, 0, -1, -1);
      setZone(nextZone);
     }, duration);
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
            onClick={this.switchBackground}>
            {isZone(this.props.zone, Zone.SunMountains) ?
              <Image source={asset('Moon.png')} style={styles.switchBackground}/> : 
              <Image source={asset('Sun.png')} style={styles.switchBackground}/>
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

        {isZone(this.props.zone, Zone.Tikjo) && this.playVideo('StripeFish.mp4', 19000, Zone.Krixo)}

        {isZone(this.props.zone, Zone.Krixo) &&
        <View style={styles.panel}>
          <VrButton
            onClick={() => setZone(Zone.Gretz)}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Fry the fish
            </Text>
          </VrButton>
        </View>
        }

        {isZone(this.props.zone, Zone.Gretz) &&
        <View style={styles.panel}>
          <Text style={styles.greeting}>
          {
            isAction(this.props.action, Action.BlueFishTickle) ? 'Hot fingers need a bucket of water. Better exit.' :
            isAction(this.props.action, Action.StripedFishTickle) ? 'Damn. Your hasty paws lit a jolt.' :
            isAction(this.props.action, Action.SumoConsult) ? 'Master says: tickle the fillet of lines.' :
            'Consult with the Master.'
          }
          </Text>
        </View>
        }

        {isZone(this.props.zone, Zone.Ookei) && this.playVideo('TerrorChimp.mp4', 21000, Zone.Buzko)}

        {isZone(this.props.zone, Zone.Buzko) && 
        <View style={styles.panel}>
          <VrButton
            onClick={() => setZone(Zone.Xiotz)}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Who's got the plums?
            </Text>
          </VrButton>
        </View>
        }

        {isZone(this.props.zone, Zone.Xiotz) &&
        <View style={styles.panel}>
          <Text style={styles.greeting}>
          {
            isAction(this.props.action, Action.RoundTreeRustle) ? `Oh smouldering karma, boosted to ${this.props.karma}.` :
            isAction(this.props.action, Action.LayerTreeRustle) ? `Too bad you shook the wrong trunk. Karma frozen at ${this.props.karma}.` :
            'Rustle the leaves of the plum top tree to dislodge the primate.'
          }
          </Text>
        </View>
        }

        {isZone(this.props.zone, Zone.Fryzo) && this.playVideo('TumblingDice.mp4', 14000, Zone.Janew)}

        {isZone(this.props.zone, Zone.Janew) && 
        <View style={styles.panel}>
          <VrButton
            onClick={() => setZone(Zone.Errit)}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Red letter day
            </Text>
          </VrButton>
        </View>
        }

        {isZone(this.props.zone, Zone.Errit) &&
        <View style={styles.panel}>
          <Text style={styles.greeting}>
          {
            isAction(this.props.action, Action.DiceRoll) ? `Wow, lucky number seven. Karma soars to ${this.props.karma}.` :
            'Hit the switch to roll the dice.'
          }
          </Text>
        </View>
        }
        
        {isZone(this.props.zone, Zone.Driza) && this.playVideo('HauntedCow.mp4', 27000, Zone.Aoera)}

        {isZone(this.props.zone, Zone.Aoera) && 
        <View style={styles.panel}>
          <VrButton
            onClick={() => setZone(Zone.Nerka)}
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Bring a pitchfork
            </Text>
          </VrButton>
        </View>
        }

        {isZone(this.props.zone, Zone.Nerka) &&
        <View style={styles.panel}>
          <Text style={styles.greeting}>
          {
            isAction(this.props.action, Action.CowIgnore) ? `The pigs have chewed your legs off. Karma plummets to ${this.props.karma}.` :
            isAction(this.props.action, Action.CowConsult) ? `The cow has offered a safe haven. Karma calmer at ${this.props.karma}.` :
            isAction(this.props.action, Action.PigsMarch) ? 'Beware of the three little pigs!' :
            'Oh, what does the switch do?'
          }
          </Text>
        </View>
        }

        {isZone(this.props.zone, Zone.Rastl) && 
        <View style={styles.panel}>
          <Text style={styles.greeting}>
            Farms smell of horse shit.
          </Text>
        </View>
        }

        {isZone(this.props.zone, Zone.Mortz) && 
        <View style={styles.panel}>
          <Text style={styles.greeting}>
            Farms smell of red wine.
          </Text>
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
  switchBackground: {
    height: 100, 
    width: 100
  },
});

const ConnectedSaltwash360 = connect(Saltwash360);

export default ConnectedSaltwash360;
