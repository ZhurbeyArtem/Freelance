const getTags = (tags) => {
    const arr = []
    tags.forEach(e => {
        arr.push(e.name + ' ')
    })
    return arr
}

export {
    getTags
};
