function Player (){
    this.width = 20;
    this.height = 20;

    this.x = (width / 2) - (this.width / 2);
    this.y = height - 20;

    this.score = 0;
    this.died = false;

    this.tick = 0;
    this.lastShot = 0;
}

Player.prototype.update = function(){
    
    // this.x = mouseX;
    let easing = 0.04;

    let targetX = this.targetX;
    let dX = targetX - this.x;

    this.x = this.x + dX * easing;

    this.x = constrain(this.x, (this.width/2), width - (this.width/2));

    for (let i = list.length - 1; i >= 0; i--) {
        let obj = list[i];

        // remove the item from list
        if (this.collide(obj)) {
            this.died = true;
            // console.log("died");
            restart();
            // alert("You died with a score of " + this.score);
        }
    }
    if(!this.died){
        this.tick++;
        if(this.tick % 100 === 0){
            this.score++;
        }
    }
    if(sessionStorage.highScore < this.score){
        sessionStorage.highScore = this.score;
    }
};

Player.prototype.draw = function(){
    // ellipse(this.x, this.y, this.width, this.height);

    triangle(this.x, this.y,
        this.x + (this.width / 2), this.y + this.height,
        this.x - (this.width / 2), this.y + this.height);
};

Player.prototype.shoot = function(){
    if(this.lastShot + 10 < this.tick && !this.died){
        this.lastShot = this.tick;
        let proj = new Projectile(this);
        projectiles.push(proj);
    }
}

Player.prototype.collide = function (obj) {
    let top = obj.y;
    let bottom = obj.y + obj.height;

    let left = obj.x;
    let right = obj.x + obj.width;

    if (left < this.x + (this.width/2) && right > this.x - (this.width/2)) {
        if (top < this.y && bottom > this.y - (this.height/2)) {
            return true;
        }
    }
    return false;
};