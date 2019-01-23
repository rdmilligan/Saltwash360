import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {play3DAudio} from './helpers/objecthelpers';
import {connect, setZone, setAction, incrementKarma} from '../store/store';
import {View, VrButton, AmbientLight, PointLight, Animated, asset} from 'react-360';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Xiotz extends React.Component {
    animBeerBottlePosY = new Animated.Value(1);

    state = {
        scaleRoundTree: 0,
        scaleLayerTree: 0,
        scaleDoor: 0
    };

    handleRoundTree = () => {

        // Step 1: rustle round tree
        if (isAction(this.props.action, '')){
            play3DAudio('FlaskCry.MP3', 1, [-11, 1, 4]);
            incrementKarma();
            setAction(Action.RoundTreeRustle);
            Animated.timing(this.animBeerBottlePosY, {toValue: -2, duration: 500}).start();
        }
    };

    handleLayerTree = () => {

        // Step 1: rustle layer tree
        if (isAction(this.props.action, '')){
            setAction(Action.LayerTreeRustle);
        }
    };

    handleDoor = () => {

        // Step 2: zone Fryzo
        if (!isAction(this.props.action, '')){
            setAction('');
            setZone(Zone.Fryzo);
        }
    };

    render() {
        return (
            isZone(this.props.zone, Zone.Xiotz) && 
            <View>
                <AmbientLight intensity={ 0.6 } />
                <PointLight 
                    distance={ 10 }
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [-1.5, 4, 4]}
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
                            {translate: [-1.5, 4, 4]}
                        ]
                    }}
                />
                <VrButton
                    onClick={this.handleRoundTree}
                    onEnter={() => this.setState({scaleRoundTree: 0.1})}
                    onExit={() => this.setState({scaleRoundTree: 0})}
                    >
                    <Entity
                        source={{
                            obj: asset('RoundTree.obj'),
                            mtl: asset('RoundTree.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-11, -2, 3]},
                                {scale: 1.5 + this.state.scaleRoundTree}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handleLayerTree}
                    onEnter={() => this.setState({scaleLayerTree: 0.1})}
                    onExit={() => this.setState({scaleLayerTree: 0})}
                    >
                    <Entity
                        source={{
                            obj: asset('LayerTree.obj'),
                            mtl: asset('LayerTree.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-5.5, -2, -4]},
                                {scale: 1.5 + this.state.scaleLayerTree}
                            ]
                        }}
                    />
                </VrButton>
                <AnimatedEntity
                    source={{
                        obj: asset('BeerBottle.obj'),
                        mtl: asset('BeerBottle.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translateX: -11},
                            {translateY: this.animBeerBottlePosY},
                            {translateZ: 4},
                            {scale: 2.0}
                        ]
                    }}
                />
                <Entity
                    source={{
                        obj: asset('Xiotz.obj'),
                        mtl: asset('Xiotz.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [-6, -2, -2]}
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
                            {translate: [0, -2, 7.0]},
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
                                {translate: [-16, -2, -3.0]},
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
