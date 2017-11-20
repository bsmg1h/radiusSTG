(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f565FycQFGr6Li9YrLAlyE', 'game', __filename);
// scripts/game.js

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
        //加载子弹的Prefab素材
        bulletPrefab: {
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
        w: 0.1
    },

    //test
    spawnEnemy: function spawnEnemy() {
        cc.log("spawn new Enemy");
        var positionX = cc.randomMinus1To1() * this.node.width / 2;
        var positionY = cc.randomMinus1To1() * this.node.height / 2;
        var newEnemy = cc.instantiate(this.enemyPrefab);
        this.node.addChild(newEnemy);
        newEnemy.setPosition(cc.p(positionX, positionY));
        // pass Game instance to star
        newEnemy.getComponent('enemy').init(this);
    },
    test: function test() {
        this.node.width = 3;
    },

    // use this for initialization
    onLoad: function onLoad() {
        //总计时器
        this.T = 0;
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
    update: function update(dt) {
        this.deltaT += dt;
        this.T += dt;
        if (this.deltaT > this.bulletInterval) {
            //如果计时器大于子弹发射时间间隔，则发射子弹
            //计时器归零
            this.shootNewBullet(this.T - this.T % this.bulletInterval, 5);
            this.deltaT -= this.bulletInterval;
        }
    },

    shootNewBullet: function shootNewBullet(T, w) {
        for (var i = 0; i < w; ++i) {
            this.newBullets[i] = cc.instantiate(this.bulletPrefab);
            this.newBullets[i].getComponent("bullet").speed = 250;
            this.newBullets[i].getComponent("bullet").theta = this.T * this.T * Math.PI / 8 + 2 * Math.PI * i / w;
            this.newBullets[i].setPosition(cc.p(0, 0));
            this.node.addChild(this.newBullets[i]);
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
        //# sourceMappingURL=game.js.map
        