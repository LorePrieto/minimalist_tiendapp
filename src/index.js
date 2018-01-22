import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import root from './reducers/root';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { getAllProducts } from './actions/products.js'

const middlewares = [thunk];

const middlewareEnhancer = applyMiddleware(...middlewares);

const storeEnhancers = [middlewareEnhancer];

const composedEnhancer = composeWithDevTools(...storeEnhancers);

const store = createStore(
	root,
	composedEnhancer
);

store.dispatch(getAllProducts());

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
