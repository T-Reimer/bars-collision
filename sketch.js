const width = 600;
const height = 500;

let list = [];
let projectiles = [];
let player;

function setup() {
    createCanvas(width, height);
    background(127);

    player = new Player();

    if(!sessionStorage.highScore){
        sessionStorage.highScore = 0;
    }
}

let prob = 99999;
let tick = 0;

function draw() {
    if (tick % 50 === 0) {
        if (random(100000) > prob) {
            list.push(new Obstacle(random(width), random(width / 4)));
        } else {
            prob--;
        }
    }

    background(127);

    for (let i = list.length - 1; i >= 0; i--) {
        let obs = list[i];

        obs.update();
        obs.draw();
        // remove the item from list
        if (obs.y > height) {
            list.splice(i, 1);
        }
    }

    for (let i = projectiles.length - 1; i >= 0; i--) {
        let obj = projectiles[i];

        obj.update();
        obj.draw();
        // remove the item from list
        if (obj.y > height || obj.y < (0 - obj.height)) {
            projectiles.splice(i, 1);
        }
    }

    player.targetX = mouseX;
    player.update();
    player.draw();
    text(player.score + " / " + sessionStorage.highScore, 20, 10, 200, 30);
}

function mousePressed(){
    player.shoot();
}