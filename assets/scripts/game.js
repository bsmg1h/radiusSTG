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
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        test: 1,

        // boss节点，用于获取boss的属性
        boss: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取player的属性
        player: {
            default: null,
            type: cc.Node
        },
        // ai1 节点，用于获取ai1属性
        ai1: {
            default: null,
            type: cc.Node
        },
        playerScore: {
            default: null,
            type: cc.Label
        },
        ai1Score: {
            default: null,
            type: cc.Label
        }
    },

    spawnEnemy: function () {
        cc.log("spawn new Enemy");
        var positionX = cc.randomMinus1To1() * this.node.width / 2;
        var positionY = cc.randomMinus1To1() * this.node.height / 2;
        var newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(cc.p(positionX, positionY));
        // pass Game instance to star
        newEnemy.getComponent('enemy').init(this);
    },

    // use this for initialization
    onLoad: function () {
        //总计时器
        this.T = 0;
        //ai1移动计时器
        this.ai1MovingT = 0;
        //Generate Enemies
        //this.spawnEnemy();
        //cc.log(this.node.getComponent("game").test);
        /*this.node.width = 100;
        cc.log(this.node.width);*/

        // Collision System
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;

        this.setMouseInputControl();
        this.setKeyboardInputControl();

        this.setAi1MouseInputControl();

    },

    update: function (dt) {

        this.setAi1MouseInputControl(dt);
        this.setAi1KeyboardInputControl(dt);

    },

    setMouseInputControl: function(){
        var self = this;
        //添加鼠标事件侦听
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            //鼠标按下时，判断射击事件
            onMouseDown: function (event) {
                self.player.getComponent("player").mousePressed = true;
                self.player.getComponent("player").mousePosX = event.getLocationX();
                self.player.getComponent("player").mousePosY = event.getLocationY();
                cc.log(self.player.getComponent("player").mousePressed);
            },
            onMouseMove: function(event){
                self.player.getComponent("player").mousePosX = event.getLocationX();
                self.player.getComponent("player").mousePosY = event.getLocationY();
            },
            onMouseUp: function (event) {
                self.player.getComponent("player").mousePressed = false;
            }
        }, self.node);
    },

    setKeyboardInputControl: function(){
        var self = this;
        //添加键盘事件侦听
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            //有按键按下时，判断是否有我们制定的方向控制键，并设置相对应方向加速
            onKeyPressed: function (keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.player.getComponent("player").accLeft = true;
                        self.player.getComponent("player").accRight = false;
                        self.player.getComponent("player").moveLeft = true;
                        self.player.getComponent("player").moveRight = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.player.getComponent("player").accLeft = false;
                        self.player.getComponent("player").accRight = true;
                        self.player.getComponent("player").moveLeft = false;
                        self.player.getComponent("player").moveRight = true;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.player.getComponent("player").accUp = true;
                        self.player.getComponent("player").accDown = false;
                        self.player.getComponent("player").moveUp = true;
                        self.player.getComponent("player").moveDown = false;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.player.getComponent("player").accUp = false;
                        self.player.getComponent("player").accDown = true;
                        self.player.getComponent("player").moveUp = false;
                        self.player.getComponent("player").moveDown = true;
                        break;
                    case cc.KEY.shift:
                        self.player.getComponent("player").slowMode = true;
                        break;
                    case cc.KEY.z:
                        self.player.getComponent("player").shooting = true;
                        break;
                }
            },
            onKeyReleased: function(keyCode, event){
                switch(keyCode){
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.player.getComponent("player").accLeft = false;
                        self.player.getComponent("player").moveLeft = false;
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        self.player.getComponent("player").accRight = false;
                        self.player.getComponent("player").moveRight = false;
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        self.player.getComponent("player").accUp = false;
                        self.player.getComponent("player").moveUp = false;
                        break;
                    case cc.KEY.s:
                    case cc.KEY.down:
                        self.player.getComponent("player").accDown = false;
                        self.player.getComponent("player").moveDown = false;
                        break;
                    case cc.KEY.shift:
                        self.player.getComponent("player").slowMode = false;
                        break;
                    case cc.KEY.z:
                        self.player.getComponent("player").shooting = false;
                        break;
                }
            }
        }, self.node);
    },

    //ai logic

    setAi1MouseInputControl: function(dt){
        this.ai1.getComponent("ai1").mousePressed = true;
        this.ai1.getComponent("ai1").mousePosX = this.player.x + this.node.width / 2 + 80 * cc.randomMinus1To1();
        this.ai1.getComponent("ai1").mousePosY = this.player.y + this.node.height / 2 + 80 * cc.randomMinus1To1();
        cc.log("ai:",this.ai1.x, this.ai1.y);
    },

    setAi1KeyboardInputControl: function(dt){
        var rTimeInterval = 0.5 + cc.random0To1() * 2;
        this.ai1MovingT += dt;
        if (this.ai1MovingT > rTimeInterval) {
            this.ai1MovingT = 0;
            var r1 = cc.random0To1();
            var r2 = cc.random0To1();
            if (r1 > 0.5) {
                this.ai1.getComponent("ai1").accLeft = true;
                this.ai1.getComponent("ai1").accRight = false;
                this.ai1.getComponent("ai1").moveLeft = true;
                this.ai1.getComponent("ai1").moveRight = false;
            } else {
                this.ai1.getComponent("ai1").accLeft = false;
                this.ai1.getComponent("ai1").accRight = true;
                this.ai1.getComponent("ai1").moveLeft = false;
                this.ai1.getComponent("ai1").moveRight = true;
            }
            if (r2 > 0.5) {
                this.ai1.getComponent("ai1").accUp = true;
                this.ai1.getComponent("ai1").accDown = false;
                this.ai1.getComponent("ai1").moveUp = true;
                this.ai1.getComponent("ai1").moveDown = false;
            } else {
                this.ai1.getComponent("ai1").accUp = false;
                this.ai1.getComponent("ai1").accDown = true;
                this.ai1.getComponent("ai1").moveUp = false;
                this.ai1.getComponent("ai1").moveDown = true;
            }
        }
    },

});
