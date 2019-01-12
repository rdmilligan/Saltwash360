import {NativeModules, asset} from 'react-360';
const {AudioModule} = NativeModules;

export function play3DAudio(fileName, volume, position) {
    
    AudioModule.createAudio(fileName, {
        source: asset(fileName),
        volume: volume,
        is3d: true
    });

    AudioModule.play(fileName, {
        position: position
    });
};
