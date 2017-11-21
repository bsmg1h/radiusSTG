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
        speedY: 0
    },

    // use this for initialization
    onLoad: function () {
        this.resetY = this.node.parent.height;
        this.offsetY = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= dt * this.speedY;
        this.offsetY += dt * this.speedY;
        if(this.offsetY >= this.resetY) {
            this.node.y -= this.offsetY;
            this.offsetY = 0;
        }
    },
});
