var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 1000 }
        }
    },
    scene: [{
        preload: preload,
        create: create,
        update: update
    }]
};

var game = new Phaser.Game(config);

var jugador;

var arriba,derecha,izquierda;

const velocidad = 350;
const alturaSalto = -530;

var mapa, bullets, firebutton; 
var solidos, x, global_wall;
var wall=[];
function preload() {
    this.load.spritesheet('personaje1', 'assets/sprites/personaje1.png', { frameWidth: 57, frameHeight: 62 });

    this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
    this.load.image('tiles','assets/mapa/tileSets.png');
	this.load.image('bullet','assets/bullet.png');
	this.load.image('estrella','assets/star.png');
	//this.load.image('bullet','assets/bullet.png', { frameWidth: 14, frameHeight: 14 });
	
	this.load.image('ground', 'assets/platform.png');
	this.load.image('ground2', 'assets/platform2.png');
}

function create() {
    game.config.backgroundColor.setTo(108, 210, 222);

    mapa = this.make.tilemap({ key: 'mapa' });
    var tilesets = mapa.addTilesetImage('tileSets', 'tiles');

    var nubes = mapa.createDynamicLayer('nubes', tilesets, 0, 0);

    solidos = mapa.createDynamicLayer('solidos', tilesets, 0, 0);
    solidos.setCollisionByProperty({ solido: true });
	
	
	    platforms = this.physics.add.staticGroup();

      //  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
		platforms.create(600, 500, 'ground');
	//platforms.gameObject.setVisible(false);
	platforms.visible=false;
	
	bullets = this.add.group();
	
	bullets = this.physics.add.sprite();
	bullets.enableBody=true;
	
	
//	bullets.physicsBodyType= Phaser.Physics.ARCADE;
	//bullet.setGravity(4000,0);
	//bullets = physics.add.sprite(jugador.x, jugador.y, 'bullet',0);
	
	//this.bullets = this.add.sprite(this.jugador.x, this.jugador.y, 'bullet');
	
	
	//bullets = this.physics.add.sprite(100,100,'bullet',0);
	//bullets.createMultiple(30,'bullet');
	//bullets.anchor.set(0.5);
	//bullets.setAll('anchor.x',0.5);
	//bullets.setAll('anchor.y',1);
//	bullets.setSize(anchor.x,anchor.y);
//	bullets.setAll('outOfboundsKill',true);
	//bullets.setAll('checkWorldBounds',true);
	
	
	x=0;
	for(i=432; i>0; i=i-32){
	wall[x] = this.physics.add.sprite(800, i, 'ground2');	
	wall[x].setGravity(0,-1000);	
		wall[x] = this.physics.add.staticGroup();
		wall[x].enableBody=true;
		x++;
		}
		let randomSprite = Phaser.Utils.Array.GetRandom(wall[0]);
	alert(randomSprite);
	
	//this.wall = this.physics.add.sprite(800, 368, 'ground2');

		
	/*
	
	
	let arr = [];
let sprite1 = this.add.image(400, 300, 'spritekey1');
arr.push(sprite1);
let sprite2 = this.add.image(400, 300, 'spritekey2');
arr.push(sprite2);
let sprite3 = this.add.image(400, 300, 'spritekey3');
arr.push(sprite3);

// To get Random element from array use Phaser's Utility function
let randomSprite = Phaser.Utils.Array.GetRandom(arr);
	
	
	*/
	
	
	
	
	

	
	
	//wall.setCollisionByExclusion([-1]);
	//this.wall = add.sprite(800, 400, 'ground2');
	//this.wall.body.setVelocity(0,0).setBounce(1, 1).setCollideWorldBounds(true);
	//wall.setCollideWorldBounds(true);
//	bullets.anims.play('shoter',true);
	
	
	
	//this.wall.visible=false;
//	this.physics.add.collider(jugador, wall);
	
	
	
	
	firebutton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

	
	
	
	
    jugador = this.physics.add.sprite(0,0,'personaje1',0);
    jugador.setSize(30,0);

    this.anims.create({
        key: 'caminar',
        frames: this.anims.generateFrameNumbers('personaje1', { start: 1, end: 8 }),
        frameRate: 10
    });

	/*
	this.anims.create({
        key: 'shoter',
        frames: this.anims.generateFrameNumbers('bullet', { start: 1, end: 8 }),
        frameRate: 1
		});
	
	*/
	
	
    this.physics.add.collider(jugador, solidos);
	
//	this.physics.add.collider(jugador, wall);

	
	//this.physics.world.collide(this.jugador, this.wall);
	
	
	
    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.cameras.main.startFollow(jugador);

    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}
