import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {playEnvironmentalAudio, stopEnvironmentalAudio} from './helpers/objecthelpers';
import {connect, setZone, setAction} from '../store/store';
import {View, VrButton, AmbientLight, PointLight, Animated, asset} from 'react-360';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Gretz extends React.Component {
    animStripeFishPosZ = new Animated.Value(0);
    animBlueFishPosZ = new Animated.Value(-1.5);

    state = {
        scaleSumo: 0,
        scaleStripeFish: 0,
        scaleBlueFish: 0,
        scaleDoor: 0,
        translateItems: [0, 0, 0]
    };

    handleSumo = () => {

        // Step 1: consult sumo
        if (isAction(this.props.action, '')){
            setAction(Action.SumoConsult);
        }
    };

    handleStripedFish = () => {
        
        // Step 2: tickle striped fish
        if (isAction(this.props.action, Action.SumoConsult)){
            playEnvironmentalAudio('Aquarium.MP3', 0.3);
            this.setState({translateItems: [-5, 0, 0]});
            setAction(Action.StripedFishTickle);
            Animated.timing(this.animStripeFishPosZ, {toValue: -9, duration: 6000}).start();
        }
    };

    handleBlueFish = () => {
        
        // Step 3: tickle blue fish
        if (isAction(this.props.action, Action.StripedFishTickle)){
            setAction(Action.BlueFishTickle);
            Animated.timing(this.animBlueFishPosZ, {toValue: -9, duration: 6000}).start();
        }
    };

    handleDoor = () => {

        // Step 4: zone Ookei
        if (isAction(this.props.action, Action.BlueFishTickle)){
            stopEnvironmentalAudio();
            setAction('');
            setZone(Zone.Ookei);
        }
    };

    render() {
        return (
            isZone(this.props.zone, Zone.Gretz) && 
            <View>
                <AmbientLight intensity={ 0.6 } />
                <PointLight 
                    distance={ 10 }
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [5.5 + this.state.translateItems[0], 4, -4]}
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
                            {translate: [5.5 + this.state.translateItems[0], 4, -4]}
                        ]
                    }}
                />
                <VrButton
                    onClick={this.handleStripedFish}
                    onEnter={() => this.setState({scaleStripeFish: 0.1})}
                    onExit={() => this.setState({scaleStripeFish: 0})}
                    >
                    <AnimatedEntity
                        source={{
                            obj: asset('StripeFish.obj'),
                            mtl: asset('StripeFish.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translateX: 6.5 + this.state.translateItems[0]},
                                {translateY: 0},
                                {translateZ: this.animStripeFishPosZ},
                                {rotateY: 20},
                                {scale: 1.0 + this.state.scaleStripeFish}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handleBlueFish}
                    onEnter={() => this.setState({scaleBlueFish: 0.1})}
                    onExit={() => this.setState({scaleBlueFish: 0})}
                    >
                    <AnimatedEntity
                        source={{
                            obj: asset('BlueFish.obj'),
                            mtl: asset('BlueFish.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translateX: 3 + this.state.translateItems[0]},
                                {translateY: 0},
                                {translateZ: this.animBlueFishPosZ},
                                {rotateY: -30},
                                {scale: 1.0 + this.state.scaleBlueFish}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handleSumo}
                    onEnter={() => this.setState({scaleSumo: 0.1})}
                    onExit={() => this.setState({scaleSumo: 0})}
                    >
                    <Entity
                        source={{
                            obj: asset('Sumo.obj'),
                            mtl: asset('Sumo.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-4 + this.state.translateItems[0], 0, -1.5]},
                                {scale: 1.0 + this.state.scaleSumo}
                            ]
                        }}
                    />
                </VrButton>
                <Entity
                    source={{
                        obj: asset('Gretz.obj'),
                        mtl: asset('Gretz.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [6 + this.state.translateItems[0], -2, -6]}
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
                            {translate: [0 + this.state.translateItems[0], -2, 3.0]},
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
                                {translate: [16 + this.state.translateItems[0], -2, -11.0]},
                                {rotateY: 270},
                                {scale: 1.0 + this.state.scaleDoor}
                            ]
                        }}
                    />
                </VrButton>
            </View>
        );
    };
};

const ConnectedGretz = connect(Gretz);

export default ConnectedGretz;
