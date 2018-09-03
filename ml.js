/**
 * player functions
 * 
 * move left / right
 * 
 * shoot
 * 
 */

// const inputLayer = tf.input({shape: [5]});

const NEURONS = 18;
 
const hiddenLayer = tf.layers.dense({
    units: NEURONS,
    inputShape: [10, 3],
    activation: 'sigmoid',
    kernelInitializer: 'leCunNormal',
    useBias: true,
    biasInitializer: 'randomNormal',
});
 
const outputLayer = tf.layers.dense({
    units: 1,
});

const model = tf.sequential();
 
// model.add(inputLayer);
model.add(hiddenLayer);
model.add(outputLayer);


model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

function predict(){

    model.predict(tf.ones([null, 2]))

    // return tf.tidy(() =>  {
    //     return tensor.add(tf.randomUniform(tensor.shape, 0, width));
    // });    
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