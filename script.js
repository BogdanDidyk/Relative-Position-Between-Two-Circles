Number.isPositive = function(value) {
    return typeof value == "number" && !Number.isNaN(value) && value >= 0;
};