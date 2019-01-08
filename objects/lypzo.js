import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {connect, setZone, setAction} from '../store/store';
import {View, VrButton, AmbientLight, PointLight, NativeModules, Animated, asset} from 'react-360';
import Entity from 'Entity';
const {AudioModule} = NativeModules;
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Lypzo extends React.Component {
    animatedRotation = new Animated.Value(0);

    state = {
        isTrashcanJive: false,
        scaleTrashcan: 0,
        scaleBench: 0,
        translateItems: [0, 0, 0]
    };

    handleTrashcan = () => {
        
        if (!this.state.isTrashcanJive){

            // Play the trashcan jive
            AudioModule.createAudio('TrashcanJive', {
                source: asset('TrashcanJive.MP3'),
                is3d: true
            });

            AudioModule.play('TrashcanJive', {
                position: [2, -1, -2]
            });

            this.setState({isTrashcanJive: true});

            // Spin the trash
            Animated.timing(this.animatedRotation, {toValue: 360, duration: 6000}).start();

            return;
        }

        if (isAction(this.props.action, Action.PencilSeek)){
            setZone(Zone.Tikjo);
            return;
        }

        if (!isAction(this.props.action, Action.TrashcanSpew)){

            // Play the trashcan plee
            AudioModule.createAudio('TrashcanPlee', {
                source: asset('TrashcanPlee.MP3'),
                is3d: true
            });

            AudioModule.play('TrashcanPlee', {
                position: [2, -1, -2]
            });

            setAction(Action.TrashcanSpew);
        }
    };

    handlePencil = () => {

        if (isAction(this.props.action, Action.TrashcanSpew)){
            setAction(Action.PencilSeek);
            this.setState({translateItems: [6.0, 1.85, 1.9]});
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
                    }} />
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
                                {translate: [2 + this.state.translateItems[0], -0.01, -2 + this.state.translateItems[2]]},
                                {rotateY: this.animatedRotation},
                                {scale: 1.2 + this.state.scaleTrashcan}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handlePencil}
                    onEnter={() => this.setState({scaleBench: 0.1})}
                    onExit={() => this.setState({scaleBench: 0})}>
                    <Entity
                        source={{
                            obj: asset('Bench.obj'),
                            mtl: asset('Bench.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-6.8 + this.state.translateItems[0], 0, -1.8 + this.state.translateItems[2]]},
                                {rotateY: 95},
                                {scale: 1.3 + this.state.scaleBench}
                            ]
                        }}
                    />
                    <Entity
                        source={{
                            obj: asset('Pencil.obj'),
                            mtl: asset('Pencil.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-5.9 + this.state.translateItems[0], 0 + this.state.translateItems[1], -3 + this.state.translateItems[2]]},
                                {rotateY: 320}
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
                            {translate: [0 + this.state.translateItems[0], 0, 0 + this.state.translateItems[2]]},
                        ]
                    }}
                />
            </View>
        );
    };
};

const ConnectedLypzo = connect(Lypzo);

export default ConnectedLypzo;
