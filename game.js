var config = {
    type: Phaser.AUTO,
  //  width: window.innerWidth,
   // height: window.innerHeight,
   width: 500,
   height: 500,
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



if (typeof(Storage) !== "undefined") {

  if(localStorage.escena!=2 && localStorage.escena!=3 && localStorage.escena!=1){
	  
	  
  localStorage.setItem("escena", 1);
  }
 
} else {
 
}


var rota_arriba=-2, rota_abajo=+2;
var diana_x=400, diana_y=200;
var img_diana_x=45,   img_diana_y=73;
var counter=0;
var counter_2=0; 

var text;
var timedEvent;

var tira_flecha=0;
var duration=0, fuego=0;
var velocidad_flecha=500;


class MyScene extends Phaser.Scene {
    preload (){
        this.load.image('face', 'http://labs.phaser.io/assets/pics/bw-face.png');
    }
    create (data){
        this.face = this.add.image(data.x, data.y, 'face');
    }
}


var game = new Phaser.Game(config);
var image;
var jugador, vuelta=0;

var arriba,derecha,izquierda, reloj=0;
let f, arco, arco3, rotacion=0;
const velocidad = 350;
const alturaSalto = -530;
var start_game;
var reload=0, resetea=0, lanza=0;

//45  73

function preload() {
  

    
    
	this.load.audio('sound_diana', 'assets/sound/diana.ogg', {
        instances: 1
    });
	 this.load.audio('sound_tensar', 'assets/sound/tensar.ogg', {
        instances: 1
    });
	 this.load.audio('sound_flecha', 'assets/sound/flecha.mp3', {
        instances: 1
    });
	 this.load.audio('sound_bota', 'assets/sound/bota.mp3', {
        instances: 1
    });
	
	
	
	this.load.image('flecha','assets/flecha.png');
	this.load.image('pastel','assets/pastel.png');
	this.load.image('end','assets/end.png');
	this.load.image('reload','assets/reload.png');
	this.load.image('next','assets/next.png');
	this.load.image('diana','assets/diana.png');
	this.load.image('start_game','assets/start_game.png');
	this.load.image('arco','assets/arc.png');
	this.load.image('arco3','assets/arc_3.png');
	this.load.image('arco2','assets/arc_2.png');
	this.load.image('arco1','assets/arc_1.png');
	this.load.image('pad1','assets/pad1.png');
	this.load.image('pad2','assets/pad2.png');
	this.load.image('pad3','assets/pad3.png');
	
	
	this.load.image('fondo', 'assets/fondo.jpg');
	this.load.image('dra', 'assets/star.png');
	
	
	
	
	
	
		
	
}


function create() {
	
	
	
	
	image = this.add.image(400, 300, 'fondo');
	
	
	  var graphics = this.make.graphics();

    // graphics.fillStyle(0xffffff);
    graphics.fillRect(152, 133, 320, 250);
	
	 var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
	
	
	
	
	//var image_drag = this.add.sprite(100, 450, 'dra').setInteractive();
	
	var image_drag = this.add.image(200, 200, 'dra');
	
	image_drag.setMask(mask);
	
	
	
	  var zone = this.add.zone(152, 130, 320, 256).setOrigin(0).setInteractive();

    zone.on('pointermove', function (pointer) {
		
        if (pointer.isDown)
        {
	//	pointer.velocity.y = 100;
          //  image_drag.y += (pointer.velocity.y / 10);

		    image_drag.y += 5;
            image_drag.y = Phaser.Math.Clamp(image_drag.y, -400, 300);
        }
	
	});
	
	
	
	//https://labs.phaser.io/edit.html?src=src/input/dragging/scrolling%20text%20box.js&v=3.21.0
	
	
	/*
	//var image_drag = this.add.sprite(100, 450, 'dra').setInteractive();
	this.input.setDraggable(image_drag);
	
	 //  The pointer has to move 16 pixels before it's considered as a drag
    this.input.dragDistanceThreshold = 16;
	
	
	
	
    this.input.on('dragstart', function (pointer, gameObject) {

        gameObject.setTint(0xff0000);

    });

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    });

    this.input.on('dragend', function (pointer, gameObject) {

        gameObject.clearTint();

    });
	
	*/
	
	
	this.sound.add('sound_diana');
	this.sound.add('sound_tensar');
	this.sound.add('sound_flecha');
	
	
    game.config.backgroundColor.setTo(108, 210, 222);

	
	diana_y=200;
	
	
	    diana = this.physics.add.staticGroup();

      if(localStorage.escena<3){
		diana.create(diana_x, diana_y, 'diana');
	  }
		
		if(localStorage.escena==3){
		diana_y=diana_y-100;
		diana.create(diana_x, diana_y, 'diana');
		}
		
		
		
		
		
		
		
	
	 f = this.physics.add.sprite(100, 350 , 'flecha');
	
	f.setGravity(0,-1000);	
	
	//f.body.setAllowGravity(false);
	
	arco = this.physics.add.sprite(100, 350 , 'arco');
	
	arco.setGravity(0,-1000);
	
	arco2 = this.physics.add.sprite(100, 350 , 'arco2');
	
	arco2.setGravity(0,-1000);
	arco2.setVisible(false);
	
	
	arco3 = this.physics.add.sprite(100, 350 , 'arco3');
	
	arco3.setGravity(0,-1000);
	arco3.setVisible(false);
	
	arco1 = this.physics.add.sprite(100, 350 , 'arco1');
	
	arco1.setGravity(0,-1000);
	arco1.setVisible(false);
	
	
	
	arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
	izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
	derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    firebutton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	
	
	
	
	text = this.add.text(10, 10);

    timedEvent = this.time.addEvent({ delay: 10000, callback: onEvent, callbackScope: this, loop: true });
	
	
	
	
this.pad1 = this.add.image(350, 400, 'pad1');
this.pad1.setInteractive();
this.pad1.on('pointerdown', function() {
		
}, this.pad1);
this.pad2 = this.add.image(300, 400, 'pad2');
this.pad2.setInteractive();
this.pad2.on('pointerdown', function() {
		
}, this.pad2);

this.pad3 = this.add.image(400, 400, 'pad3');
this.pad3.setInteractive();
this.pad3.on('pointerdown', function() {
	
}, this.pad3);
	
	
	
	
	
if(localStorage.escena==1){
	
	this.start_game = this.add.image(250, 250, 'start_game');
this.start_game.setInteractive();
this.start_game.on('pointerdown', function() {


localStorage.setItem("escena", 0);
	
}, this.start_game);

}	

	
}




function update() {
	
	
	if(lanza==1){
	}
	
	
	
	
	
	if(localStorage.escena==0 || resetea==1){
	if(localStorage.escena==0){
	localStorage.setItem("escena", 2);
	}
	
	resetea=0;
		this.registry.destroy();
		this.events.off();
		this.scene.stop();
		this.scene.start();
	}
	
	
	text.setText('Event.progress: ' + timedEvent.getProgress().toString().substr(0, 5));

	
   if(arriba.isDown){

	
		rota_arriba=rota_arriba-2;
		if(rota_arriba>=-90){
		f.angle = rota_arriba;
		arco.angle = rota_arriba;
		arco1.angle = rota_arriba;
		arco2.angle = rota_arriba;
		arco3.angle = rota_arriba;
		rota_abajo=rota_arriba;
		rotacion=rota_arriba;
		
		}

    } 

	if(abajo.isDown){

	
	
	rota_abajo=rota_abajo+2;
	
	
				if(rota_abajo<=90){
		f.angle = rota_abajo;
		
		arco.angle = rota_abajo;
		arco1.angle = rota_abajo;
		arco2.angle = rota_abajo;
		arco3.angle = rota_abajo;
		rota_arriba=rota_abajo;
		rotacion=rota_abajo;
		}
	
	}
	
	
	
		
	if(izquierda.isDown){
	this.sound.play('sound_tensar');﻿﻿﻿﻿
	

	duration++;

	 
	 if(duration>4 && duration<8){
	 velocidad_flecha=velocidad_flecha+100;
		 arco.setVisible(false);
		 arco1.setVisible(true);	
		 }
	 
	 if(duration>=8 && duration<16){
	 velocidad_flecha=velocidad_flecha+100;
		 arco1.setVisible(false);
		 arco2.setVisible(true);	
		 }
		 
		 
		  if(duration>=16 && duration<20){
		 arco2.setVisible(false);
		 arco3.setVisible(true);
		 velocidad_flecha=velocidad_flecha+100;
		 }
		

	}
	
	if(derecha.isDown){
	duration--;

	
	
	
	 if(duration<4){
		 arco.setVisible(true);
		 arco1.setVisible(false);	
		 }
	
	 if(duration>4 && duration<8){
		 arco.setVisible(true);
		 arco1.setVisible(false);	
		 }
	 
	 if(duration>8 && duration<16){
		 arco1.setVisible(true);
		 arco2.setVisible(false);	
		 }
		 
		 
		  if(duration>16){
		 arco2.setVisible(true);
		 arco3.setVisible(false);	
		 }
	
	

	}
	
	
	
	/*
	if(firebutton.isUp){
	
	alert();
	}
	*/
	
	if(firebutton.isDown){
	fuego=1;
	//f.setGravity(0,1000);
	
	}
	
	
	if(firebutton.isUp && fuego==1){
		
		
		
		
		
	this.sound.play('sound_flecha');﻿﻿﻿﻿
	
	
		//f.body.setAllowGravity(true);
	
	
//	var ve_x=Math.abs(Math.cos(((Math.PI/2)*rotacion)/90))*velocidad_flecha;
//		var ve_y=Math.abs(Math.sin(((Math.PI/2)*rotacion)/90))*velocidad_flecha;


		var ve_x=Math.cos(((Math.PI/2)*rotacion)/90)*velocidad_flecha;
		var ve_y=Math.sin(((Math.PI/2)*rotacion)/90)*velocidad_flecha;
		
		if(ve_y>=0){
		f.body.setVelocity(ve_x,ve_y).setBounce(1, 1).setCollideWorldBounds(false);	
			}else{
			f.body.setVelocity(ve_x,ve_y).setBounce(1, 1).setCollideWorldBounds(false);
			}
		
		
		duration=0;
		f.setGravity(0,1000);

	rotacion=0;rota_abajo=0; rota_arriba=0;
	velocidad_flecha=500;
	
	//}
	
	//console.log(game.input.mousePointer.x);
fuego=0; counter_2=0;
}




if((Math.round(f.x))>=Math.round(diana_x-img_diana_x/2) && (Math.round(f.x))<Math.round(diana_x+img_diana_x/2-10)
			&& (Math.round(f.y))>=Math.round(diana_y-img_diana_y/2) 
							&& (Math.round(f.y))<=Math.round(diana_y+img_diana_y/2) && counter_2==0){
							this.sound.play('sound_bota');﻿﻿﻿﻿
								
		f.setVelocityX(0);
		f.setVelocityY(0);
		f.setGravity(0,-1000);
		
							
							counter=0;
							counter_2=1;
							}


	if(Math.round(f.y)>500 && counter_2==0){
		counter=0;
		counter_2=1;
		
		}
							
		
							
							
							


	if(counter_2==1){
//	fuego=0;
		counter++;
		}
		if(counter==65 && counter_2==1){
		counter_2=2;
		//alert();
		
		
		this.image0 = this.add.image(250, 250, 'pastel');	
		this.image2 = this.add.image(250, 250, 'end');


this.image3 = this.add.image(300, 400, 'reload');
this.image3.setInteractive();




this.image3.on('pointerdown', function() {
	
	localStorage.setItem("escena", 2);
	resetea=1;
	
	
}, this.image3);

this.image4 = this.add.image(420, 400, 'next');
this.image4.setInteractive();
this.image4.on('pointerdown', function() {
	localStorage.setItem("escena", 3);
	resetea=1;
	

}, this.image4);
		
			
		}
	



//console.log(game.input.mousePointer.x)

}


function onEvent ()
{
  //  image.rotation += 0.04;
}
