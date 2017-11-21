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
        bulletInterval: 500,
        //子弹速度斜率
        bulletSpeedCoefficient: 500,
        //子弹速度截距
        bulletSpeedIntercept: 100,
        //子弹发射角速度
        w : 0.1
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
        //总计时器
        this.T = 0
        //子弹间隔计时器
        this.deltaT = 0;
        this.counter = 0;
        //计数器
        this.i = -1;
        //存储子弹数组
        this.newBullets = [];
        //Generate Enemies
        //this.spawnEnemy();
        // Collision System
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //this.deltaT += dt;
        this.T += dt;
        if (this.T > this.bulletInterval * this.counter){
            //如果计时器大于子弹发射时间间隔，则发射子弹
            //计时器归零
            this.counter += 1;
            this.shootNewBullet(this.bulletInterval * this.counter, 5, this.T % this.bulletInterval);
            //this.deltaT -= this.bulletInterval;
        }
    },

    shootNewBullet: function (T, w, lagT) {
        for(var i = 0; i < w; ++i)
        {
            this.newBullets[i] = cc.instantiate(this.bulletPrefab);
            var speed = 250;
            var theta = T * T * Math.PI / 8 + 2 * Math.PI * i / w;
            var lagDis = lagT * speed;
            this.newBullets[i].getComponent("bullet").speed = speed;
            this.newBullets[i].getComponent("bullet").theta = theta;
            this.newBullets[i].setPosition(cc.p(lagDis * Math.cos(theta), lagDis * Math.sin(theta)));
            this.node.addChild(this.newBullets[i]);
        }
    }
});
