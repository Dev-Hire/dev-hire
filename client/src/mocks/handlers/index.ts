import * as fruitHandlers from './fruit';
import * as recruitsHandlers from './recruits';

export const handlers = [...Object.values(fruitHandlers), ...Object.values(recruitsHandlers)];