var chit=0;
function update() {
	
	
	if(this.bullets){
	//	console.log(this.bullets.x);
	//console.log(this.wall.x);
	
	
	
	
	for(i=0; i<wall.length; i++){
	alert(wall[i].val);
		if(((this.bullets.x)+100)>=wall[i].x){
	
			this.estrella = this.physics.add.sprite(wall[i].x, this.bullets.y, 'estrella');
		
		//this.bullets.body.setVelocity(0,0).setBounce(1, 1).setCollideWorldBounds(false)
		//this.bullets.body.setVelocity(0,0).setBounce(1, 1).setCollideWorldBounds(true);
	//	this.bullets.body.setVelocity(0,0).setBounce(1, 1).setVisible(false);
		
		this.bullets.destroy(this.bullets);
		
		
		
		this.bullets=false;
		/*
		this.bullets.reset(jugador.x,jugador.y);
	
			this.bullets.body.setVisible(false);
		this.bullets.body.killAndHide(this.bullets);
	*/
		/*
		this.bullets.visible=false;
		this.bullets.setActive(false);
		*/
		//this.bullets.setVisible(false)﻿;
		global_wall=i;
			alert(global_wall);
		break;
		}
		
		
		
		}
	
	
	
	
	
	
	/*console.log(this.wall.x);
		if(this.bullets.x==this.wall.x){
		console.log("ff");
			this.estrella = this.physics.add.sprite(this.wall.x, this.bullets.y, 'estrella');
			}
		*/
		
		
		//this.bullets.visible=false;
	//	bullets.destroy(); 
		} 
	
	
	
    jugador.body.setVelocityX(0);

    if(izquierda.isDown){
        jugador.body.setVelocityX(-velocidad);
        jugador.flipX = true;
		//this.bullets.body.setVelocityX(0);
		
	//	this.bullets.destroy(); 
	//bullets.reset(jugador.x,jugador.y);
    }

    if(derecha.isDown){
        jugador.body.setVelocityX(velocidad);
        jugador.flipX = false;
    }

    if(arriba.isDown && jugador.body.onFloor()){
        jugador.body.setVelocityY(alturaSalto);
    }

    if((izquierda.isDown || derecha.isDown) && jugador.body.onFloor()){
        jugador.anims.play('caminar',true);
    }else if(!jugador.body.onFloor()){
        jugador.setFrame(9);
    }else{
        jugador.setFrame(0);
    }
    
	if(firebutton.isDown && chit==0){
	chit=1;
	//alert("D");
	
	//shot(this.bullets.x);
//	console.log(this.bullets.x);
	
	
	
	
/*
		function goal(){
		alert("f");
		}
	*/
	
	//this.physics.add.overlap(this.bullets.x, this.wall.x, goal());
	

	
	
	
	/*
	this.wall.world.on('collisionstart', function () {
    console.log('collision');
});
	*/
	
	
	/*
	if(bullets.x==wall.x){
		this.estrella = this.physics.add.sprite(this.wall.x, this.bullets.y, 'estrella');
	//this.bullets.body.setVelocity(1000,0).setBounce(1, 1).setCollideWorldBounds(false);
		}
	*/
	//event.gameObject.setActive(false);
       //     event.gameObject.setVisible(false);
	   
	  // this.solidos.gameObject.setActive(false);
       //this.solidos.gameObject.setVisible(false);
	
	
	
	//this.phaserGame.destroy(true);
	//this.solidos.game.destroy(true); 
//	bullets=bullets.getFirstExists(false);
//	console.log(this.bullets.x);
	
	//bullets.reset(jugador.x,jugador.y);
//	bullets.body.setVelocityX(velocidad);
	//bullet.body.setVelocityY(-velocidad);
	
//	bullet.body.velocity.x= 4000;
//	bullets.flipX = false;
	//bullet.reset(jugador.x,jugador.y);
	//	fireBullet();
		}

		
		if(chit==1){
	
	if(!firebutton.isDown){
		
	this.bullets = this.physics.add.sprite(jugador.x, jugador.y, 'bullet');
	this.bullets.body.setVelocity(1000,0).setBounce(1, 1).setCollideWorldBounds(false);
	
//	bullets.anims.play('shoter',true);
	
	
	this.bullets.setGravity(0,-1000);
	this.physics.add.collider(this.bullets, wall[global_wall]);
	chit=0;
	//alert(global_wall);
	}
		}
	/*
	
	playerBullets.remove(bullet, true, true)

instead of

bullet.destroy();

	
	
	
	
	*/

	
	
	
		
	
	
}
/*

function fireBullet(){
	
	bullet=bullets.getFirstExists(false);
	
	if(bullet){

		bullet.reset(jugador.x,jugador.y);
		//bullet.body.velocity.y= -400;
//		bullet.setGravity(0,-1000);
		bullet.body.setVelocityX(500);
		}
}
*/

//https://developer.mozilla.org/es/docs/Games/Tutorials/2D_breakout_game_Phaser/Collision_detection

/*
	
	
	fadePicture: function() {
    game.add.tween(this.pacman).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
},

Note how that was changed from function fadePicture().

Next, in your create function you can refer to it:

this.game.time.events.add(Phaser.Timer.SECOND * 4, this.fadePicture, this);






*/