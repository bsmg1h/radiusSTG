"use strict";
cc._RF.push(module, 'f1157SPiRhEhqPWTkUq6j9e', 'enemy');
// scripts/enemy.js

"use strict";

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
    },
    init: function init(game) {
        this.game = game;
    },
    // use this for initialization
    onLoad: function onLoad() {
        this.hit = false;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        cc.log("Enemy is hit by bullet: " + (other.tag == 1));
        if (this.hit) return;
        this.hit = true;
        this.node.destroy();
        this.game.spawnEnemy();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();