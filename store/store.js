const combineReducer = (reducers) => {
    let updatedState = {};
    const reducerKeys = Object.keys(reducers);

    return (state= {}, action) => {
        reducerKeys.forEach((key) => {
            updatedState[key] = reducers[key](state[key], action)
        })
        return updatedState;
    }
}
const createStore = (rootReducer) => {
    let state;
    let callbackQueue = [];

    const subscribe = (callback) => {
        if (typeof callback === 'function') {
            callbackQueue.push(callback);
        }
    };
    const dispatch = (action) => {
        state = rootReducer(state, action)
        callbackQueue.forEach(callback => callback(state))
    };
    const getState = () => {
        return state;
    };

    return { subscribe, dispatch, getState}
}

export { createStore, combineReducer }