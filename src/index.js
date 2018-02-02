import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { getAllProducts } from './actions/products.js';
import { loadTiendapp } from './actions/tiendapp.js';
import configureStore from './configureStore';

const { store, persistor } = configureStore()
store.dispatch(loadTiendapp());
store.dispatch(getAllProducts());

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<App persistor={persistor}/>
			</BrowserRouter>
    </PersistGate>
	</Provider>
	, document.getElementById('root')
);
