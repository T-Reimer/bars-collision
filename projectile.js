function Projectile(player) {
    this.width = 2;
    this.height = 15;

    this.player = player;

    this.x = player.x - (this.width / 2);
    this.y = player.y;

    this.speed = 5;
    this.damage = 15;
}

Projectile.prototype.update = function () {
    this.y -= this.speed;

    for (let i = list.length - 1; i >= 0; i--) {
        let obj = list[i];

        // remove the item from list
        if (this.collide(obj)) {
            // list.splice(i, 1);
            obj.width -= this.damage;
            obj.x += this.damage / 2;
            if (obj.width < 2) {
                list.splice(i, 1);
            }
            this.remove();
            if(!this.player.died){
                this.player.score++;
            }
        }
    }

};

Projectile.prototype.remove = function () {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let obj = projectiles[i];
        // remove the item from list
        if (obj === this) {
            projectiles.splice(i, 1);
        }
    }
};

Projectile.prototype.draw = function () {
    rect(this.x, this.y, this.width, this.height);
};

Projectile.prototype.collide = function (obj) {
    let top = obj.y;
    let bottom = obj.y + obj.height;

    let left = obj.x;
    let right = obj.x + obj.width;

    if (left < this.x && right > this.x) {
        if (top < this.y && bottom > this.y) {
            return true;
        }
    }
    return false;
};