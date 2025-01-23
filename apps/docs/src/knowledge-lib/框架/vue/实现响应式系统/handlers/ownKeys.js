import track from '../effect/track.js';
import { TrackOpTypes } from '../util.js';

export default function (target) {
    track(target, undefined, TrackOpTypes.ITERATE);
    return Reflect.ownKeys(target);
}
