const socket = io.connect('http://89.173.200.63:8050');

var renderer = PIXI.autoDetectRenderer(748, 480, {  // toto je stvorec v ktorom je canvas
  transparent: true,
  resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container(),
ground = new PIXI.Container();
stage.addChild(ground);

var loader = new PIXI.loaders.Loader();

loader.add('sprite', 'images/Sheet1.png')      //load all the sprite sheet assets
    .add('exoStep1', 'images/ExoStep1/ExoStep1.json')
    .add('exoStep2', 'images/ExoStep2/ExoStep2.json')
    .add('exoStep3', 'images/ExoStep3/ExoStep3.json')
    .add('exoStep4', 'images/ExoStep4/ExoStep4.json')
    .add('exoTurnRight', 'images/ExoSpin12/ExoSpin12.json')
    .add('exoTurnLeft', 'images/ExoSpin23/ExoSpin23.json')
    .add('exoCutIdleClose1', 'images/ExoCutIdleClose1/ExoCutIdleClose1.json')
    .add('exoCutIdleClose3', 'images/ExoCutIdleClose3/ExoCutIdleClose3.json')
    .add('exoCutIdleFar1', 'images/ExoCutIdleFar1/ExoCutIdleFar1.json')
    .add('exoCutIdleFar3', 'images/ExoCutIdleFar3/ExoCutIdleFar3.json')
    .add('exoCuttingClose1', 'images/ExoCuttingClose1/ExoCuttingClose1.json')
    .add('exoCuttingClose3', 'images/ExoCuttingClose3/ExoCuttingClose3.json')
    .add('exoCuttingFar1', 'images/ExoCuttingFar1/ExoCuttingFar1.json')
    .add('exoCuttingFar3', 'images/ExoCuttingFar3/ExoCuttingFar3.json');

var jsonData = {};
var sendData = {user: "someGuy"},
    animationQueue = [],
    exoSprite = {},
    texturesObject = {},
    refreshTracker = false;

function refresh() {
    loader.load(setup);
}

function animationChanger(exoSprite) {

    exoMover(exoSprite);
    exoSprite.play();
    animationQueue.push(jsonData.layout[0].scenar[0]);
    console.log(animationQueue);
}

function exoMover(exoSprite) { // chooses which animation to play, based on script
    // if nothing, do idle,
    // if walk1 turn exoSprite texture to exoStep1
    switch (jsonData.layout[0].scenar[0].action) {
        case 5: // idle
            console.log("exo Mover case 0 fired");
            //let reverseRight = texturesObject.exoTurnRight.slice().reverse();
            //exoSprite.textures = reverseRight;
            //exoSprite.textures = texturesObject.exoStep1;
            exoSprite.xv = 0;
            exoSprite.yv = 0;
            break;
        case 1 :    //vysunutie pil do polohy 1
            console.log("exo Mover case 1 fired");
            exoSprite.textures = texturesObject.exoStep2;
            exoSprite.vx = 0.2;
            exoSprite.vy = -0.1;
            break;
        case 2 :    // vysunutie pil do polohy 2
            exoSprite.textures = exoTurnRightReverse;
            exoSprite.vx = 0;
            exoSprite.vy = 0;
            break;
        case 3 :    // vysunutie pil do polohy 3
            exoSprite.textures = texturesObject.exoTurnLeft;
            exoSprite.vx = 0;
            exoSprite.vy = 0;
            break;
        case 4 :    // 4 – stiahnutie píl do polohy 0
        exoSprite.textures = texturesObject.exoTurnLeft;
        exoSprite.vx = 0;
        exoSprite.vy = 0;
        break;
        case 0 :        // 5 - krok v pred
            console.log("exo Mover case 5 fired");
            console.log(jsonData.layout[0].scenar[0].direction);
            switch (jsonData.layout[0].scenar[0].direction) {
                case 1 :
                    exoSprite.textures = texturesObject.exoStep1;
                    exoSprite.xv = -0.2;
                    exoSprite.yv = -0.1;
                    //exoSprite.play();
                    break;
                case 2 :
                    exoSprite.textures = texturesObject.exoStep2;
                    exoSprite.xv = 0.2;
                    exoSprite.yv = -0.1;
                    //exoSprite.play();
                    break;
                case 3 :
                    exoSprite.xv = -0.2;
                    exoSprite.yv = 0.1;
                    exoSprite.textures = texturesObject.exoStep3;
                    //exoSprite.play();
                    break;
                case 4 :
                    exoSprite.xv = 0.2;
                    exoSprite.yv = 0.1;
                    exoSprite.textures = texturesObject.exoStep4;
                    //exoSprite.play();
                    break;
            }
            break;
        case 6 :        // RESERVE
            // do nothing
            break;
        case 7 :    // otočka o 90° clockwise
            exoSprite.textures = texturesObject.exoTurnLeft;
            exoSprite.vx = 0;
            exoSprite.vy = 0;
            break;
        case 8 :    // otočka o 90° counter-clock wise
            exoSprite.textures = texturesObject.exoTurnLeft;
            exoSprite.vx = 0;
            exoSprite.vy = 0;
            break;
        default:
            console.log("nothing happened");
            break;
    }
}

socket.emit('onLoad', sendData);
socket.on('onRefresh', function(data){
	if (refreshTracker === true) {  // check if an onRefresh already happened
        animationChanger(exoSprite, texturesObject);    // do something
    } else {
	    refreshTracker = true; // set tracker to true
        jsonData = data;        // write data to the script object
	    refresh();              // load the textures
    }
});

function setup() {
    stage.interactive = true;
	
	var rect = new PIXI.Rectangle( 0, 1002, 340, 174 );
	var spriteTexture = loader.resources["sprite"].texture;
	var loaderTextures = {
        exoStep1 : loader.resources["exoStep1"].textures,
        exoStep2 : loader.resources["exoStep2"].textures,
        exoStep3 : loader.resources["exoStep3"].textures,
        exoStep4 : loader.resources["exoStep4"].textures,
        exoTurnRight : loader.resources["exoTurnRight"].textures,
        exoTurnLeft : loader.resources["exoTurnLeft"].textures,
        exoCutIdleClose1: loader.resources["exoCutIdleClose1"].textures,
        exoCutIdleClose3: loader.resources["exoCutIdleClose3"].textures,
        exoCutIdleFar1: loader.resources["exoCutIdleFar1"].textures,
        exoCutIdleFar3: loader.resources["exoCutIdleFar3"].textures,
        exoCuttingClose1: loader.resources["exoCuttingClose1"].textures,
        exoCuttingClose3: loader.resources["exoCuttingClose3"].textures,
        exoCuttingFar1: loader.resources["exoCuttingFar1"].textures,
        exoCuttingFar3: loader.resources["exoCuttingFar3"].textures
    };
	 texturesObject =
     {
         idle: [],
         exoStep1 : [],
         exoStep2 : [],
         exoStep3 : [],
         exoStep4 : [],
         exoTurnRight : [],
         exoTurnLeft : [],
         exoCutIdleClose1 : [],
         exoCutIdleClose3 : [],
         exoCutIdleFar1 : [],
         exoCutIdleFar3 : [],
         exoCuttingClose1 : [],
         exoCuttingClose3 : [],
         exoCuttingFar1 : [],
         exoCuttingFar3 : [],
    };

    spriteTexture.frame = rect;
    for (let i in loaderTextures) {
        if (texturesObject.hasOwnProperty(i)) {
			let count = 0;
			for(let key in loaderTextures[i])
				if(loaderTextures[i].hasOwnProperty(key))
					count++;
			for(let key in loaderTextures[i]) {
				if(loaderTextures[i].hasOwnProperty(key)) {
					texturesObject[i].push(loaderTextures[i][key]);         // create a textures object, whose arrays hold the textures for each animation
				}
			}
        }
    };

	exoSprite = new PIXI.extras.AnimatedSprite(texturesObject.exoStep1);
	exoSprite.anchor.set(0.4);
	exoSprite.move = function () {

	    exoSprite.x += exoSprite.xv;
	    exoSprite.y += exoSprite.yv;
    }
	exoSprite.animationSpeed = 0.5;
	exoSprite.scale.set(0.4, 0.4);
	exoSprite.xv = 0;
	exoSprite.yv = 0;
	exoSprite.x = 400;
    exoSprite.y = 305;

    exoSprite.play();
	//sprite.scale.set(0.5, 0.50);

	var arrayOfSprites = [];
	for (var i = 0; i < jsonData.layout[0].square.length; i++) {
	  arrayOfSprites[i] = new PIXI.Sprite(spriteTexture);
	  arrayOfSprites[i].scale.set(0.5, 0.5);
	  arrayOfSprites[i].anchor.x = 0.5;
	  arrayOfSprites[i].anchor.y = 0.5;
	  arrayOfSprites[i].x = jsonData.layout[0].square[i].pos.x;
	  arrayOfSprites[i].y = jsonData.layout[0].square[i].pos.y;
	  ground.addChild(arrayOfSprites[i])
	}

	var rectangleType = jsonData.layout[0].type;
	var groundRect = new PIXI.Rectangle(types[rectangleType].baseX, types[rectangleType].baseY, 200, 110)
	var arrayOfGrass = [];
	var groundtexture = new PIXI.Texture(spriteTexture.baseTexture, groundRect);
	//groundtexture.frame = groundRect;
	for (var i = 0; i < jsonData.layout[0].square.length; i++) {
	  arrayOfGrass[i] = new PIXI.Sprite(groundtexture);
	  //arrayOfSprites[i].scale.set(0.5, 0.5);
	  arrayOfGrass[i].anchor.x = 0.5;
	  arrayOfGrass[i].anchor.y = 0.5;
	  arrayOfGrass[i].x = jsonData.layout[0].square[i].pos.x;
	  arrayOfGrass[i].y = jsonData.layout[0].square[i].pos.y;
	  arrayOfGrass[i].interactive = true;
	  arrayOfGrass[i].clickCounter = 0;
	  arrayOfGrass[i].click = function() {
		if (this.clickCounter >= 3) {
		  this.clickCounter = 0;
		  this.visible = false;
		}
		this.clickCounter += 1;
	  };
	  ground.addChild(arrayOfGrass[i]);
	}
    stage.addChild(exoSprite);

    function animationLoop() {

        exoSprite.move();
        requestAnimationFrame(animationLoop);


        renderer.render(stage);
    }

    animationLoop();
}

const types = {
    2: {baseX: 525, baseY: 1104}
};

// const jsonData = { layout:
//    [ { idx: { x: 0, y: 0 },
//        pos: { x: 15, y: 240 },
//        type: 2,
//        oid: '00',
//        square:
//         [ { pos: { x: 325, y: 130 },
//             idx: { x: 1, y: 1 },
//             oid: '0011',
//             type: 10010103,
//             rm: false,
//             hw: true },
//           { pos: { x: 250, y: 170 },
//             idx: { x: 1, y: 2 },
//             oid: '0012',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 175, y: 210 },
//             idx: { x: 1, y: 3 },
//             oid: '0013',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 400, y: 170 },
//             idx: { x: 2, y: 1 },
//             oid: '0021',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 325, y: 210 },
//             idx: { x: 2, y: 2 },
//             oid: '0022',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 250, y: 250 },
//             idx: { x: 2, y: 3 },
//             oid: '0023',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 475, y: 210 },
//             idx: { x: 3, y: 1 },
//             oid: '0031',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 400, y: 250 },
//             idx: { x: 3, y: 2 },
//             oid: '0032',
//             type: 10010103,
//             rm: false,
//             hw: false },
//           { pos: { x: 320, y: 290 },
//             idx: { x: 3, y: 3 },
//             oid: '0033',
//             type: 10010103,
//             rm: false,
//             hw: false } ] } ] }

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
