//fix this file. do i really need it? if yes, move it, etc...

const isEmpty = (value) => {
    return(
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export default isEmpty;