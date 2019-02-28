import { SET_INPUT, SEARCH_START, SEARCH_FINISH } from './constants';

import { combineReducers } from 'redux';

const initialState = {
    query: '',
    isSearching: false
}

const input = (state = initialState, action) => {
    switch(action.type) {
        case SET_INPUT:
            return {
                ...state,
                query: action.query
            };
        case SEARCH_START:
            return {
                ...state,
                isSearching: true
            }
        case SEARCH_FINISH:
            return {
                ...state,
                isSearching: false
            }
        default:
            return state;
    }
}

const reducers = combineReducers({input});

export default reducers;