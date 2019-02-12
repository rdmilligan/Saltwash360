import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, asset} from 'react-360';
import Entity from 'Entity';

const Bull = props => {
  return (
    isZone(props.zone, Zone.Rastl) && 
    <View>
      <AmbientLight intensity={ 0.4 } />
      <Entity
        source={{
          obj: asset('Bull.obj'),
          mtl: asset('Bull.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [2.2, -1, -2.7]},
            {rotateY: 120},
            {scale: 0.8}
          ]
        }}
      />
    </View>
  );
};

const ConnectedBull = connect(Bull);

export default ConnectedBull;
