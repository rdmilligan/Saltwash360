import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {play3DAudio} from './helpers/objecthelpers';
import {connect, setZone, setAction} from '../store/store';
import {View, VrButton, AmbientLight, PointLight, Animated, asset} from 'react-360';
import Entity from 'Entity';
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Lypzo extends React.Component {
    animTrashcanRotY = new Animated.Value(0);

    state = {
        isTrashcanJive: false,
        scaleTrashcan: 0,
        scalePencilBench: 0,
        scaleDoor: 0,
        translateItems: [0, 0, 0]
    };

    handleTrashcan = () => {
        
        // Step 1: spin trashcan
        if (!this.state.isTrashcanJive){
            play3DAudio('TrashcanJive.MP3', 1, [2, -1, -2]);
            this.setState({isTrashcanJive: true});
            Animated.timing(this.animTrashcanRotY, {toValue: 360, duration: 6000}).start();
            return;
        }

        // Step 2: spew trashcan
        if (isAction(this.props.action, '')){
            play3DAudio('TrashcanRebuke.MP3', 0.6, [2, -1, -2]);
            setAction(Action.TrashcanSpew);
            return;
        }

        // Step 4: jam trashcan
        if (isAction(this.props.action, Action.PencilSeek)){
            setAction(Action.TrashcanJam);
            this.setState({translateItems: [0, 0, 0]});
        }
    };

    handlePencilBench = () => {

        // Step 3: seek pencil
        if (isAction(this.props.action, Action.TrashcanSpew)){
            setAction(Action.PencilSeek);
            this.setState({translateItems: [6.0, 1.85, 1.9]});
        }
    };

    handleDoor = () => {

        // Step 5: zone Tikjo
        if (isAction(this.props.action, Action.TrashcanJam)){
            setAction('');
            setZone(Zone.Tikjo);
        }
    };

    render() {
        return (
            isZone(this.props.zone, Zone.Lypzo) && 
            <View>
                <AmbientLight intensity={ 0.6 } />
                <PointLight 
                    distance={ 10 }
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [1.5 + this.state.translateItems[0], 3.5, 2 + this.state.translateItems[2]]}
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
                            {translate: [1.5 + this.state.translateItems[0], 3.5, 2 + this.state.translateItems[2]]}
                        ]
                    }}
                />
                <VrButton
                    onClick={this.handleTrashcan}
                    onEnter={() => this.setState({scaleTrashcan: 0.1})}
                    onExit={() => this.setState({scaleTrashcan: 0})}
                    >
                    <AnimatedEntity
                        source={{
                            obj: asset('Trashcan.obj'),
                            mtl: asset('Trashcan.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [2 + this.state.translateItems[0], -2.01, -2 + this.state.translateItems[2]]},
                                {rotateY: this.animTrashcanRotY},
                                {scale: 1.2 + this.state.scaleTrashcan}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handlePencilBench}
                    onEnter={() => this.setState({scalePencilBench: 0.1})}
                    onExit={() => this.setState({scalePencilBench: 0})}>
                    <Entity
                        source={{
                            obj: asset('Pencil.obj'),
                            mtl: asset('Pencil.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-5.9 + this.state.translateItems[0], -2 + this.state.translateItems[1], -3 + this.state.translateItems[2]]},
                                {rotateY: 320},
                                {scale: 1.0 + this.state.scalePencilBench}
                            ]
                        }}
                    />
                    <Entity
                        source={{
                            obj: asset('Bench.obj'),
                            mtl: asset('Bench.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-6.8 + this.state.translateItems[0], -2, -1.8 + this.state.translateItems[2]]},
                                {rotateY: 95},
                                {scale: 1.3 + this.state.scalePencilBench}
                            ]
                        }}
                    />
                </VrButton>
                <Entity
                    source={{
                        obj: asset('Lypzo.obj'),
                        mtl: asset('Lypzo.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [this.state.translateItems[0], -2, this.state.translateItems[2]]}
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
                            {translate: [this.state.translateItems[0], -2, 9.0 + this.state.translateItems[2]]},
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
                                {translate: [8.5 + this.state.translateItems[0], -2, -9.0 + this.state.translateItems[2]]},
                                {scale: 1.0 + this.state.scaleDoor}
                            ]
                        }}
                    />
                </VrButton>
            </View>
        );
    };
};

const ConnectedLypzo = connect(Lypzo);

export default ConnectedLypzo;
