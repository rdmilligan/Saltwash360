import {ReactInstance, Location} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  // Render a truck to location
  r360.renderToLocation(
    r360.createRoot('Truck'),
    new Location([0, -1, -2.8]),
  );

  // Render a flower to location
  r360.renderToLocation(
    r360.createRoot('Flower'),
    new Location([-2, -1, -3.8]),
  );

  // Render app content to default cylinder surface
  r360.renderToSurface(
    r360.createRoot('Saltwash360', {}),
    r360.getDefaultSurface()
  );

  // Set background image
  r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
};

window.React360 = {init};
