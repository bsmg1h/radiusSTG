cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        spaceMoving: false,
        Damping: 0.01,
        accel: 0,
        maxMoveSpeed: 0,
    },

    setInputControl: function(){
        var self = this;
        //添加键盘事件侦听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            //有按键按下时，判断是否有我们制定的方向控制键，并设置相对应方向加速
            onKeyPressed: function (keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = true;
                        self.accRight = false;
                        self.moveLeft = true;
                        self.moveRight = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accLeft = false;
                        self.accRight = true;
                        self.moveLeft = false;
                        self.moveRight = true;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.accUp = true;
                        self.accDown = false;
                        self.moveUp = true;
                        self.moveDown = false;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.accUp = false;
                        self.accDown = true;
                        self.moveUp = false;
                        self.moveDown = true;
                        break;
                    case cc.KEY.shift:
                        self.slowMode = true;
                        break;
                }
            },
            onKeyReleased: function(keyCode, event){
                switch(keyCode){
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.accLeft = false;
                        self.moveLeft = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.accRight = false;
                        self.moveRight = false;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.accUp = false;
                        self.moveUp = false;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.accDown = false;
                        self.moveDown = false;
                        break;
                    case cc.KEY.shift:
                        self.slowMode = false;
                        break;
                }
            }
        }, self.node);
    },

    // use this for initialization
    onLoad: function () {
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

        this.slowMode = false;

        this.xSpeed = 0;
        this.ySpeed = 0;

        this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if (!this.spaceMoving){
            var speedFactor = (this.slowMode ? 0.25 : 1);
            if (this.moveLeft) {
                this.xSpeed = -1 * speedFactor * this.maxMoveSpeed;
            } else if (this.moveRight) {
                this.xSpeed  = speedFactor * this.maxMoveSpeed;
            } else {
                this.xSpeed = 0;
            }
            if (this.moveUp) {
                this.ySpeed = speedFactor * this.maxMoveSpeed;
            } else if (this.moveDown) {
                this.ySpeed  = -1 * speedFactor * this.maxMoveSpeed;
            } else {
                this.ySpeed = 0;
            }
        } else if (this.spaceMoving){
            if (this.accLeft) {
                this.xSpeed -= this.accel * dt;
            } else if (this.accRight) {
                this.xSpeed += this.accel * dt;
            }
            if (this.accUp) {
                this.ySpeed += this.accel * dt;
            } else if (this.accDown) {
                this.ySpeed -= this.accel * dt;
            }
            this.xSpeed *= (1-this.Damping);
            this.ySpeed *= (1-this.Damping);
        }
        
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed){
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        if (Math.abs(this.ySpeed) > this.maxMoveSpeed){
            this.ySpeed = this.maxMoveSpeed * this.ySpeed / Math.abs(this.ySpeed);
        }

        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;

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
});
