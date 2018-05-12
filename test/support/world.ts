import * as TestUtils from 'react-dom/test-utils';
import { After, setWorldConstructor } from 'cucumber';
import { JSDOM } from 'jsdom';
import { render } from '../entrypoint';

const TEMPLATE = `
  <div class="todoapp"></div>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Created by <a href="http://github.com/remojansen/">Remo H. Jansen</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
  </footer>
`;

class AppWorld {
  private dom: JSDOM;
  private window: Window;
  private document: Document;

  public currentElement: HTMLElement;

  constructor() {
    this.dom = new JSDOM(TEMPLATE);
    this.window = this.dom.window;
    this.document = this.window.document;

    render(this.window);
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

After(function() {
  localStorage.clear();
});

setWorldConstructor(AppWorld);
