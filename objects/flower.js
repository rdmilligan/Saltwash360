import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, asset} from 'react-360';
import Entity from 'Entity';

const Flower = props => {
    return (
        isZone(props.zone, Zone.SunMountains) && 
        <View>
            <Entity
                source={{
                    obj: asset('Flower.obj'),
                    mtl: asset('Flower.mtl')
                }}
                lit={true}
            />
        </View>
    );
};

const ConnectedFlower = connect(Flower);

export default ConnectedFlower;
