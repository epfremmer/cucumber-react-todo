import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "@app/store";
import { TodoApp } from '@app/app';

export const render = (window) => {
  const rootNode = window.document.getElementsByClassName('todoapp')[0];
  const Root = (
    <Provider store={store}>
      <HashRouter>
        <TodoApp ref={node => window.app = node} />
      </HashRouter>
    </Provider>
  );

  ReactDOM.render(Root, rootNode);
};