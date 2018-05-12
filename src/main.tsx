import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { store } from "@app/store";
import { Provider } from "react-redux";
import { TodoApp } from "@app/app";

ReactDOM.render((
    <Provider store={store}>
      <HashRouter>
        <TodoApp />
      </HashRouter>
    </Provider>
  ),
  document.getElementsByClassName('todoapp')[0]
);
