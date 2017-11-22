cc.Class({
    extends: require("bullet"),

   /* properties: {
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
    },*/

    // use this for initialization
    /*onLoad: function () {

    },*/

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // 子弹的位置按照行动路径更新
        this.node.x += this.speed * Math.cos(this.theta) * dt;
        this.node.y += this.speed * Math.sin(this.theta) * dt;
        // 若子弹超过边界则被摧毁
        if (Math.abs(this.node.x) > this.node.parent.width / 2){
            if(this.tag == 2) cc.log("Destroy. ");
            this.node.destroy();
        }
        if (Math.abs(this.node.y) > this.node.parent.height / 2){
            if(this.tag == 2) cc.log("Destroy. ");
            this.node.destroy();
        }
        this.node.rotation += dt * 720;
        this.node.width += 5;
        this.node.height += 5;
    }
});
