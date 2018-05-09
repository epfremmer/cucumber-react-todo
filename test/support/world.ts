import * as TestUtils from 'react-dom/test-utils';
import { ConstructorOptions, JSDOM } from 'jsdom';
import { After, Before, setWorldConstructor } from 'cucumber';
import { createHashHistory, History } from "history";
import { render } from '@app/app';

const TEMPLATE = `
  <div class="todoapp"></div>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Created by <a href="http://github.com/remojansen/">Remo H. Jansen</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
`;

const options: ConstructorOptions = {
  resources: 'usable',
  runScripts: 'dangerously',
};

class AppWorld {
  private dom: JSDOM;
  private window: Window;
  private document: Document;
  private history: History;
  private ready: Promise<boolean>;

  public currentElement: HTMLElement;

  constructor() {
    this.dom = new JSDOM(TEMPLATE, options);
    this.window = this.dom.window;
    this.document = this.window.document;
    this.history = createHashHistory();

    this.ready = new Promise(resolve => {
      render(this.document);
      resolve(true);
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
    const event = { keyCode: 13 };

    TestUtils.Simulate.keyDown(this.currentElement, event);
  }

  public toggleCheckbox() {
    TestUtils.Simulate.change(this.currentElement);
  }

  public click() {
    TestUtils.Simulate.click(this.currentElement);
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
  localStorage.clear();
});

setWorldConstructor(AppWorld);
