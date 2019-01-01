import Zone from '../constants/zoneconstants';

export function isZone(sourceZone, targetZone) {
    return sourceZone == targetZone;
};

export function isMoonSunMountains(zone) {
    return zone == Zone.MoonMountains || zone == Zone.SunMountains;
};
