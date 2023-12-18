import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import authReducer from './AuthReducer';
import SecureLS from 'secure-ls'; // Secure Local Storage
import {thunk} from "redux-thunk";
import { setAuthorizationHeader } from '../api/ApiCalls';

const secureLs = new SecureLS();

const getStateFromLocalStorage = () => {
    let stateInLocalStorage = {
        isLoggedIn: false,
        id: undefined,
        email: undefined,
        name: undefined,
        image: undefined,
        token: undefined,
        expiration: undefined,
        refreshWorkspace: false,
        refreshBoard: false
    }

    const getStateInLocalStorage = secureLs.get('auth');

    if (getStateInLocalStorage) {
        stateInLocalStorage = getStateInLocalStorage;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLs.set('auth', newState);
}

const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const initialState = getStateFromLocalStorage();
    setAuthorizationHeader(initialState);
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    });

    return store;
}

export default configureStore;