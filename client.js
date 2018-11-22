import {ReactInstance} from 'react-360-web';
import {Location} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  // Create a location 2.8 meters in front of the user, and 1 meter down
  const location = new Location([0, -1, -2.8]);

  // Render a truck to this location
  r360.renderToLocation(
    r360.createRoot('Truck'),
    location,
  );

  // Render app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Saltwash360', {}),
    r360.getDefaultSurface()
  );

  // Set background image
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
};

window.React360 = {init};