import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect, setZone} from '../store/store';
import {View, VrButton, PointLight, NativeModules, Animated, asset} from 'react-360';
import Entity from 'Entity';
const {AudioModule} = NativeModules;
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Lypzo extends React.Component {
    rotation = new Animated.Value(0);

    state = {
        isTrashcanJive: false
    };

    handleTrashcan = () => {
        if (this.state.isTrashcanJive) {
            setZone(Zone.Tikjo);
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

    render() {
        return (
            isZone(this.props.zone, Zone.Lypzo) && 
            <View>
                <PointLight style={{color: 'white', transform: [{translate: [2.5, 3.5, 2]}]}} />
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
                                {translate: [2, -0.01, -2]},
                                {rotateY: this.rotation},
                                {scale: 1.2}
                            ]
                        }}
                    />
                </VrButton>
                <Entity
                    source={{
                        obj: asset('Lypzo.obj'),
                        mtl: asset('Lypzo.mtl')
                    }}
                />
            </View>
        );
    };
};

const ConnectedLypzo = connect(Lypzo);

export default ConnectedLypzo;
