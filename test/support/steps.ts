import * as assert from 'assert';
import { Given, Then, When } from 'cucumber';

Given('I create a todo with text {string}', function(text) {
  this.select('input.new-todo');
  this.inputText(text);
  this.pressEnter();
});

Given('the {string} element is present', function(selector) {
  assert(this.find(selector) instanceof this.window.HTMLElement);
});

Given('the {string} element is not present', function(selector) {
  assert.equal(this.find(selector), null);
});

When('I select the {string} element', function(selector) {
  this.select(selector);
});

When('I fill out the {string} field with {string}', function(selector, value = '') {
  this.select(selector);
  assert(this.currentElement instanceof this.window.HTMLInputElement);

  this.inputText(value);
});

When('I press enter', function() {
  this.pressEnter();
});

When(/^I (check|uncheck) the "(.*)" checkbox$/, function(check, selector) {
  this.select(selector);
  this.toggleCheckbox();
});

When('I click the {string} element', function(selector) {
  this.select(selector);
  this.click();
});

When('I click the {string} link', function(selector) {
  const link = this.find(selector);
  const app = this.window.app;

  assert(link instanceof this.window.HTMLAnchorElement);
  link.click();

  return new Promise(resolve => app.forceUpdate(resolve));
});

Then('print that element\'s HTML', function() {
  assert(this.currentElement, 'Cannot print HTML. No element has been selected');
  this.html();
});

Then('I should see text equal to {string}', function(expected) {
  assert.equal(this.currentElement.textContent.trim(), expected);
});

Then('the {string} input should be empty', function(selector) {
  const input = this.find(selector);

  assert(input instanceof this.window.HTMLInputElement);
  assert.equal(input.value, '');
});

Then('I should see placeholder text equal to {string}', function(expected) {
  assert.equal(this.currentElement.placeholder, expected);
});

Then('{string} should have class {string}', function(selector, className) {
  const element = this.find(selector);

  assert(element instanceof this.window.HTMLElement);
  assert.equal(element.classList.contains(className), true);
});

Then('{string} should not have class {string}', function(selector, className) {
  const element = this.find(selector);

  assert(element instanceof this.window.HTMLElement);
  assert.equal(element.classList.contains(className), false);
});

Then(/^I see (\d+) "(.*)" elements?/, function(count, selector) {
  const elements = this.findAll(selector);

  assert.equal(elements.length, count);
});
