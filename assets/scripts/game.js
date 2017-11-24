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
        //Generate Enemies
        //this.spawnEnemy();
        //cc.log(this.node.getComponent("game").test);
        /*this.node.width = 100;
        cc.log(this.node.width);*/

        // Collision System
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;

        this.setMouseInputControl();
    },

    setMouseInputControl: function(){
        var self = this;
        //添加鼠标事件侦听
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            //鼠标按下时，判断是否有我们制定的方向控制键，并设置相对应方向加速
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

});
