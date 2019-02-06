import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, asset} from 'react-360';
import Entity from 'Entity';

const Rhino = props => {
  return (
    isZone(props.zone, Zone.Mortz) && 
    <View>
      <AmbientLight intensity={ 0.4 } />
      <Entity
        source={{
          obj: asset('Rhino.obj'),
          mtl: asset('Rhino.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [2.2, -1, -3]},
            {rotateY: 120},
            {scale: 1.2}
          ]
        }}
      />
    </View>
  );
};

const ConnectedRhino = connect(Rhino);

export default ConnectedRhino;
