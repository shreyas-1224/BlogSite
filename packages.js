const search = (nameKey, myArray) => {
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].blog_title === nameKey) {
            return myArray[i];
        }
    }
    return -1;
}

module.exports = {search};