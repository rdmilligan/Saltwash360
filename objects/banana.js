import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, asset} from 'react-360';
import Entity from 'Entity';

const Banana = props => {
  return (
    (isZone(props.zone, Zone.Ookei) || isZone(props.zone, Zone.Buzko)) && 
    <View>
      <AmbientLight intensity={ 0.4 } />
      <Entity
        source={{
          obj: asset('Banana.obj'),
          mtl: asset('Banana.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [2, -1, -2.6]},
            {rotateY: 100},
            {scale: 2.5}
          ]
        }}
      />
    </View>
  );
};

const ConnectedBanana = connect(Banana);

export default ConnectedBanana;
