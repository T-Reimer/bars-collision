const width = 600;
const height = 500;

let list = [];
let projectiles = [];
let player;

let startingProb = 10000;
let prob = 99999;
let tick = 0;

function setup() {
    prob = startingProb - 1;
    createCanvas(width, height);
    background(127);

    player = new Player();

    if(!sessionStorage.highScore){
        sessionStorage.highScore = 0;
    }

    learningSetup();
}


function draw() {
    if (tick % 50 === 0) {
        if (random(startingProb) > prob && list.length < 10) {
            list.push(new Obstacle(random(width), random(width / 4)));
        } else {
            prob -= .5;
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

    learningTick();

    // player.targetX = mouseX;
    player.update();
    player.draw();
    text(player.score + " / " + sessionStorage.highScore, 20, 10, 200, 30);
}

function mousePressed(){
    player.shoot();
}

function restart(){
    noLoop();
    showStats();
    setTimeout(function(){
        list = [];
        projectiles = [];

        prob = startingProb - 1;

        player = new Player();

        loop();
        
    }, 250);
}

function showStats(){
    let text = player.score + " - " + player.tick;
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(text));

    let parent = document.getElementById("results");
    if(!parent){
        parent = document.createElement("p");
        parent.setAttribute("id", "results");
        document.body.appendChild(parent);
    }
    parent.insertBefore(div, parent.firstChild);
}