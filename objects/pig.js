import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, PointLight, asset} from 'react-360';
import Entity from 'Entity';

const Pig = props => {
  return (
    (isZone(props.zone, Zone.Driza) || isZone(props.zone, Zone.Aoera)) && 
    <View>
      <AmbientLight intensity={ 0.3 } />
      <PointLight distance={ 10 } style={{color: 'white', transform: [{translate: [0, 1, 2]}]}} />
      <Entity
        source={{
          obj: asset('Light.obj'),
          mtl: asset('Light.mtl')
        }}
        style={{
          transform: [
            {translate: [0, 1, 2]}
          ]
        }}
      />
      <Entity
        source={{
          obj: asset('Pig.obj'),
          mtl: asset('Pig.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [2.5, -1, -3]},
            {rotateY: 210},
            {scale: 3}
          ]
        }}
      />
    </View>
  );
};

const ConnectedPig = connect(Pig);

export default ConnectedPig;
