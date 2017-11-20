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
        speed: 0
    },

    // use this for initialization
    onLoad: function () {
        this.offset = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= this.speed * dt;
        cc.log("Y Value:" + this.node.y);
        this.offset += this.speed * dt;
        if(this.offset >= this.node.parent.height) {
            this.node.y += this.offset;
            this.offset = 0;
        }
    },
});
