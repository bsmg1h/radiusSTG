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
        //加载子弹的Prefab素材
        radius: 300,
        bulletPrefab:{
            default: null,
            type: cc.Prefab
        },
        bulletInterval: 0.05
    },

    // use this for initialization
    onLoad: function () {
        this.node.zIndex = 9999;
        //总计时器
        this.T = 0;
        //计数器
        this.counter = 0;
        //存储子弹数组
        this.newBullets = [];
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
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
            this.newBullets[i].addComponent("bullet");
            var bulletComponent = this.newBullets[i].getComponent('bullet');
            bulletComponent.speed = speed;
            bulletComponent.theta = theta;
            this.newBullets[i].setPosition(cc.p(lagDis * Math.cos(theta), lagDis * Math.sin(theta)));
            this.node.parent.addChild(this.newBullets[i]);
        }
    }
});
