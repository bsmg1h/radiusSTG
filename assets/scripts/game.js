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
        //两颗子弹的发射间隔
        bulletInterval: 1000
    },

    // use this for initialization
    onLoad: function () {
        //计时器
        this.deltaT = 0;
        this.T = 0;
        //存储子弹数组
        this.newBullets = new Array();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.deltaT += dt;
        this.T += dt;
        if (this.deltaT > this.bulletInterval){
            //如果计时器大于子弹发射时间间隔，则发射子弹
            //计数器加一
            //计时器归零
            this.shootNewBullet(this.T, 5);
            this.deltaT -= this.bulletInterval;
        }
    },

    shootNewBullet: function (T, w) {
        for(var i = 0; i < w; ++i)
        {
            this.newBullets[i] = cc.instantiate(this.bulletPrefab);
            this.newBullets[i].getComponent("bullet").speed = 250;
            this.newBullets[i].getComponent("bullet").theta = this.T * this.T * Math.PI / 8 + 2 * Math.PI * i / w;
            this.newBullets[i].setPosition(cc.p(0,0));
            this.node.addChild(this.newBullets[i]);
        }
    }
});