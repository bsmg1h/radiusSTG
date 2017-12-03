cc.Class({
    extends: require('creature'),

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
        playerBulletPrefab:{
            default: null,
            type: cc.Prefab
        },
        bulletInterval: 0.3,
        bulletTag: 1001
    },





    // use this for initialization
    onLoad: function() {
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

        this.mousePosX = 0;
        this.mousePosY = 0;
        this.mousePressed = false;



        this.playerNewBullets = [];
        this.T = 0;
        this.counter = 0;
    },

    onCollisionEnter: function (other, self) {
        //cc.log("Player is hit by AI 1 bullet: " , other.tag);
        if (other.tag != this.bulletTag) {
            this.node.setPositionX(0);
            this.node.setPositionY(-210);
            if (other.tag == 1101 ){
                this.node.parent.getComponent("game").ai1Score += 1;
            }
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {

        //检测player是否在此时有移动事件，如果是则依照指定方式移动位置
        this.ifPlayerMove(dt);

        //定义于Creature父类，保持角色始终在游戏窗口范围之内
        this.keepInsideBoundary();

        //cc.log(this.mousePressed);
        //检测player是否在此时有射击事件，如果是则发射子弹
        if (this.mousePressed || this.shooting) {
            this.playerShoot(dt, this.getTheta());
        }
    },

    ifPlayerMove : function(dt) {
        if (!this.spaceMoving){
            var speedFactor = (this.slowMode ? 0.4 : 1);
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
            if (this.xSpeed != 0 && this.ySpeed != 0) {
                this.xSpeed = Math.sqrt(2) * this.xSpeed;
                this.ySpeed = Math.sqrt(2) * this.ySpeed;
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
    },

    getTheta : function() {
        var playerX = this.node.x + this.node.parent.width / 2;
        var playerY = this.node.y + this.node.parent.height / 2;
        if (this.shooting) {
            var theta = Math.PI / 2;
        }
        else {
            var theta = Math.asin((this.mousePosY - playerY) / Math.sqrt((playerY - this.mousePosY) * (playerY - this.mousePosY) + (playerX - this.mousePosX) * (playerX - this.mousePosX)));
            if (this.mousePosX - playerX < 0) theta = Math.PI - theta;
        }
        return theta
    },

    playerShoot : function(dt, theta) {
        this.T += dt;
        if (this.T > this.bulletInterval * this.counter) {
            this.counter += 1;
            // 创建
            this.playerNewBullets[i] = cc.instantiate(this.playerBulletPrefab);
            var speed = 500;
            this.playerNewBullets[i].addComponent("specialBullet");
            var bulletComponent = this.playerNewBullets[i].getComponent('specialBullet');
            bulletComponent.speed = speed;
            bulletComponent.theta = theta;
            this.playerNewBullets[i].getComponent(cc.CircleCollider).tag = this.bulletTag;
            this.playerNewBullets[i].setPosition(this.node.x, this.node.y);
            this.node.parent.addChild(this.playerNewBullets[i]);
        }
    },

});
