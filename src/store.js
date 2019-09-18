import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import configReducer from "./app/config/reducers";

const configStoreData = combineReducers({
	configReducer
});

const configureStore = () => {
	const middlewares = [thunk];

	if (process.env.NODE_ENV === `development`) {
	  const { logger } = require(`redux-logger`);
	  middlewares.push(logger);
	}

	return createStore(
		configStoreData,
		applyMiddleware(...middlewares)
	);
};

export default configureStore;
