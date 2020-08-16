import Vector3 from './Vector3';
import MathTools from './MathTools';

export default class Quaternion {

    Quaternion(x = 0.0, y = 0.0, z = 0.0, w = 1.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    Normalize() {
        const scale = 1.0 / this.Length();
        this.x *= scale;
        this.y *= scale;
        this.z *= scale;
        this.w *= scale;
    }
    
    Inverse() {
        return new Quaternion(this.x, this.y, this.z, -this.w);
    }

    Negate() {
        return new Quaternion(-this.x, -this.y, -this.z, this.w);
    }

    Euler() {
        let v = new Vector3();

        v.y = Math.atan2(2.0 * this.w * this.y + 2.0 * this.z * this.x, 1.0 - 2.0 * (this.x * this.x + this.y * this.y)) * MathTools.rad2deg;
        v.x = Math.asin(2.0 * (this.w * this.x - this.y * this.z)) * MathTools.rad2deg;
        v.z = Math.atan2(2.0 * this.w * this.z + 2.0 * this.x * this.y, 1.0 - 2.0 * (this.z * this.z + this.x * this.x)) * MathTools.rad2deg;
        return v;
    }

    Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    LengthSquared() {
        return (this.x * this.x + this.y * this.y + this.z * this.z) + this.w * this.w;
    }
    
    static LookAt(sourcePoint, destPoint, up) {
        let forwardVector = Vector3.Normalize(destPoint - sourcePoint);

        let dot = Vector3.Dot(Vector3.forward, forwardVector);

        if (Math.abs(dot - (-1.0)) < 0.000001) {
            return Quaternion(Vector3.up.x, Vector3.up.y, Vector3.up.z, Math.PI);
        }
        if (Math.abs(dot - (1.0)) < 0.000001) {
            return Quaternion.Identity();
        }

        let rotAngle = Math.acosf(dot);
        let rotAxis = Vector3.Cross(forwardVector, up);
        rotAxis = Vector3.Normalize(rotAxis);
        return Quaternion.CreateFromAxisAngle(rotAxis, rotAngle);
    }

    static LookRotation(forward, up) {
        let frwd = Vector3.Normalize(forward);

        let vector = Vector3.Normalize(frwd);
        let vector2 = Vector3.Normalize(Vector3.Cross(up, vector));
        let vector3 = Vector3.Cross(vector, vector2);

        let m00 = vector2.x;
        let m01 = vector2.y;
        let m02 = vector2.z;
        let m10 = vector3.x;
        let m11 = vector3.y;
        let m12 = vector3.z;
        let m20 = vector.x;
        let m21 = vector.y;
        let m22 = vector.z;

        let num8 = (m00 + m11) + m22;
        let quaternion = new Quaternion();

        if (num8 > 0.0) {
            let num = Math.sqrt(num8 + 1.0);

            quaternion.w = num * 0.5;
            num = 0.5 / num;
            quaternion.x = (m12 - m21) * num;
            quaternion.y = (m20 - m02) * num;
            quaternion.z = (m01 - m10) * num;

            return quaternion;
        }
        if ((m00 >= m11) && (m00 >= m22)) {
            let num7 = Math.sqrt(((1.0 + m00) - m11) - m22);
            let num4 = 0.5 / num7;

            quaternion.x = 0.5 * num7;
            quaternion.y = (m01 + m10) * num4;
            quaternion.z = (m02 + m20) * num4;
            quaternion.w = (m12 - m21) * num4;

            return quaternion;
        }
        if (m11 > m22) {
            let num6 = Math.sqrt(((1.0 + m11) - m00) - m22);
            let num3 = 0.5 / num6;

            quaternion.x = (m10 + m01) * num3;
            quaternion.y = 0.5 * num6;
            quaternion.z = (m21 + m12) * num3;
            quaternion.w = (m20 - m02) * num3;

            return quaternion;
        }
        let num5 = Math.sqrt(((1.0 + m22) - m00) - m11);
        let num2 = 0.5 / num5;

        quaternion.x = (m20 + m02) * num2;
        quaternion.y = (m21 + m12) * num2;
        quaternion.z = 0.5 * num5;
        quaternion.w = (m01 - m10) * num2;

        return quaternion;
    }

    static RotatePointAroundPivot(point, pivot, maxRot) {
        return Quaternion.LookRotation(point - pivot, Vector3.up) * point;
    }

    static RotateAround(point, pivot) {
        let dir = point - pivot;
        dir = Quaternion.LookRotation(dir, Vector3.up) * dir;

        return dir + pivot;
    }

    static CreateFromAxisAngle(axis, angle) {
        let halfAngle = angle * 0.5;
        let s = Math.sin(halfAngle);
        let q = new Quaternion();
        q.x = axis.x * s;
        q.y = axis.y * s;
        q.z = axis.z * s;
        q.w = Math.cos(halfAngle);
        return q;
    }

    static FromEuler(x, y, z) {
        let yaw = y * MathTools.deg2rad;
        let pitch = x * MathTools.deg2rad;
        let roll = z * MathTools.deg2rad;

        let rollOver2 = roll * 0.5;
        let sinRollOver2 = Math.sin(rollOver2);
        let cosRollOver2 = Math.cos(rollOver2);
        let pitchOver2 = pitch * 0.5;
        let sinPitchOver2 = Math.sin(pitchOver2);
        let cosPitchOver2 = Math.cos(pitchOver2);
        let yawOver2 = yaw * 0.5;
        let sinYawOver2 = Math.sin(yawOver2);
        let cosYawOver2 = Math.cos(yawOver2);
        let result = new Quaternion();
        result.w = cosYawOver2 * cosPitchOver2 * cosRollOver2 + sinYawOver2 * sinPitchOver2 * sinRollOver2;
        result.x = cosYawOver2 * sinPitchOver2 * cosRollOver2 + sinYawOver2 * cosPitchOver2 * sinRollOver2;
        result.y = sinYawOver2 * cosPitchOver2 * cosRollOver2 - cosYawOver2 * sinPitchOver2 * sinRollOver2;
        result.z = cosYawOver2 * cosPitchOver2 * sinRollOver2 - sinYawOver2 * sinPitchOver2 * cosRollOver2;

        return result;
    }

    static Dot(q1, q2) {
        return q1.x * q2.x + q1.y * q2.y + q1.z * q2.z + q1.w * q2.w;
    }

    static Slerp(from, to, t) {
        return Quaternion.SlerpUnclamped(from, to, t);
    }

    static Normalize(q) {
        let q1 = q;
        let scale = 1.0 / q1.Length();
        q1.x *= scale;
        q1.y *= scale;
        q1.z *= scale;
        q1.w *= scale;

        return q1;
    }

    static Identity() {
        return new Quaternion(0.0, 0.0, 0.0, 1.0);
    }
}