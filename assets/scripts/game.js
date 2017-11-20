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
        //加载子弹的Prefab素材
        bulletPrefab:{
            default: null,
            type: cc.Prefab
        },
        enemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        //两颗子弹的发射间隔
        bulletInterval: 500
    },
    //test
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
    test: function() {
        this.node.width = 3;
    },
    // use this for initialization
    onLoad: function () {
        //计时器
        this.deltaT = 0;
        //计数器
        this.i = -1;
        //存储子弹数组
        this.newBullets = [];
        //Generate Enemies
        this.spawnEnemy();
        // Collision System
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.deltaT += dt;
        if (this.deltaT > this.bulletInterval){
            //如果计时器大于子弹发射时间间隔，则发射子弹
            //计数器加一
            this.i += 1;
            //计时器归零
            this.deltaT = 0;
            //子弹数组存储新子弹
            this.newBullets[i] = cc.instantiate(this.bulletPrefab);
            this.node.addChild(this.newBullets[i]);
            this.newBullets[i].setPosition(cc.p(0,0));
        }
    },
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }
});
