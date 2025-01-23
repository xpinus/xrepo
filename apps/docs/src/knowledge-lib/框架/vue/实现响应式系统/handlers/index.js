import get from './get.js';
import set from './set.js';
import deleteProperty from './delete.js';
import ownKeys from './ownKeys.js';
import has from './has.js';

const handler = {
    get,
    set,
    deleteProperty,
    ownKeys,
    has,
};

export default handler;
