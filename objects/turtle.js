import React from 'react';
import Zone from '../constants/zoneconstants';
import {isZone} from '../helpers/zonehelpers';
import {connect} from '../store/store';
import {View, AmbientLight, PointLight, asset} from 'react-360';
import Entity from 'Entity';

const Turtle = props => {
  return (
    (isZone(props.zone, Zone.Tikjo) || isZone(props.zone, Zone.Krixo)) && 
    <View>
      <AmbientLight intensity={ 0.4 } />
      <PointLight distance={ 10 } style={{color: 'white', transform: [{translate: [2, 1, 1]}]}} />
      <Entity
        source={{
          obj: asset('Light.obj'),
          mtl: asset('Light.mtl')
        }}
        style={{
          transform: [
            {translate: [2, 1, 1]}
          ]
        }}
      />
      <Entity
        source={{
          obj: asset('Turtle.obj'),
          mtl: asset('Turtle.mtl')
        }}
        lit={true}
        style={{
          transform: [
            {translate: [2.2, -1, -2.7]},
            {rotateY: 100},
            {scale: 2.5}
          ]
        }}
      />
    </View>
  );
};

const ConnectedTurtle = connect(Turtle);

export default ConnectedTurtle;
