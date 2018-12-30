import {AppRegistry} from 'react-360';
import Saltwash360 from './saltwash360';
import Truck from './truck';
import Flower from './flower';
import {initialize} from './store';
initialize();

AppRegistry.registerComponent('Saltwash360', () => Saltwash360);
AppRegistry.registerComponent('Truck', () => Truck);
AppRegistry.registerComponent('Flower', () => Flower);
