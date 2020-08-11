export default  class Vector2{
    
    constructor(x = 0.0, y = 0.0){
       this.x = x;
       this.y = y;
   }

   static get zero()    { return  new Vector2( 0.0,  0.0); }
   static get one()     { return  new Vector2( 1.0,  1.0); }
   static get up()      { return  new Vector2( 0.0,  1.0); }
   static get down()    { return  new Vector2( 0.0, -1.0); }
   static get left()    { return  new Vector2(-1.0,  0.0); }
   static get right()   { return  new Vector2( 1.0,  0.0); }

   static add(v1, v2){
    let v = new Vector2(0.0, 0.0);
       v.x = v1.x + v2.x;
       v.y = v1.y + v2.y;

       return v;
   }

   static subtract(v1, v2){
    let v = new Vector2(0.0, 0.0);
       v.x = v1.x - v2.x;
       v.y = v1.y - v2.y;

       return v;
   }

   static multiply(v1, v2){
    let v = new Vector2(0.0, 0.0);
       v.x = v1.x * v2.x;
       v.y = v1.y * v2.y;

       return v;
   }


   static addScalar(v1, scalar){
    let v = new Vector2(0.0, 0.0);
       v.x = v1.x + scalar;
       v.y = v1.y + scalar;

       return v;
   }

   static subtractScalar(v1, v2){
    let v = new Vector2(0.0, 0.0, 0.0);
       v.x = v1.x - scalar;
       v.y = v1.y - scalar;

       return v;
   }

   static multiplyScalar(v1, v2){
    let v = new Vector2(0.0, 0.0);
       v.x = v1.x * scalar;
       v.y = v1.y * scalar;

       return v;
   }

   static distance(v1, v2){
    let delta = Vector2.subtract(v2 - v1);
   
    let distance = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
   
       return distance;
   }

   static dot(v1, v2){
       return v1.x * v2.x + v1.y * v2.y;
   }
   
   length(){
       return Math.sqrt(this.x * this.x + this.y * this.y);
   }

   magnitude(){
       return length();
   }

   normalize(){
    let mag = this.magnitude();
       
       if (MathTools.approximate(magnitude, 0.0)){
           this.x = 0.0;
           this.y = 0.0;
           this.z = 0.0;

           return;
       }

       this.x /= mag;
       this.y /= mag;
       this.z /= mag;
   }
   
   toString(){
       return '( x: ' + this.x + '  y: ' + this.y + '  z: ' + this.z + ' )';
   }

}