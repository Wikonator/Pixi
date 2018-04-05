PIXI.utils.sayHello();

var renderer = PIXI.autoDetectRenderer(512, 512, {  // toto je stvorec v ktorom je canvas
  transparent: true,
  resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
  .add("sprite", "images/Sheet1.png")
  .load(setup);

  var sprite;


function setup() {
    stage.interactive = true;

    var rect = new PIXI.Rectangle( 0, 1002, 340, 174 );
    var texture = PIXI.loader.resources["sprite"].texture;
    texture.frame = rect;

    //sprite.scale.set(0.5, 0.50);

    sprite = new PIXI.Sprite(texture);
    stage.addChild(sprite);
      renderer.render(stage);
    //sprite.x = 370;
    sprite.vx = 7;
    sprite.vy = 0;


    sprite.scale.set(0.4, 0.4)


//    animationLoop();

}

/*function animationLoop() {
  requestAnimationFrame(animationLoop);



}*/
