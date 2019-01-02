import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, PointLight, asset} from 'react-360';
import Entity from 'Entity';

const Lypzo = props => {
    return (
        isZone(props.zone, Zone.Lypzo) && 
        <View>
            <PointLight style={{color: 'white', transform: [{translate: [2.5, 3.5, 2]}]}} />
            <Entity
                source={{
                    obj: asset('Trashcan.obj'),
                    mtl: asset('Trashcan.mtl')
                }}
                lit={true}
                style={{
                    transform: [
                        {translateX: 2},
                        {translateY: -0.01},
                        {translateZ: -2},
                        {scale: 1.2}
                    ]
                }}
            />
            <Entity
                source={{
                    obj: asset('Lypzo.obj'),
                    mtl: asset('Lypzo.mtl')
                }}
            />
        </View>
    );
};

const ConnectedLypzo = connect(Lypzo);

export default ConnectedLypzo;
