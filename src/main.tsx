import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/app/app.tsx';
import './index.css';
import { configureStore } from './services/store';
import { Provider } from 'react-redux';

const store = configureStore();

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
