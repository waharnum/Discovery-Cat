(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.Preload", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.Preload.preload",
                args: ["{demo.discoveryCat}.game"]
            },
            create: {
                funcName: "demo.state.Preload.create",
                args: ["{demo.discoveryCat}.game"]
            },
            update: {
                funcName: "demo.state.Preload.update",
                args: []
            }
        }
    });

    demo.state.Preload.preload = function(game) {
        // Globally initializing Arcade Physics
        // After this adding physics specifically to each element in the game is required
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Loading bar to show status of loaded assets
        // args = x, y, spriteName
        // This is a predefined loading bar provided by Phaser
        var loadingBar = game.add.sprite(620, 360, "loading");
        loadingBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(loadingBar);

        // All assets of the game
        // Naming Convention spriteName + one character from level,
        // Ex: background for langPref(lp) is backgroundlp.
        // prelude assets
        game.load.image("backgrounds1", "assets/background-scene-1.png");
        game.load.image("ratHeads1", "assets/ratHead-scene-1.png");
        game.load.spritesheet("greenButton", "assets/gb.png", 200, 49);
        game.load.spritesheet("ratMoves1", "assets/ratMove-scene-1.png", 300, 202);
        // prelude2 assets
        game.load.image("yarnBalls2", "assets/yarnBall-scene-2.png");
        game.load.image("backgrounds2", "assets/background-scene-2.png");
        game.load.spritesheet("ratMoves2", "assets/ratMove-scene-2.png", 300, 202);
        game.load.spritesheet("catMoves2", "assets/catMove-scene-2.png", 400, 299);
        game.load.spritesheet("catReactions2", "assets/catReaction-scene-2.png", 400, 299);
        // langPref assets
        game.load.image("backgroundlp", "assets/background-langPref.png");
        game.load.spritesheet("catMovelp", "assets/catMove-langPref.png", 400, 299);
        game.load.spritesheet("buddiesMovelp", "assets/buddiesMove-langPref.png", 352, 429);
        game.load.spritesheet("ratAccessorieslp", "assets/ratAccessories-langPref.png", 200, 300);
        game.load.spritesheet("messageBoxlp", "assets/messageBox-langPref.png", 400, 127);
        // houseEntry uses same assets from langPref
        // house assets
        game.load.image("safeh", "assets/safe-house.png");
        game.load.image("backgroundh", "assets/background-house.png");
        game.load.image("platformh", "assets/platform-house.png");
        game.load.spritesheet("safeAsseth", "assets/safeAssets-house.png", 200, 157);
        game.load.spritesheet("doorh", "assets/doors-house.png", 200, 163);
        game.load.spritesheet("catMoveh", "assets/catMove-house.png", 162.5, 123);
        // sizePref assets
        game.load.image("backgroundsp", "assets/background-sizePref.png");
        game.load.image("envelopeForLettersp", "assets/envelopeForLetter-sizePref.png");
        game.load.image("letterEnvelopesp", "assets/letterEnvelope-sizePref.png");
        game.load.spritesheet("extraAssetsp", "assets/extraAssets-sizePref.png", 200, 120);
        game.load.spritesheet("letterAssetsp", "assets/letterAssets-sizePref.png", 400, 188);
        game.load.spritesheet("upDownButtonsp", "assets/upDownButtons-sizePref.png", 200, 186);
        game.load.spritesheet("goButtonsp", "assets/goButtons-sizePref.png", 200, 91);
        // colorPref assets
        game.load.image("backgroundcp", "assets/background-colorPref.png");
        game.load.image("popupScreencp", "assets/popupScreen-colorPref.png");
        game.load.spritesheet("extraAssetcp", "assets/extraAssets-colorPref.png", 200, 233);
        // simplifyPref assets
        game.load.image("assetsip", "assets/assets-simplifyPref.png");
        game.load.image("popupScreensip", "assets/popupScreen-simplifyPref.png");
        game.load.spritesheet("cellNewspapersip",
                                    "assets/cellNewspaper-simplifyPref.png", 500, 482);
        game.load.spritesheet("extraAssetsip", "assets/extraAssets-simplifyPref.png", 250, 218);
        game.load.spritesheet("scissorCutsip", "assets/scissors-simplifyPref.png", 150, 61);
        // soundPref assets
        game.load.image("backgroundsop", "assets/background-soundPref.png");
        game.load.image("popupScreensop", "assets/popupScreen-soundPref.png");
        game.load.spritesheet("assetsop", "assets/assets-soundPref.png", 300, 241);


        // message json files
        game.load.json("en-US", "messages/DiscoveryCat_en-US.json");
        game.load.json("es-MX", "messages/DiscoveryCat_es-MX.json");
        game.load.json("fr-FR", "messages/DiscoveryCat_fr-FR.json");
        game.load.json("de", "messages/DiscoveryCat_de-DE.json");

        // audio files
        game.load.audio("cChord", ["assets/C-Chord.mp3", "assets/C-Chord.ogg"]);
        game.load.audio("gChord", ["assets/G-Chord.mp3", "assets/G-Chord.ogg"]);
        game.load.audio("emChord", ["assets/Em-Chord.mp3", "assets/Em-Chord.ogg"]);
        game.load.audio("drum", ["assets/drum.mp3", "assets/drum.ogg"]);
        game.load.audio("trumpet", ["assets/trumpet.mp3", "assets/trumpet.ogg"]);

        // universal
        game.load.image("messageBoxAll", "assets/messageBox-allStates.png");
        game.load.image("messageBarAll", "assets/messageBar-allStates.png");
        game.load.spritesheet("popupAll", "assets/popups-AllStates.png", 700, 480);
        game.load.spritesheet("backpackButtonAll", "assets/backpackPanel-allStates.png", 150, 140);
        game.load.spritesheet("backpackIconAll", "assets/backpackIcons-allStates.png", 100, 51);

        // scripts
        game.load.script("grayFilter", "filters/GrayFilter.js");
        game.load.script("invertFilter", "filters/InvertFilter.js");
        game.load.script("colorMatrixFilter", "filters/ColorMatrixFilter.js");

        // pattern
        game.load.image("pattern", "assets/pattern.png");
    };

    demo.state.Preload.create = function(game) {
        game.state.start("prelude");
    };

    demo.state.Preload.update = function() {

    };

})(jQuery, fluid);
