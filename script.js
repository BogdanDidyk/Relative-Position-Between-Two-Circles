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

    static pointToCircle(point, circle) {
        if (!(point instanceof Point) || !(circle instanceof Circle))
            throw new Error("First input parameter isn't point or second parameter isn't circle!");
    
        const distance = point.distanceTo(circle.centerPoint);
        if (distance == circle.radius) return "Point lies on the circle";
        else if (distance < circle.radius) return "Point lies inside the circle";
        else return "Point lies outside the circle";
    }
    
    static twoCircles(circle1, circle2) {
        if (!(circle1 instanceof Circle) || !(circle2 instanceof Circle))
            throw new Error("One or two input parameters isn't circle!");
    
        const distance = circle1.centerPoint.distanceTo(circle2.centerPoint);
        if (distance == 0 && circle1.radius == circle2.radius) return "Two circles are the same";
        else if (distance == circle1.radius + circle2.radius) return "Two circles are touching externally";
        else if (distance == Math.abs(circle1.radius - circle2.radius)) return "Two circles are touching internally";
        else if (distance < Math.abs(circle1.radius - circle2.radius)) return "One circle lying inside other";
        else if (distance > circle1.radius + circle2.radius) return "Two circles are lying outside each other"; 
        else return "Two circles intersects at two points";
    }
}

const p1 = new Point(3, 3);
const p2 = new Point(3, 3);
const p3 = new Point(3, 3.05);
const c1 = new Circle(new Point(0, 3.05), 3);
const c2 = new Circle(new Point(2, 2), 2);
const c3 = new Circle(new Point(0.5, 1), 1);
const c4 = new Circle(new Point(0, 7.05), 1);
const c5 = new Circle(new Point(2, 2.5), 1.5);
const c6 = new Circle(new Point(2, 2), 1.5);

console.log(`${p1.toString()} to ${p2.toString()} => ${RelativePositionOfFigures.twoPoints(p1, p2)}`);
console.log(`${p1.toString()} to ${p3.toString()} => ${RelativePositionOfFigures.twoPoints(p1, p3)}`);
console.log("");
console.log(`${p3.toString()} to ${c1.toString()} => ${RelativePositionOfFigures.pointToCircle(p3, c1)}`);
console.log(`${p1.toString()} to ${c2.toString()} => ${RelativePositionOfFigures.pointToCircle(p1, c2)}`);
console.log(`${p2.toString()} to ${c3.toString()} => ${RelativePositionOfFigures.pointToCircle(p2, c3)}`);
console.log("");
console.log(`${c1.toString()} to ${c1.toString()} => ${RelativePositionOfFigures.twoCircles(c1, c1)}`);
console.log(`${c1.toString()} to ${c4.toString()} => ${RelativePositionOfFigures.twoCircles(c1, c4)}`);
console.log(`${c2.toString()} to ${c5.toString()} => ${RelativePositionOfFigures.twoCircles(c2, c5)}`);
console.log(`${c2.toString()} to ${c6.toString()} => ${RelativePositionOfFigures.twoCircles(c2, c6)}`);
console.log(`${c4.toString()} to ${c6.toString()} => ${RelativePositionOfFigures.twoCircles(c4, c6)}`);
console.log(`${c1.toString()} to ${c2.toString()} => ${RelativePositionOfFigures.twoCircles(c1, c2)}`);