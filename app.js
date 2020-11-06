

const WIDTH = 960 * 2;
const HEIGHT = 540 * 2;
const loading = document.querySelector('.loading');
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '0xFFFFFF'
});

const activeObjects = {};

document.querySelector('.scene').append(app.view);
resize(app)();

const createModal = (text) => {
  const modal = new PIXI.Container();
  let type = '';
  modal.visible = false;
  modal.position.set(700, 260);
  modal.interactive = true;
  modal.buttonMode = true;
  modal.on('pointerover', () => {
    modal.children[1].tint = 0xecffa0;
    modal.children[0].tint = 0xc3c3c3;
  });
  modal.on('pointerout', () => {
    modal.children[1].tint = 0xffffff;
    modal.children[0].tint = 0xffffff;
  });

  let _polygon = new PIXI.Graphics();
  _polygon.beginFill(0xc3c3c3);
  _polygon.drawPolygon([
      0, 0, 800, 0, 800, 150, 2, 150, -20, 170, 0, 104
  ]);
  _polygon.endFill();
  _polygon.x = 4;
  _polygon.y = 10;
  modal.addChild(_polygon);

  let polygon = new PIXI.Graphics();
  polygon.beginFill(0xffffff);
  polygon.drawPolygon([
      0, 0, 800, 0, 800, 150, 2, 150, -20, 170, 0, 104
  ]);
  polygon.endFill();
  polygon.x = 0;
  polygon.y = 0;
  modal.addChild(polygon);

  let line = new PIXI.Graphics();
  line.lineStyle(4, 0x000000, 1);
  line.moveTo(0, 0);
  line.lineTo(800, 0);
  line.lineTo(800, 150);
  line.lineTo(2, 150);
  line.lineTo(-20, 170);
  line.lineTo(0, 104);
  line.lineTo(0, -2);
  line.x = 0;
  line.y = 0;
  modal.addChild(line);

  let style = new PIXI.TextStyle({
    fontFamily: "monospace",
    fontSize: 56,
    fill: "black",
  });
  let styleYesAndNo = new PIXI.TextStyle({
    fontFamily: "monospace",
    fontSize: 56,
    fill: "white",
    stroke: '#000000',
    strokeThickness: 5,
  });
  let message = new PIXI.Text(text, style);
  message.position.set(10, 10);

  let yes = new PIXI.Text('Yes', styleYesAndNo);
  yes.position.set(580, 80);
  yes.interactive = true;
  yes.buttonMode = true;
  yes.on('pointerdown', () => {
    if (activeObjects['player'][type]) {
      activeObjects['player'].typeEvent = type;
      activeObjects['player'][type]();
    }
    modalToggle();
  });
  yes.on('pointerover', () => {
    yes.tint = 0x23ff7b;
  });
  yes.on('pointerout', () => {
    yes.tint = 0xffffff;
  });

  let no = new PIXI.Text('No', styleYesAndNo);
  no.position.set(720, 80);
  no.interactive = true;
  no.buttonMode = true;
  no.on('pointerdown', () => {
    modalToggle();
  });
  no.on('pointerover', () => {
    no.tint = 0xf91329;
  });
  no.on('pointerout', () => {
    no.tint = 0xffffff;
  });

  function modalToggle() {
    modal.visible = !modal.visible;
    modal.children[1].tint = 0xffffff;
    modal.children[0].tint = 0xffffff;
    no.tint = 0xffffff;
    yes.tint = 0xffffff;
  }
  function changeMessage(text, _type) {
    message.text = text;
    type = _type;
  }
  modal.addChild(message);
  modal.addChild(yes);
  modal.addChild(no);
  modal.modalToggle = modalToggle;
  modal.changeMessage = changeMessage;
  return modal;
}

const dialog = createModal('Hi!\nHow are you bro?');

function loadProgressHandler(loader, resource) { 
  loading.innerHTML = `progress: ${loader.progress}%`;
}
app.loader.onProgress.add(loadProgressHandler);
app.loader
  .add('scene', './image/sc001.png')
  .add('notebook', './image/notebook.png')
  .add('workoutItems', './image/workoutItems.png')
  .add('painting', './image/painting.png')
  .add('ps4', './image/ps4.png')
  .add('sprite01', './image/sprite01_.png')
  .add('code', './image/code.png')
  .add('art', './image/art.png')
  .add('game', './image/game.png')
  .add('workout', './image/workout.png')
  .load(setup);

