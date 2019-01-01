import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, asset} from 'react-360';
import Entity from 'Entity';

const Lypzo = props => {
    return (
        isZone(props.zone, Zone.Lypzo) && 
        <View>
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
