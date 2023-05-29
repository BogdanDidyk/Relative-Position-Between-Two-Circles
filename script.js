Number.isPositive = function(value) {
    return typeof value == "number" && !Number.isNaN(value) && value >= 0;
};

class Point {
    #_x;
    #_y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#_x;
    }

    set #x(value) {
        if (!Number.isPositive(value)) value = 0;
        this.#_x = value;
    }

    get y() {
        return this.#_y;
    }

    set #y(value) {
        if (!Number.isPositive(value)) value = 0;
        this.#_y = value;
    }

    distanceTo(otherPoint, fractionDigits = 2) {
        if (!(otherPoint instanceof Point)) return NaN;
        return Math.hypot(this.#_x - otherPoint.x, this.#_y - otherPoint.y).toFixed(fractionDigits);
    }

    toString() {
        return `(${this.#_x}; ${this.#_y})`;
    }
}

class Circle {
    #_centerPoint;
    #_radius;

    constructor(centerPoint, radius) {
        this.#centerPoint = centerPoint;
        this.#radius = radius;
    }

    get centerPoint() {
        return this.#_centerPoint;
    }

    set #centerPoint(value) {
        if (!(value instanceof Point)) value = new Point(0, 0);
        this.#_centerPoint = value;
    }

    get radius() {
        return this.#_radius;
    }

    set #radius(value) {
        if (!Number.isPositive(value)) value = 0;
        this.#_radius = value;
    }

    toString() {
        return `{${this.#_centerPoint}; R = ${this.#_radius}}`;
    }
}

class RelativePositionOfFigures {
    static twoPoints(point1, point2) {
        if (!(point1 instanceof Point) || !(point2 instanceof Point))
            throw new Error("One or two input parameters isn't point!");
    
        if (point1.x == point2.x && point1.y == point2.y) return "Two points are the same";
        else return "Two points are different";
    }
}