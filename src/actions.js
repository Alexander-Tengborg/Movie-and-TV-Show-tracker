import * as types from './constants';

export const setInput = (input) => {
    // console.log(input.target.value);
    return {
        type: types.SET_INPUT,
        query: input.target.value
    }
}

export const startSearch = () => {
    return {
        type: types.SEARCH_START
    }
}

export const finishedSearch = () => {
    return {
        type: types.SEARCH_FINISH
    }
}