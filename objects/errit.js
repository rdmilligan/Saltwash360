import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {connect, setZone, setAction, incrementKarma} from '../store/store';
import {View, VrButton, AmbientLight, PointLight, Animated, asset} from 'react-360';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Xiotz extends React.Component {
    animDiceOnePosZ = new Animated.Value(4);
    animDiceOneRotX = new Animated.Value(0);
    animDiceTwoPosZ = new Animated.Value(4);
    animDiceTwoRotX = new Animated.Value(0);

    state = {
        scaleSwitch: 0,
        scaleDoor: 0
    };

    handleSwitch = () => {

        // Step 1: roll dice
        if (isAction(this.props.action, '')){
            incrementKarma();
            setAction(Action.DiceRoll);
            Animated.timing(this.animDiceOnePosZ, {toValue: -9, duration: 2500}).start();
            Animated.timing(this.animDiceOneRotX, {toValue: -3330, duration: 2500}).start();
            Animated.timing(this.animDiceTwoPosZ, {toValue: -8, duration: 2500}).start();
            Animated.timing(this.animDiceTwoRotX, {toValue: -3510, duration: 2500}).start();
        }
    };

    handleDoor = () => {

        // Step 2: zone Driza
        if (isAction(this.props.action, Action.DiceRoll)){
            setAction('');
            setZone(Zone.Driza);
        }
    };

    render() {
        return (
            isZone(this.props.zone, Zone.Errit) && 
            <View>
                <AmbientLight intensity={ 0.6 } />
                <PointLight 
                    distance={ 10 }
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [-9, 1, -4]}
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
                            {translate: [-9, 1, -4]}
                        ]
                    }}
                />
                <AnimatedEntity
                    source={{
                        obj: asset('Dice.obj'),
                        mtl: asset('Dice.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translateX: -11.5},
                            {translateY: -3.5},
                            {translateZ: this.animDiceOnePosZ},
                            {rotateX: this.animDiceOneRotX}
                        ]
                    }}
                />
                <AnimatedEntity
                    source={{
                        obj: asset('Dice.obj'),
                        mtl: asset('Dice.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translateX: -7.5},
                            {translateY: -3.5},
                            {translateZ: this.animDiceTwoPosZ},
                            {rotateX: this.animDiceTwoRotX}
                        ]
                    }}
                />
                <VrButton
                    onClick={this.handleSwitch}
                    onEnter={() => this.setState({scaleSwitch: 0.1})}
                    onExit={() => this.setState({scaleSwitch: 0})}>
                    <Entity
                        source={{
                            obj: asset('Switch.obj'),
                            mtl: asset('Switch.mtl')
                        }}
                        style={{
                            transform: [
                                {translate: [-1, -1, -2.0]},
                                {scale: 2.0 + this.state.scaleSwitch}
                            ]
                        }}
                    />
                </VrButton>
                <Entity
                    source={{
                        obj: asset('Errit.obj'),
                        mtl: asset('Errit.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [-6, -5, -2]}
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
                            {translate: [1, -2, 7.0]},
                            {rotateY: 180}
                        ]
                    }}
                />
                <VrButton
                    onClick={this.handleDoor}
                    onEnter={() => this.setState({scaleDoor: 0.1})}
                    onExit={() => this.setState({scaleDoor: 0})}>
                    <Entity
                        source={{
                            obj: asset('Door.obj'),
                            mtl: asset('Door.mtl')
                        }}
                        style={{
                            transform: [
                                {translate: [-16, -5, -3.0]},
                                {rotateY: 90},
                                {scale: 1.0 + this.state.scaleDoor}
                            ]
                        }}
                    />
                </VrButton>
            </View>
        );
    };
};

const ConnectedXiotz = connect(Xiotz);

export default ConnectedXiotz;
