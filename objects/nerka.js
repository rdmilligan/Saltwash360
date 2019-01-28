import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {connect, setZone, setAction, decrementKarma} from '../store/store';
import {View, VrButton, AmbientLight, PointLight, Animated, asset} from 'react-360';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Nerka extends React.Component {
    animPigOnePosX = new Animated.Value(-11.5);
    animPigTwoPosX = new Animated.Value(-9.5);
    animPigThreePosX = new Animated.Value(-10.5);

    state = {
        scaleSwitch: 0,
        scaleCow: 0,
        scaleLeftDoor: 0,
        scaleFrontDoor: 0,
        translateItems: [0, 0, 0]
    };

    handleSwitch = () => {

        // Step 1: march pigs
        if (isAction(this.props.action, '')){
            setAction(Action.PigsMarch);
            Animated.timing(this.animPigOnePosX, {toValue: -1.5, duration: 13000}).start();
            Animated.timing(this.animPigTwoPosX, {toValue: -3, duration: 7000}).start();
            Animated.timing(this.animPigThreePosX, {toValue: -2, duration: 9000}).start();           

            setTimeout(() => {
                if (isAction(this.props.action, Action.PigsMarch)){
                    decrementKarma();
                    setAction(Action.CowIgnore);
                }
            }, 13000);
        }
    };

    handleCow = () => {

        // Step 2: consult cow
        if (isAction(this.props.action, Action.PigsMarch)){
            this.setState({translateItems: [7, 0, 8]});
            setAction(Action.CowConsult);
        }
    };

    handleDoor = (isLeftDoor) => {

        // Step 3: zone Rastl or Mortz
        if (isAction(this.props.action, Action.CowConsult) ||
            isAction(this.props.action, Action.CowIgnore)){
            setAction('');
            isLeftDoor ? setZone(Zone.Rastl) : setZone(Zone.Mortz);
        }
    };

    render() {
        return (
            isZone(this.props.zone, Zone.Nerka) && 
            <View>
                <AmbientLight intensity={ 0.6 } />
                <PointLight 
                    distance={ 10 }
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [-5.5 + this.state.translateItems[0], 2, -5 + this.state.translateItems[2]]}
                        ]
                    }} 
                />
                <Entity
                    source={{
                        obj: asset('Light.obj'),
                        mtl: asset('Light.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [-5.5 + this.state.translateItems[0], 2, -5 + this.state.translateItems[2]]}
                        ]
                    }}
                />
                
                {isAction(this.props.action, Action.CowConsult) 
                ?
                <View>
                    <Entity
                        source={{
                            obj: asset('Pig.obj'),
                            mtl: asset('Pig.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [6.5, -1.25, 9]},
                                {rotateX: 180},
                                {rotateY: 260},
                                {scale: 3}
                            ]
                        }}
                    />
                    <Entity
                        source={{
                            obj: asset('Pig.obj'),
                            mtl: asset('Pig.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [5, -1.25, 8]},
                                {rotateX: 180},
                                {rotateY: 230},
                                {scale: 3}
                            ]
                        }}
                    />
                    <Entity
                        source={{
                            obj: asset('Pig.obj'),
                            mtl: asset('Pig.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [6, -1.25, 7]},
                                {rotateX: 180},
                                {rotateY: 200},
                                {scale: 3}
                            ]
                        }}
                    />
                </View> 
                :
                <View>
                    <AnimatedEntity
                        source={{
                            obj: asset('Pig.obj'),
                            mtl: asset('Pig.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translateX: this.animPigOnePosX},
                                {translateY: -2},
                                {translateZ: 1},
                                {scale: 3}
                            ]
                        }}
                    />
                    <AnimatedEntity
                        source={{
                            obj: asset('Pig.obj'),
                            mtl: asset('Pig.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translateX: this.animPigTwoPosX},
                                {translateY: -2},
                                {translateZ: 0},
                                {scale: 3}
                            ]
                        }}
                    />
                    <AnimatedEntity
                        source={{
                            obj: asset('Pig.obj'),
                            mtl: asset('Pig.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translateX: this.animPigThreePosX},
                                {translateY: -2},
                                {translateZ: -1},
                                {scale: 3}
                            ]
                        }}
                    />
                </View>
                }

                <VrButton
                    onClick={this.handleCow}
                    onEnter={() => this.setState({scaleCow: 0.1})}
                    onExit={() => this.setState({scaleCow: 0})}
                    >
                    <Entity
                        source={{
                            obj: asset('Cow.obj'),
                            mtl: asset('Cow.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-15.8 + this.state.translateItems[0], -0.2, -7 + this.state.translateItems[2]]},
                                {scale: 1.2 + this.state.scaleCow}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handleSwitch}
                    onEnter={() => this.setState({scaleSwitch: 0.1})}
                    onExit={() => this.setState({scaleSwitch: 0})}>
                    <Entity
                        source={{
                            obj: asset('Switch.obj'),
                            mtl: asset('Switch.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [0 + this.state.translateItems[0], -1, -2.0 + this.state.translateItems[2]]},
                                {scale: 2.0 + this.state.scaleSwitch}
                            ]
                        }}
                    />
                </VrButton>
                <Entity
                    source={{
                        obj: asset('Nerka.obj'),
                        mtl: asset('Nerka.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [-6 + this.state.translateItems[0], -2, -6 + this.state.translateItems[2]]}
                        ]
                    }}
                />
                <Entity
                    source={{
                        obj: asset('Door.obj'),
                        mtl: asset('Door.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [0 + this.state.translateItems[0], -2, 3.0 + this.state.translateItems[2]]},
                            {rotateY: 180}
                        ]
                    }}
                />
                <VrButton
                    onClick={() => this.handleDoor(true)}
                    onEnter={() => this.setState({scaleLeftDoor: 0.1})}
                    onExit={() => this.setState({scaleLeftDoor: 0})}>
                    <Entity
                        source={{
                            obj: asset('Door.obj'),
                            mtl: asset('Door.mtl')
                        }}
                        style={{
                            transform: [
                                {translate: [-16 + this.state.translateItems[0], -2, -11.0 + this.state.translateItems[2]]},
                                {rotateY: 90},
                                {scale: 1.0 + this.state.scaleLeftDoor}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={() => this.handleDoor(false)}
                    onEnter={() => this.setState({scaleFrontDoor: 0.1})}
                    onExit={() => this.setState({scaleFrontDoor: 0})}>
                    <Entity
                        source={{
                            obj: asset('Door.obj'),
                            mtl: asset('Door.mtl')
                        }}
                        style={{
                            transform: [
                                {translate: [-14.8 + this.state.translateItems[0], -2, -15 + this.state.translateItems[2]]},
                                {scale: 1.0 + this.state.scaleFrontDoor}
                            ]
                        }}
                    />
                </VrButton>
            </View>
        );
    };
};

const ConnectedNerka = connect(Nerka);

export default ConnectedNerka;
