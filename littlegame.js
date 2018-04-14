PIXI.utils.sayHello();
//const socket = io.connect('http://89.173.200.63:8070');

var renderer = PIXI.autoDetectRenderer(748, 480, {  // toto je stvorec v ktorom je canvas
  transparent: true,
  resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container();
var loader = new PIXI.loaders.Loader();

loader.add('sprite', 'images/Sheet1.png')
  .add('exoWalkJson', 'images/ExoWalkTex.json')
  .load(setup);

var data = {user: "name"};

//socket.emit('onLoad', data);
//socket.on('onRefresh', function(data){
	//console.log(data);
//});

function setup() {
    stage.interactive = true;
    console.log('habbening');
	
	var rect = new PIXI.Rectangle( 0, 1002, 340, 174 );
	var exoId = loader.resources["exoWalkJson"].textures;
	var spritetexture = loader.resources["sprite"].texture;
        arrayFromAtlas = [];
	
	spritetexture.frame = rect;
	//secondtexture.frame = new PIXI.Rectangle( 0, 0, 340, 175 );

	for(x in exoId) {
        arrayFromAtlas.push(PIXI.Texture.fromFrame(x));
    }

	var exoSprite = new PIXI.extras.AnimatedSprite(arrayFromAtlas);
	exoSprite.anchor.set(0.4);
	exoSprite.animationSpeed = 0.5;
	exoSprite.scale.set(0.4, 0.4);
	exoSprite.x = 400;
    exoSprite.y = 305;
    exoSprite.play();
	//sprite.scale.set(0.5, 0.50);
	var arrayOfSprites = [];
	for (var i = 0; i < myJSON.layout[0].square.length; i++) {
	  arrayOfSprites[i] = new PIXI.Sprite(spritetexture);
	  arrayOfSprites[i].scale.set(0.5, 0.5);
	  arrayOfSprites[i].anchor.x = 0.5;
	  arrayOfSprites[i].anchor.y = 0.5;
	  arrayOfSprites[i].x = myJSON.layout[0].square[i].pos.x;
	  arrayOfSprites[i].y = myJSON.layout[0].square[i].pos.y;
	  stage.addChild(arrayOfSprites[i])
	}

	var rectangleType = myJSON.layout[0].type;
	var groundRect = new PIXI.Rectangle(types[rectangleType].baseX, types[rectangleType].baseY, 200, 110)
	var arrayOfGrass = [];
	var groundtexture = new PIXI.Texture(spritetexture.baseTexture, groundRect);
	//groundtexture.frame = groundRect;
	for (var i = 0; i < myJSON.layout[0].square.length; i++) {
	  arrayOfGrass[i] = new PIXI.Sprite(groundtexture);
	  //arrayOfSprites[i].scale.set(0.5, 0.5);
	  arrayOfGrass[i].anchor.x = 0.5;
	  arrayOfGrass[i].anchor.y = 0.5;
	  arrayOfGrass[i].x = myJSON.layout[0].square[i].pos.x;
	  arrayOfGrass[i].y = myJSON.layout[0].square[i].pos.y;
	  arrayOfGrass[i].interactive = true;
	  arrayOfGrass[i].clickCounter = 0;
	  arrayOfGrass[i].click = function() {
		if (this.clickCounter >= 3) {
		  this.clickCounter = 0;
		  this.visible = false;
		}
		this.clickCounter += 1;
	  };
	  stage.addChild(arrayOfGrass[i]);
	}

    stage.addChild(exoSprite);

    function animationLoop() {

        requestAnimationFrame(animationLoop);

        function exoMover() {
            if (exoSprite.x <= 125 || exoSprite.y <= 90) {
                exoSprite.x = 400;
                exoSprite.y = 305;
            } else {
                exoSprite.x -= 0.2;
                exoSprite.y -= 0.1;
            }
        }

        exoMover();
        renderer.render(stage);
    }

    animationLoop();
}



const types = {
    2: {baseX: 525, baseY: 1104}
};

const myJSON = { layout:
   [ { idx: { x: 0, y: 0 },
       pos: { x: 15, y: 240 },
       type: 2,
       oid: '00',
       square:
        [ { pos: { x: 325, y: 130 },
            idx: { x: 1, y: 1 },
            oid: '0011',
            type: 10010103,
            rm: false,
            hw: true },
          { pos: { x: 250, y: 170 },
            idx: { x: 1, y: 2 },
            oid: '0012',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 175, y: 210 },
            idx: { x: 1, y: 3 },
            oid: '0013',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 400, y: 170 },
            idx: { x: 2, y: 1 },
            oid: '0021',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 325, y: 210 },
            idx: { x: 2, y: 2 },
            oid: '0022',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 250, y: 250 },
            idx: { x: 2, y: 3 },
            oid: '0023',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 475, y: 210 },
            idx: { x: 3, y: 1 },
            oid: '0031',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 400, y: 250 },
            idx: { x: 3, y: 2 },
            oid: '0032',
            type: 10010103,
            rm: false,
            hw: false },
          { pos: { x: 320, y: 290 },
            idx: { x: 3, y: 3 },
            oid: '0033',
            type: 10010103,
            rm: false,
            hw: false } ] } ] }

            // ⠰⡿⠿⠛⠛⠻⠿⣷
            // ⠀⠀⠀⠀⠀⠀⣀⣄⡀⠀⠀⠀⠀⢀⣀⣀⣤⣄⣀⡀
            // ⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠛⠛⣿⣿⣿⡛⠿⠷
            // ⠀⠀⠀⠀⠀⠘⠿⠿⠋⠀⠀⠀⠀⠀⠀⣿⣿⣿⠇
            // ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁
            //
            // ⠀⠀⠀⠀⣿⣷⣄⠀⢶⣶⣷⣶⣶⣤⣀
            // ⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠈⠙⠻⠗
            // ⠀⠀⠀⣰⣿⣿⣿⠀⠀⠀⠀⢀⣀⣠⣤⣴⣶⡄
            // ⠀⣠⣾⣿⣿⣿⣥⣶⣶⣿⣿⣿⣿⣿⠿⠿⠛⠃
            // ⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄
            // ⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡁
            // ⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁
            // ⠀⠀⠛⢿⣿⣿⣿⣿⣿⣿⡿⠟
            // ⠀⠀⠀⠀⠀⠉⠉⠉
