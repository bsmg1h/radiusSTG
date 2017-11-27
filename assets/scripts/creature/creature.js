cc.Class({
    extends: cc.Component,

    properties: {
    },
    ctor: function() {
        this.id = 0;
        this.blood = 2000;
        this.bulletsType = [];
        this.bulletInterval = 0.05;
        this.speed = 50;
        this.shield = 0;
        this.bomb = 0;
    },
    // use this for initialization
    onLoad: function () {


    },

    keepInsideBoundary: function(dt) {
        if (!this.spaceMoving) {
            if (this.node.x > this.node.parent.width/2 - this.node.width/2) {
                this.node.x = this.node.parent.width/2 - this.node.width/2;
                this.xSpeed = 0;
            } else if ( this.node.x < -this.node.parent.width/2 + this.node.width/2) {
                this.node.x = -this.node.parent.width/2 + this.node.width/2;
                this.xSpeed = 0;
            }
            if (this.node.y > this.node.parent.height/2 - this.node.height/2) {
                this.node.y = this.node.parent.height/2 - this.node.height/2;
                this.ySpeed = 0;
            } else if ( this.node.y < -this.node.parent.height/2 + this.node.height/2) {
                this.node.y = -this.node.parent.height/2 + this.node.height/2;
                this.ySpeed = 0;
            }
        } else if (this.spaceMoving){
            if (this.node.x > this.node.parent.width/2 - this.node.width/2) {
                this.node.x = this.node.parent.width/2 - this.node.width/2;
                this.xSpeed *= -1;
            } else if ( this.node.x < -this.node.parent.width/2 + this.node.width/2) {
                this.node.x = -this.node.parent.width/2 + this.node.width/2;
                this.xSpeed *= -1;
            }
            if (this.node.y > this.node.parent.height/2 - this.node.height/2) {
                this.node.y = this.node.parent.height/2 - this.node.height/2;
                this.ySpeed *= -1;
            } else if ( this.node.y < -this.node.parent.height/2 + this.node.height/2) {
                this.node.y = -this.node.parent.height/2 + this.node.height/2;
                this.ySpeed *= -1;
            }
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
