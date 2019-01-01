import React from 'react';
import {connect} from '../store/store';
import {View, asset} from 'react-360';
import Entity from 'Entity';

const Flower = props => {
    return (
        props.isSunEnvironment && 
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
