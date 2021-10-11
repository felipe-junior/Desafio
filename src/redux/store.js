import { createStore , compose, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga' 

import rootSaga from './sagas/rootSaga'
import reducers from './reducers'

const sagaMiddleware =  createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f=>f
)(createStore)(reducers);

sagaMiddleware.run(rootSaga);
export default store
