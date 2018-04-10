PIXI.utils.sayHello();

var renderer = PIXI.autoDetectRenderer(748, 480, {  // toto je stvorec v ktorom je canvas
  transparent: true,
  resolution: 1
});

document.getElementById('display').appendChild(renderer.view);

var stage = new PIXI.Container();

console.log("I happen");
      PIXI.loader
        .add(["images/Sheet1.png", "images/exoWalkSheetTextures.png", "images/exoWalkSheetJson.json"])
        .on('complete', lockedAndLoaded)

function lockedAndLoaded() {
        console.log("locking");
        PIXI.loader.load(setup);
        console.log("loading");
}


  var sprite; //   525 1104


function setup() {
    stage.interactive = true;

        var rect = new PIXI.Rectangle( 0, 1002, 340, 174 );

        var texture = PIXI.loader.resources["images/Sheet1.png"].texture;
        var exoTexture = PIXI.loader.resources["images/exoWalkSheetTextures.png"].texture;
        var exoId = PIXI.loader.resources["images/exoWalkSheetJson.json"].textures;
        console.log(exoId);
        texture.frame = rect;

        //sprite.scale.set(0.5, 0.50);
        var arrayOfSprites = [];
        for (var i = 0; i < JSON.layout[0].square.length; i++) {
          arrayOfSprites[i] = new PIXI.Sprite(texture);
          arrayOfSprites[i].scale.set(0.5, 0.5);
          arrayOfSprites[i].anchor.x = 0.5;
          arrayOfSprites[i].anchor.y = 0.5;
          arrayOfSprites[i].x = JSON.layout[0].square[i].pos.x;
          arrayOfSprites[i].y = JSON.layout[0].square[i].pos.y;
          stage.addChild(arrayOfSprites[i])
        }

      //for (var i = 0; )

        var rectangleType = JSON.layout[0].type;
        var groundRect = new PIXI.Rectangle(types[rectangleType].baseX, types[rectangleType].baseY, 200, 110)
        var arrayOfGrass = [];
        var GroundTexture = new PIXI.Texture(texture.baseTexture, groundRect);
        //GroundTexture.frame = groundRect;
        for (var i = 0; i < JSON.layout[0].square.length; i++) {
          arrayOfGrass[i] = new PIXI.Sprite(GroundTexture);
          //arrayOfSprites[i].scale.set(0.5, 0.5);
          arrayOfGrass[i].anchor.x = 0.5;
          arrayOfGrass[i].anchor.y = 0.5;
          arrayOfGrass[i].x = JSON.layout[0].square[i].pos.x;
          arrayOfGrass[i].y = JSON.layout[0].square[i].pos.y;
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
        var sprite = new PIXI.Sprite(
          exoId["01.002_00000.png"]
        );
        stage.addChild(sprite);




    animationLoop();

}

function animationLoop() {
  requestAnimationFrame(animationLoop);
    renderer.render(stage);
}

const types = {
    2: {baseX: 525, baseY: 1104}
};

const JSON = { layout:
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
          { pos: { x: 320, y: 285 },
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
