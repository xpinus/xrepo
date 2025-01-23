let trackable = true;

export function pauseTracking() {
    trackable = false;
}

export function enableTracking() {
    trackable = true;
}

export default function (target, prop, type) {
    if (!trackable) return;

    console.log('track', target, prop, type);
}
