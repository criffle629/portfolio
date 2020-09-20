export default class MathTools {
    static get rad2Deg() {
        return 180.0 / Math.PI;
    }

    static get deg2Rad() {
        return Math.PI / 180.0;
    }

    static approximate(v1, v2) {
        if (v1 > v2 - Number.EPSILON && v1 < v2 + Number.EPSILON)
            return true;

        return false;
    }

    static clamp(value, min, max) {
        let minVal = min;
        let maxVal = max;

        if (min > max) {
            minVal = max;
            maxVal = min;
        }

        if (value < minVal)
            return minVal;

        if (value > maxVal)
            return maxVal;

        return value;
    }

    static moveTowards(from, to, deltaTime) {
        if (Math.abs(from - to) <= deltaTime) return to;

        return from + ((to - from) * deltaTime);
    }
}