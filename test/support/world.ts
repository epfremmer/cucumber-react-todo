import * as fs from 'fs';
import { ConstructorOptions, JSDOM } from 'jsdom';
import { After, Before, setWorldConstructor } from 'cucumber';
import { LocalStorage } from 'node-localstorage';

const PROJECT_ROOT = `${__dirname}/../..`;
const TEMP_DIR = `${PROJECT_ROOT}/temp`;
const INDEX_FILE = `${PROJECT_ROOT}/index.html`;

const options: ConstructorOptions = {
  resources: 'usable',
  runScripts: 'dangerously',
};

class AppWorld {
  private dom: JSDOM;
  private window: Window;
  private document: Document;
  private ready: Promise<boolean>;

  public currentElement: HTMLElement;

  constructor() {
    this.dom = new JSDOM(fs.readFileSync(INDEX_FILE), options);
    this.window = this.dom.window;
    this.document = this.window.document;

    (this.window as any).localStorage = new LocalStorage(`${TEMP_DIR}/localstorage`);

    this.ready = new Promise(resolve => {
      this.document.addEventListener('DOMContentLoaded', () => resolve(true));
    });
  }

  public find(selector) {
    return this.document.querySelector(selector);
  }

  public findAll(selector) {
    return this.document.querySelectorAll(selector);
  }

  public select(selector) {
    return this.currentElement = this.find(selector);
  }

  public pressEnter() {
    const React = (this.window as any).React;
    const event = { keyCode: 13 };

    React.addons.TestUtils.Simulate.keyDown(this.currentElement, event);
  }

  public toggleCheckbox() {
    const React = (this.window as any).React;

    React.addons.TestUtils.Simulate.change(this.currentElement);
  }

  public click() {
    const React = (this.window as any).React;

    React.addons.TestUtils.Simulate.click(this.currentElement);
  }

  public html() {
    process.stdout.write('\n============== debug output ===============\n');
    process.stdout.write(this.currentElement.innerHTML);
    process.stdout.write('\n=============== debug end =================\n');
  }
}

Before(function() {
  return this.ready;
});

After(function() {
  this.window.localStorage.clear();
});

setWorldConstructor(AppWorld);
