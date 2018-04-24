const socket = io.connect('http://89.173.200.63:8070'); // hladas login page? 8090 senpai...

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
    // exoSprite.onLoop( console.log("I just loop a dooped") );
    exoSprite.play();
    animationQueue.push(jsonData.layout[0].scenar[0]);
}

function exoMover(exoSprite) {               // chooses which animation to play, based on script

    let direction = jsonData.layout[0].scenar[0].direction;

    switch (jsonData.layout[0].scenar[0].action) {

        case 5:                                     // idle
            exoSprite.xv = 0;
            exoSprite.yv = 0;
            break;

        case 1 :                                //vysunutie pil do polohy 1
            switch (direction) {

                case 1:
                    exoSprite.textures = texturesObject.exoCutIdleClose1;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 2:
                    exoSprite.textures = texturesObject.exoCutIdleClose2;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 3:
                    exoSprite.textures = texturesObject.exoCutIdleClose3;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 4:
                    exoSprite.textures = texturesObject.exoCutIdleClose4;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
            }
            break;

        case 2 :                                                        // vysunutie pil do polohy 2
            switch (direction) {

                case 1:
                    exoSprite.textures = texturesObject.exoCutIdleClose1;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 2:
                    exoSprite.textures = texturesObject.exoCutIdleClose2;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 3:
                    exoSprite.textures = texturesObject.exoCutIdleClose3;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 4:
                    exoSprite.textures = texturesObject.exoCutIdleClose4;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
            }
            break;

        case 3 :                                                             // vysunutie pil do polohy 3
            switch (direction) {

                case 1:
                    exoSprite.textures = texturesObject.exoCutIdleClose1;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 2:
                    exoSprite.textures = texturesObject.exoCutIdleClose2;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 3:
                    exoSprite.textures = texturesObject.exoCutIdleClose3;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
                case 4:
                    exoSprite.textures = texturesObject.exoCutIdleClose4;
                    exoSprite.vx = 0;
                    exoSprite.vy = 0;
                    break;
            }
            break;

        case 4 :                                                // 4 – stiahnutie píl do polohy 0
                // << ?? << stiahnutie do nula z
            break;

        case 0 :                                                // 5 - krok v pred
            switch (direction) {

                case 1 :
                    exoSprite.textures = texturesObject.exoStep1;
                    exoSprite.xv = -0.2;
                    exoSprite.yv = -0.1;
                    break;
                case 2 :
                    exoSprite.textures = texturesObject.exoStep2;
                    exoSprite.xv = 0.2;
                    exoSprite.yv = -0.1;
                    break;
                case 3 :
                    exoSprite.xv = -0.2;
                    exoSprite.yv = 0.1;
                    exoSprite.textures = texturesObject.exoStep3;
                    break;
                case 4 :
                    exoSprite.xv = 0.2;
                    exoSprite.yv = 0.1;
                    exoSprite.textures = texturesObject.exoStep4;
                    break;
            }
            break;
        case 6 :        // RESERVE
            // do nothing
            break;
        case 7 :    // otočka o 90° clockwise
                    // najdi exoSprite.direction, zapni
            let reverseRight = texturesObject.exoTurnRight.slice().reverse();
            exoSprite.textures = reverseRight;
            exoSprite.vx = 0;
            exoSprite.vy = 0;
            break;
        case 8 :    // otočka o 90° counter-clock wise
            exoSprite.textures = texturesObject.exoTurnLeft;
            exoSprite.vx = 0;
            exoSprite.vy = 0;
            break;
        default:        // do nothing
            break;
    }
}

socket.emit('onLoad', sendData);
socket.on('onRefresh', function(data){
	if (refreshTracker === true) {  // check if an onRefresh already happened
        animationChanger(exoSprite, texturesObject);    // do something
        jsonData = data;
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
    }

	exoSprite = new PIXI.extras.AnimatedSprite(texturesObject.exoCutIdleFar1);
	exoSprite.anchor.set(0.4);
	exoSprite.interactive = true;
	exoSprite.move = function () {

	    exoSprite.x += exoSprite.xv;
	    exoSprite.y += exoSprite.yv;
    };
	function exoClick() {
	    console.log("click");
            socket.emit("onClick");
    }
	exoSprite.on("click", exoClick);
	exoSprite.loop = true;
    exoSprite.onComplete = function() { console.log("stahp") };
	exoSprite.animationSpeed = 0.6;
	exoSprite.scale.set(0.6, 0.6);
	exoSprite.xv = 0;
	exoSprite.yv = 0;
	exoSprite.direction = 1;
	exoSprite.x = 400;
    exoSprite.y = 305;

    exoSprite.play();

	var arrayOfSprites = [];
	for (var i = 0; i < jsonData.layout[0].square.length; i++) {
	  arrayOfSprites[i] = new PIXI.Sprite(spriteTexture);
	  arrayOfSprites[i].scale.set(0.7, 0.7);
	  arrayOfSprites[i].anchor.x = 0.5;
	  arrayOfSprites[i].anchor.y = 0.5;
	  arrayOfSprites[i].x = jsonData.layout[0].square[i].pos.x;
	  arrayOfSprites[i].y = jsonData.layout[0].square[i].pos.y;
	  ground.addChild(arrayOfSprites[i])
	}

	var rectangleType = jsonData.layout[0].type;
	var groundRect = new PIXI.Rectangle(types[rectangleType].baseX, types[rectangleType].baseY, 200, 110);
	var arrayOfGrass = [];
	var groundtexture = new PIXI.Texture(spriteTexture.baseTexture, groundRect);
	for (var i = 0; i < jsonData.layout[0].square.length; i++) {
	  arrayOfGrass[i] = new PIXI.Sprite(groundtexture);
	  arrayOfSprites[i].scale.set(0.5, 0.5);
	  arrayOfGrass[i].anchor.x = 0.5;
	  arrayOfGrass[i].anchor.y = 0.5;
	  arrayOfGrass[i].x = jsonData.layout[0].square[i].pos.x;
	  arrayOfGrass[i].y = jsonData.layout[0].square[i].pos.y;
	  arrayOfGrass[i].interactive = true;
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
