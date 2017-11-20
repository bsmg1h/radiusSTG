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
        this.T += dt;
        this.deltaT += dt;
        if (this.deltaT > this.bulletInterval){
            //如果计时器大于子弹发射时间间隔，则发射子弹
            //计数器加一
            this.i += 1;
            //计时器重置
            this.deltaT -= this.bulletInterval;
            //发射新子弹
            this.shootNewBullet(this.bulletSpeedCoefficient, this.bulletSpeedIntercept, (this.T - this.T%this.bulletInterval), this.w);
        }
    },
    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    //生成新子弹的函数
    shootNewBullet: function(speedCoefficient, speedIntercept, T, w) {
        //子弹数组存储新子弹
        this.newBullets[i] = cc.instantiate(this.bulletPrefab);
        //将这颗新子弹作为Canvas的子节点
        this.node.addChild(this.newBullets[i]);
        //设置这颗子弹的初始速度
        //var speedAndTheta = this.bulletRandomIsotropyInitializer(speedCoefficient, speedIntercept);
        var speedAndTheta = this.bulletSpiralInitializer(speedIntercept, T, w);
        this.newBullets[i].getComponent("bullet").speed = speedAndTheta[0];
        //设置这颗子弹的初始行进方向
        this.newBullets[i].getComponent("bullet").theta = speedAndTheta[1];
        //设置这颗子弹的初始位置
        this.newBullets[i].setPosition(cc.p(50 * Math.cos(speedAndTheta[1]), 50 * Math.sin(speedAndTheta[1])));
    },

    //返回子弹的初始速度与方向:
    //随机各向同性子弹
    bulletRandomIsotropyInitializer: function(speedCoefficient, speedIntercept ){
        var speed = cc.random0To1() * speedCoefficient + speedIntercept;
        var theta = cc.random0To1() * 2 * Math.PI;
        return [speed, theta];
    },
    //螺旋子弹
    bulletSpiralInitializer: function(speedIntercept, T, w) {
        return[speedIntercept, T * w / Math.PI / 2]
    }
});
