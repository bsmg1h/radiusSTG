(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/bullet.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'abdbfBI/5xFD4OJBgKT+t0p', 'bullet', __filename);
// scripts/bullet.js

"use strict";

var bullet = cc.Class({
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
    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        cc.log("Bullet hit");
        this.node.destroy();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        // 子弹的位置按照行动路径更新
        this.node.x += this.speed * Math.cos(this.theta) * dt;
        this.node.y += this.speed * Math.sin(this.theta) * dt;
        // 若子弹超过边界则被摧毁
        if (Math.abs(this.node.x) > 480) {
            this.node.destroy();
        }
        if (Math.abs(this.node.y) > 320) {
            this.node.destroy();
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=bullet.js.map
        