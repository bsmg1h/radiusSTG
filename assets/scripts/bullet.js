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
        // 子弹的速度
        //speed: 0,
        // 子弹速度向量倾角
        //theta: 0
    },

    // use this for initialization
    onLoad: function () {
        //this.speed = 0;
        //this.theta = 0;
        //随机给定子弹速度
        //this.speed = cc.random0To1() * 500 + 100;
        //随机给定子弹倾角
        //this.theta = cc.random0To1() * 2 * Math.PI;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // 子弹的位置按照行动路径更新
        this.node.x += this.speed * Math.cos(this.theta) * dt;
        this.node.y += this.speed * Math.sin(this.theta) * dt;
        // 若子弹超过边界则被摧毁
        if (Math.abs(this.node.x) > 480){
            this.node.destroy();
        }
        if (Math.abs(this.node.y) > 320){
            this.node.destroy();
        }
    }
});
