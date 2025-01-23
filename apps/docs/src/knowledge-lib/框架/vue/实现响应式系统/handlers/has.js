import { TrackOpTypes } from '../util.js';
import track from '../effect/track.js';

export default function (target, prop) {
    track(target, prop, TrackOpTypes.HAS);
    return Reflect.has(target, prop);
}
