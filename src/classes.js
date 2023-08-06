

class controls{
    constructor(){
        this.left = false;
        this.right = false;
        this.jump = false;
        this.attack = false;
        this.cooldown = 1000;
        this.lastPressed = 0;
    }
    updateControls(){
        document.onkeydown = (e) => {
            if(e.key === "ArrowLeft"){
                this.left = true;
            }
            if(e.key === "ArrowRight"){
                this.right = true;
            }
            if(e.key === " "){
                this.jump = true;
            }
            if(e.key === "z"){
                if(this.lastPressed <= (Date.now()-this.cooldown)){
                    this.attack = true;
                    this.lastPressed = Date.now();
                    setTimeout(()=>{this.attack = false},600)
                }
            }

        }
        document.onkeyup = (e) => {
            if(e.key === "ArrowLeft"){
                this.left = false;
            }
            if(e.key === "ArrowRight"){
                this.right = false;
            }
            if(e.key === " "){
                this.jump = false;
            }
        }
    }
}

class sword{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    swing(x,y,other){
        this.x = other.x;
        this.y = other.y;
        // ctx.beginPath();
        // ctx.rect(x,y,this.width,this.height);
        // ctx.fillStyle = 'black';
        // ctx.fill();
        // ctx.stroke();
    }
}

const idle = document.getElementById("idle");
const running = document.getElementById("running");
const attacking = document.getElementById("attacking");
const jumping = document.getElementById("running");

class player{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.image = idle;
        this.xSpeed = 5;
        this.ySpeed = 3;
        this.isFalling = false;
        this.weapon = new sword(this.x,this.y,30,10);
        this.controls = new controls();
        this.frame = 0;
        this.noOfFrames = 4;
        this.width = 32;
        this.height = 32;
    }
    drawSelf(){
        if(!(this.controls.left || this.controls.right || this.controls.attack || this.controls.jump)){
            this.noOfFrames = 4;
            this.image = idle;
        } else if(this.controls.left || this.controls.right){
            this.noOfFrames = 6;
            this.image = running;
        }
        if(this.controls.attack){
            this.weapon.swing(this.x + 10,this.y + 10,this);
            this.noOfFrames = 4;
            this.image = attacking
        } else {
            this.weapon.x = -100;
            this.weapon.y = -100;
        }
        ctx.drawImage(this.image,32*this.frame,0,32,32,this.x,this.y,this.width,this.height);
    }
    update(){
        if(this.frame > this.noOfFrames){
            this.frame = 0;
        }
        if(this.y != 100){
            this.isFalling = true;
        }else{
            this.isFalling = false;
        }
        if(this.isFalling){
            this.controls.jump = false;
            this.ySpeed += 1;
        }
        if(this.controls.left){
            this.x -= this.xSpeed;
        }
        if(this.controls.right){
            this.x += this.xSpeed;
        }
        if(this.controls.jump){
            this.ySpeed = -10;
        }
        if(this.y > 100){
            this.ySpeed = 0;
            this.y = 100; 
        }
        this.y += this.ySpeed
    }
}

class enemy extends player{
    constructor(x,y){
        super(x,y);
        this.hp = 100;
        this.xSpeed = 4;  
    }
    drawSelf(){
        if(!(this.controls.left || this.controls.right || this.controls.attack || this.controls.jump)){
            this.noOfFrames = 4;
            this.image = idle;
        } else if(this.controls.left || this.controls.right){
            this.noOfFrames = 6;
            this.image = running;
        }
        if(this.controls.attack){
            this.weapon.swing(this.x + 10,this.y + 10,this);
            this.noOfFrames = 4;
            this.image = attacking
        } else {
            this.weapon.x = -100;
            this.weapon.y = -100;
        }
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(-1,1);
        ctx.drawImage(this.image,32*this.frame,0,32,32,0,0,this.width,this.height);
        ctx.restore();

    }
    ai(other){
        if(this.x - 20 > other.x){
            this.controls.left = true;
            this.controls.right = false;
        } else {
            this.controls.left = false;
        }
        if(this.x < other.x){
            this.controls.right = true;
            this.controls.left = false;
        }
        if(other.controls.attack){
            if(Math.random() < 0.5){
                this.controls.right = true;
                this.controls.left = false;
            }
        }
    }
}