import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, PointLight, asset} from 'react-360';
import Entity from 'Entity';

const Cards = props => {
  return (
    (isZone(props.zone, Zone.Fryzo) || isZone(props.zone, Zone.Janew)) && 
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
          obj: asset('AceOfClubs.obj'),
          mtl: asset('AceOfClubs.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [3.5, -1, -4.6]},
            {rotateY: 210},
            {scale: 10}
          ]
        }}
      />
      <Entity
        source={{
          obj: asset('KingOfDiamonds.obj'),
          mtl: asset('KingOfDiamonds.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [-2.5, -1, -2.6]},
            {rotateY: 290},
            {scale: 10}
          ]
        }}
      />
    </View>
  );
};

const ConnectedCards = connect(Cards);

export default ConnectedCards;
