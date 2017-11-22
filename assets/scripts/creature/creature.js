cc.Class({
    extends: cc.Component,

    properties: {
    },
    ctor: function() {
        this.id = 0;
        this.blood = 2000;
        this.bulletsType = [];
        this.bulletInterval = 0.02;
        this.speed = 50;
        this.shield = 0;
        this.bomb = 0;
    },
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
