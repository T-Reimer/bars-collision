/**
 * create a obstacle in the canvas
 * 
 */
function Obstacle(x, w){
    this.x = x;
    this.y = 0;

    this.height = 20;
    this.width = w;

    this.speed = 1;

}

Obstacle.prototype.update = function(){
    this.y -= (this.speed * -1);
};

/**
 * draw on the canvas
 */
Obstacle.prototype.draw = function(){
    rect(this.x, this.y, this.width, this.height)
};