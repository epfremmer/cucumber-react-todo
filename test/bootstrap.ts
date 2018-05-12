import { LocalStorage } from 'node-localstorage';
import { JSDOM } from 'jsdom';
import * as raf from 'raf';

/**
 * Initialize global local storage interface
 */
const TEMP_DIR = `${__dirname}/../temp`;
(global as any).localStorage = new LocalStorage(`${TEMP_DIR}/localstorage`);

/**
 * Initialize empty global dom elements to get ReactDOM to
 * bootstrap correctly when it is initially imported
 */
const { window } = new JSDOM('');
(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = window.navigator;

/**
 * Polyfill requestAnimationFrame to prevent
 * reactDOM from throwing warnings
 */
raf.polyfill(global);

/**
 * Polyfill Element.closes because JSDOM has not added it to their spec yet
 *
 * @see https://github.com/jsdom/jsdom/pull/1951
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
 */
require('element-closest');
