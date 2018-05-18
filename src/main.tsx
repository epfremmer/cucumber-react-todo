import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { store, history } from '@app/store';
import { TodoApp } from '@app/app';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

ReactDOM.render((
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <TodoApp />
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementsByClassName('todoapp')[0]
);
