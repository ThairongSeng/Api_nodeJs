const isEmptyOrNull = (value) => {
    if (value == "" || value == null || value == undefined || value == "null" || value == "undefined") {
        return true;
    }
    return false;
};

module.exports = { isEmptyOrNull };