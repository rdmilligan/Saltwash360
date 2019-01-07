import React from 'react';
import Zone from '../constants/zoneconstants';
import Action from '../constants/actionconstants';
import {isZone} from '../helpers/zonehelpers';
import {isAction} from '../helpers/actionhelpers';
import {connect, setZone, setAction} from '../store/store';
import {View, VrButton, PointLight, NativeModules, Animated, asset} from 'react-360';
import Entity from 'Entity';
const {AudioModule} = NativeModules;
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Lypzo extends React.Component {
    rotation = new Animated.Value(0);

    state = {
        isTrashcanJive: false,
        translatePencil: [0,0,0]
    };

    handleTrashcan = () => {
        if (isAction(this.props.action, Action.PencilSeek)){
            setZone(Zone.Tikjo);
            return;
        }

        if (this.state.isTrashcanJive) {
            setAction(Action.TrashcanSpew);
            return;
        }

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
        Animated.timing(this.rotation, {toValue: 360, duration: 6000}).start();
    };

    handlePencil = () => {
        if (!isAction(this.props.action, Action.TrashcanSpew)){
            return;
        }

        setAction(Action.PencilSeek);
        this.setState({translatePencil: [6,1.85,2]});
    };

    render() {
        return (
            isZone(this.props.zone, Zone.Lypzo) && 
            <View>
                <PointLight 
                    distance='20'
                    style={{
                        color: 'white', 
                        transform: [
                            {translate: [2.5 + this.state.translatePencil[0], 3.5, 2 + this.state.translatePencil[2]]}
                        ]
                    }} />
                <VrButton
                    onClick={this.handleTrashcan}>
                    <AnimatedEntity
                        source={{
                            obj: asset('Trashcan.obj'),
                            mtl: asset('Trashcan.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [2 + this.state.translatePencil[0], -0.01, -2 + this.state.translatePencil[2]]},
                                {rotateY: this.rotation},
                                {scale: 1.2}
                            ]
                        }}
                    />
                </VrButton>
                <VrButton
                    onClick={this.handlePencil}>
                    <Entity
                        source={{
                            obj: asset('Bench.obj'),
                            mtl: asset('Bench.mtl')
                        }}
                        lit={true}
                        style={{
                            transform: [
                                {translate: [-6.8 + this.state.translatePencil[0], 0, -1.7 + this.state.translatePencil[2]]},
                                {rotateY: 95},
                                {scale: 1.5}
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
                                {translate: [-6 + this.state.translatePencil[0], 0 + this.state.translatePencil[1], -3 + this.state.translatePencil[2]]},
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
                            {translate: [0 + this.state.translatePencil[0], 0, 0 + this.state.translatePencil[2]]},
                        ]
                    }}
                />
            </View>
        );
    };
};

const ConnectedLypzo = connect(Lypzo);

export default ConnectedLypzo;
