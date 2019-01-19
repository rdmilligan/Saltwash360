import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, PointLight, asset} from 'react-360';
import Entity from 'Entity';

class Gretz extends React.Component {

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
                            {translate: [7.5, 3.5, -4]}
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
                            {translate: [7.5, 3.5, -4]}
                        ]
                    }}
                />
                <Entity
                    source={{
                        obj: asset('StripeFish.obj'),
                        mtl: asset('StripeFish.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translate: [4, 0, -2]},
                            {rotateY: 20},
                        ]
                    }}
                />
                <Entity
                    source={{
                        obj: asset('BlueFish.obj'),
                        mtl: asset('BlueFish.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translate: [7, 0, -1]},
                            {rotateY: 40},
                        ]
                    }}
                />
                <Entity
                    source={{
                        obj: asset('Sumo.obj'),
                        mtl: asset('Sumo.mtl')
                    }}
                    lit={true}
                    style={{
                        transform: [
                            {translate: [-4, 0, -1.5]},
                        ]
                    }}
                />
                <Entity
                    source={{
                        obj: asset('Gretz.obj'),
                        mtl: asset('Gretz.mtl')
                    }}
                    style={{
                        transform: [
                            {translate: [6, -2, -6]},
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
                            {translate: [0, -2, 3.0]},
                            {rotateY: 180}
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
                            {translate: [14.5, -2, -15.0]},
                        ]
                    }}
                />
            </View>
        );
    };
};

const ConnectedGretz = connect(Gretz);

export default ConnectedGretz;