const range = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const createCharacter = (x, y, text) => {
  const characterSheetStart = function() {
    let characterSheet = {};
    let sheet = new PIXI.BaseTexture.from(app.loader.resources.sprite01.url);
    let w = 335;
    let h = 342;
    characterSheet['sit'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
    ];
    characterSheet['hello'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
    ];
    return characterSheet;
  }();

  const characterSheetCode = function() {
    let characterSheet = {};
    let sheet = new PIXI.BaseTexture.from(app.loader.resources.code.url);
    let w = 574;
    let h = 568;
    characterSheet['code'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
    ];
    return characterSheet;
  }();

  const characterSheetArt = function() {
    let characterSheet = {};
    let sheet = new PIXI.BaseTexture.from(app.loader.resources.art.url);
    let w = 279;
    let h = 465;
    characterSheet['art'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      
    ];
    return characterSheet;
  }();
  
  const characterSheetWorkout = function() {
    let characterSheet = {};
    let sheet = new PIXI.BaseTexture.from(app.loader.resources.workout.url);
    let w = 722;
    let h = 702;
    characterSheet['workout'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      
    ];
    return characterSheet;
  }();

  const characterSheetGame = function() {
    let characterSheet = {};
    let sheet = new PIXI.BaseTexture.from(app.loader.resources.game.url);
    let w = 307;
    let h = 399;
    characterSheet['game'] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0 * h, w, h)),
      
    ];
    return characterSheet;
  }();
  
  const character = new PIXI.AnimatedSprite(characterSheetStart.sit);
  character.typeEvent = '';
  character.animationSpeed = 0.12;
  character.loop = false;
  character.activeOn = false;
  character.anchor.set(0.5, 0.5);
  character.position.set(x, y);
  character.interactive = true;
  character.buttonMode = true;
  character.on('pointerdown', () => {
    character.textures = characterSheetStart.hello;
    character.play();
  });
  // character.on('pointerover', () => {
  
  // });
  // character.on('pointerout', () => {
  
  // });

  character.onComplete = () => {
    if (character.typeEvent === 'workout' && activeObjects.workout) {
      activeObjects.workout.textures = activeObjects.workout.sheet.off;
    } else if (character.typeEvent === 'art' && activeObjects.art) {

      if (typeof activeObjects.art.checkedArt === 'undefined') {
        activeObjects.art.checkedArt = -1;
      }
      activeObjects.art.checkedArt === 3 ? activeObjects.art.checkedArt = 0 : activeObjects.art.checkedArt += 1;

      activeObjects.art.textures = activeObjects.art.sheet[activeObjects.art.checkedArt];
    } else if (character.typeEvent === 'game' && activeObjects.game) {
      activeObjects.game.textures = activeObjects.game.sheet.off;
      activeObjects.code.loop = false;
      activeObjects.code.stop();
    } else if (character.typeEvent === 'code' && activeObjects.code) {
      activeObjects.code.loop = false;
      activeObjects.code.stop();
      activeObjects.code.textures = activeObjects.code.sheet.off;
    }
    character.position.set(x, y);
    character.textures = characterSheetStart.sit;
    character.stop();
    character.typeEvent = '';
  }
  const code = () => {
    character.position.set(WIDTH - 574 / 2, 625);
    character.textures = characterSheetCode.code;
    character.play();
  }
  character.code = code;

  const art = () => {
    if (activeObjects.art) {
      activeObjects.art.textures = activeObjects.art.sheet.off;
    }
    character.position.set(WIDTH / 2 + 40, 620);
    character.textures = characterSheetArt.art;
    character.play();
  }
  character.art = art;

  const workout = () => {
    if (activeObjects.workout) {
      activeObjects.workout.textures = activeObjects.workout.sheet.on;
    }
    character.position.set(WIDTH / 2 + 200, HEIGHT - 400);
    character.textures = characterSheetWorkout.workout;
    character.play();
  }
  character.workout = workout;

  const game = () => {
    if (activeObjects.game) {
      activeObjects.game.textures = activeObjects.game.sheet.on;
      activeObjects.game.loop = true;
      activeObjects.game.play();
    }
    character.position.set(WIDTH / 2 - 480, HEIGHT - 260);
    character.textures = characterSheetGame.game;
    character.play();
  }
  character.game = game;

  app.stage.addChild(character);
  return character;
}

const createAnimationElement = (sheet, x, y, text, type) => {
  const animationElement = new PIXI.AnimatedSprite(sheet.off);
  animationElement.sheet = sheet;
  animationElement.animationSpeed = 0.12;
  animationElement.loop = false;
  animationElement.activeOn = false;
  animationElement.anchor.set(0.5, 0.5);
  animationElement.position.set(x, y);
  animationElement.interactive = true;
  animationElement.buttonMode = true;
  animationElement.on('pointerdown', () => {
    dialog.modalToggle();
    if (text) {
      dialog.changeMessage(text, type);
    }
  });
  animationElement.on('pointerover', () => {
    if (type === 'art' && activeObjects.art.checkedArt >= 0) {
      animationElement.textures = sheet[`${activeObjects.art.checkedArt}_`];
    } else {
      animationElement.textures = sheet.over;
    }
    animationElement.angle = range(-4, 4);
  });
  animationElement.on('pointerout', () => {
    if (type === 'art' && activeObjects.art.checkedArt >= 0) {
      animationElement.textures = sheet[activeObjects.art.checkedArt];
    } else {
      animationElement.textures = sheet.off;
    }
    animationElement.angle = 0;
  });
  app.stage.addChild(animationElement);
  return animationElement;

}

