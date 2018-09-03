/**
 * player functions
 * 
 * move left / right
 * 
 * shoot
 * 
 */

const NEURONS = 6;
 
const hiddenLayer = tf.layers.dense({
    units: NEURONS,
    inputShape: [2],
    activation: 'sigmoid',
    kernelInitializer: 'leCunNormal',
    useBias: true,
    biasInitializer: 'randomNormal',
});
 
const outputLayer = tf.layers.dense({
    units: 1,
});

const model = tf.sequential();
 
model.add(hiddenLayer);
model.add(outputLayer);


model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

function predict(){
    return tf.tidy(() =>  {
        return tensor.add(tf.randomUniform(tensor.shape, min, max));
    });    
}

function learningSetup(){
    
}

function learningTick(){

    let shoot = random(1);
    let target = random(width);
    player.targetX = target;
    // player.targetX = mouseX;

    if(shoot > .5){
        player.shoot();
    }

}