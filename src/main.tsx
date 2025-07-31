import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { App } from '@components/app/app.tsx';
import { configureStore } from './services/store';
import './index.css';

export const store = configureStore();

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<HashRouter>
				<App />
			</HashRouter>
		</Provider>
	</React.StrictMode>
);