function setup() {
  loading.style.display = 'none';
  let scene = new PIXI.Sprite(app.loader.resources.scene.texture);
  app.stage.addChild(scene);

  let codeSheets = {};
  let codeSheet = new PIXI.BaseTexture.from(app.loader.resources.notebook.url);
  let wCode = 317;
  let hCode = 252;
  codeSheets['off'] = [
    new PIXI.Texture(codeSheet, new PIXI.Rectangle(0 * wCode, 0 * hCode, wCode, hCode)),
  ];
  codeSheets['over'] = [
    new PIXI.Texture(codeSheet, new PIXI.Rectangle(1 * wCode, 0 * hCode, wCode, hCode)),
  ];
  codeSheets['on'] = [
    new PIXI.Texture(codeSheet, new PIXI.Rectangle(2 * wCode, 0 * hCode, wCode, hCode)),
    new PIXI.Texture(codeSheet, new PIXI.Rectangle(3 * wCode, 0 * hCode, wCode, hCode)),
    new PIXI.Texture(codeSheet, new PIXI.Rectangle(2 * wCode, 0 * hCode, wCode, hCode)),
    new PIXI.Texture(codeSheet, new PIXI.Rectangle(3 * wCode, 0 * hCode, wCode, hCode))
  ];

  let workoutSheets = {};
  let workoutSheet = new PIXI.BaseTexture.from(app.loader.resources.workoutItems.url);
  let wWorkout = 432;
  let hWorkout = 232;
  workoutSheets['off'] = [
    new PIXI.Texture(workoutSheet, new PIXI.Rectangle(0 * wWorkout, 0 * hWorkout, wWorkout, hWorkout)),
  ];
  workoutSheets['over'] = [
    new PIXI.Texture(workoutSheet, new PIXI.Rectangle(1 * wWorkout, 0 * hWorkout, wWorkout, hWorkout)),
  ];
  workoutSheets['on'] = [
    new PIXI.Texture(workoutSheet, new PIXI.Rectangle(2 * wWorkout, 0 * hWorkout, wWorkout, hWorkout)),
  ];
  
  let artSheets = {};
  let artSheet = new PIXI.BaseTexture.from(app.loader.resources.painting.url);
  let wArt = 275;
  let hArt = 426;
  artSheets['off'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(0 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['over'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(1 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['0'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(2 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['1'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(4 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['2'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(6 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['3'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(8 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['0_'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(3 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['1_'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(5 * wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['2_'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(7* wArt, 0 * hArt, wArt, hArt)),
  ];
  artSheets['3_'] = [
    new PIXI.Texture(artSheet, new PIXI.Rectangle(9 * wArt, 0 * hArt, wArt, hArt)),
  ];
  
  let gameSheets = {};
  let gameSheet = new PIXI.BaseTexture.from(app.loader.resources.ps4.url);
  let wGame = 323;
  let hGame = 273;
  gameSheets['off'] = [
    new PIXI.Texture(gameSheet, new PIXI.Rectangle(0 * wGame, 0 * hGame, wGame, hGame)),
  ];
  gameSheets['over'] = [
    new PIXI.Texture(gameSheet, new PIXI.Rectangle(1 * wGame, 0 * hGame, wGame, hGame)),
  ];
  gameSheets['on'] = [
    new PIXI.Texture(gameSheet, new PIXI.Rectangle(2 * wGame, 0 * hGame, wGame, hGame)),
    new PIXI.Texture(gameSheet, new PIXI.Rectangle(3 * wGame, 0 * hGame, wGame, hGame)),
    new PIXI.Texture(gameSheet, new PIXI.Rectangle(4 * wGame, 0 * hGame, wGame, hGame)),
    new PIXI.Texture(gameSheet, new PIXI.Rectangle(5 * wGame, 0 * hGame, wGame, hGame)),
  ];
  
  const code = createAnimationElement(codeSheets, WIDTH - 280, HEIGHT / 2 - 1, 'Time to coding!', 'code');
  activeObjects['code'] = code;
  const art = createAnimationElement(artSheets, WIDTH / 2 + 60,  610, 'Make art great again!', 'art');
  activeObjects['art'] = art;
  const game = createAnimationElement(gameSheets, 180, HEIGHT - 220, 'Go to play!', 'game');
  activeObjects['game'] = game;
  const player = createCharacter(640, HEIGHT / 2 + 30);
  activeObjects['player'] = player;
  const workout = createAnimationElement(workoutSheets, WIDTH - 240, HEIGHT - 120, 'Maybe do workout?', 'workout');
  activeObjects['workout'] = workout;

  app.stage.addChild(dialog);
  // console.log(activeObjects);
}


function resize(app){
  return function () {
    const vpw = window.innerWidth;  
    const vph = window.innerHeight; 
    let nvw; 
    let nvh;
    if (vph / vpw < HEIGHT / WIDTH) {
      nvh = vph;
      nvw = (nvh * WIDTH) / HEIGHT;
    } else {
      nvw = vpw;
      nvh = (nvw * HEIGHT) / WIDTH;
    }
    app.renderer.resize(nvw, nvh);
    app.stage.scale.set(nvw / WIDTH, nvh / HEIGHT);
  };
}

window.addEventListener("resize", resize(app));
