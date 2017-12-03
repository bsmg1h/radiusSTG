var GameScene = require('game');
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

    // use this for initialization
    onLoad: function () {
        this.gameMode = 0;
        cc.director.preloadScene('game', function () {
            cc.log('Next scene preloaded');
        });
    },
    playSTG: function() {
        this.gameMode = 1;
        this.playGame();
    },
    playPUBG: function() {
        this.gameMode = 2;
        this.playGame();
    },
    playGame: function () {
        var self = this;
        cc.director.loadScene('game', function(err, data) {
            var game = GameScene.instance;
            game.setGameMode(self.gameMode);
        });
    }
});
