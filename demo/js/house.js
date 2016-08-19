(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.house", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.house.preload",
                args: "{that}"
            },
            create: {
                funcName: "demo.state.house.create",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                            "{demo.discoveryCat}.textToSpeech"]
            },
            update: {
                funcName: "demo.state.house.update",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            sizeDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.sizeDoor", "{that}.sizeDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            colorDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.colorDoor", "{that}.colorDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            simplifyDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.simplifyDoor", "{that}.simplifyDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            soundDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.soundDoor", "{that}.soundDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.enterRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            safeNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.safe", "{that}.safeNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.safeNotif",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            yarnBallNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.yarnBall", "{that}.yarnBallNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.yarnBallNotif",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            mainExitDoorNotifFunc: {
                funcName: "demo.state.house.notifs",
                args: ["{that}", "{that}.mainExitDoor", "{that}.mainExitDoorNotif",
                                "{demo.discoveryCat}.textToSpeech",
                                    "{demo.discoveryCat}.prefModel.model.lang.obj.exitRoom",
                                    "{demo.discoveryCat}.prefModel.model"]
            },
            backpack: {
                funcName: "demo.state.house.backpack",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                                        "{demo.discoveryCat}.prefModel.model", "house"]
            },
            colorPrefFilter: {
                funcName: "demo.state.colorPref.contrastFilter",
                args: "{that}"
            },
            messageBarMovement: {
                funcName: "demo.state.house.messageBar",
                args: ["{that}", "{demo.discoveryCat}.textToSpeech",
                    "{demo.discoveryCat}.prefModel.model",
                    "{demo.discoveryCat}.prefModel.model.lang.obj.controlInstruction", 12000, 595]
            },
            stateEnterAnimation: {
                funcName: "demo.state.prelude.stateEnterAnimation",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model.position.catHousex",
                                    "{demo.discoveryCat}.prefModel.model.position.catHousey"]
            },
            storeCookie: {
                funcName: "demo.state.house.storeCookie",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                        "{demo.discoveryCat}.cookieStore"]
            },
            retrieveCookie: {
                funcName: "demo.state.house.retrieveCookie",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                                        "{demo.discoveryCat}.cookieStore"]
            },
            gameEndSafeAnimation: {
                funcName: "demo.state.house.gameEndSafeAnimation",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model"]
            },
            yarnBallFound: {
                funcName: "demo.state.sizePref.passcodeFound",
                args: ["{that}", "{demo.discoveryCat}.prefModel.model",
                        "{demo.discoveryCat}.textToSpeech",
                            "  Congo! Ball Found"]
            },
            catMovementUpdate: {
                funcName: "demo.state.sizePref.catMovementUpdate",
                args: ["{that}"]
            }
        }
    });

    demo.state.house.gameEndSafeAnimation = function(that, model) {
        if (that.physics.arcade.overlap(that.safe, that.cat) &&
                model.passcodeCollected.color &&
                     model.passcodeCollected.size &&
                         model.passcodeCollected.simplify &&
                             model.passcodeCollected.sound &&
                                !that.gameEndSafeAnimationBool) {
            that.gameEndSafeAnimationBool = true;
            that.safeNotif.visible = false;
            that.audioG.pause();

            that.time.events.add(0, function() {
                that.add.tween(that.popUp).to({ x: 0, y: -230 }, 2000,
                                    Phaser.Easing.Sinusoidal.InOut, true);
                that.add.tween(that.popDown).to({ x: 0, y: 722 }, 2000,
                                    Phaser.Easing.Sinusoidal.InOut, true);
            }, that);

            that.time.events.add(2500, function() {
                that.t1 = that.add.tween(that.safeDial).to({ angle: 270 }, 600,
                        Phaser.Easing.Sinusoidal.InOut, false).to({ angle: -180 }, 600,
                        Phaser.Easing.Sinusoidal.InOut, false).to({ angle: 200 }, 600,
                        Phaser.Easing.Sinusoidal.InOut, false);
                that.t1.start();
                that.add.tween(that.safeHandle).to({ angle: 720 }, 1800,
                                    Phaser.Easing.Sinusoidal.InOut, true);
            }, that);

            that.time.events.add(4500, function() {
                that.safe.visible = false;
                that.yarnBall.body.enableBody = true;
                that.openSafe.visible = true;
                that.yarnBallNotifAppear = true;
            }, that);
        }

    };

    // Though we might use it or not but still we have it in case we need it.
    demo.state.house.retrieveCookie = function(that, model, cookieStore) {
        // get with the cookieName which one to get
        that.cookie = cookieStore.get("discoveryCat");
        // We get identical object as we stored on retrieval
        model.count = that.cookie.count;
        model.size = that.cookie.size;
        model.contrast = that.cookie.contrast;
        model.simplify = that.cookie.simplify;
        model.sound = that.cookie.sound;
    };

    demo.state.house.storeCookie = function(that, model, cookieStore) {
        that.settings = {
            count: model.count,
            size: model.size,
            contrast: model.contrast,
            simplify: model.simplify,
            sound: model.sound
        };
        that.cookieOptions = {
            name: "discoveryCat",
            expires: 86400,
            path: "/"
        };
        cookieStore.set(that.settings, that.cookieOptions);
    };

    demo.state.house.backpack = function(that, speechComp, model, stateName) {
        // BackPack is made of 3 things this main backpack functions and 2 other
        // backpackIconSizeCallback and backpackIconSimplifyCallback functions
        // which could not be incorporated in this function unlike other because
        // these two were not general like others and required state specific details
        // of what all assets to render.

        // All sub backpack buttons
        // callbacks

        that.backpackIconSimplifyCallback = function() {
            if (model.simplify) {
                model.simplify = false;
                that.backpackIconSimplify.setFrames(3, 2, 2);
            } else {
                model.simplify = true;
                that.backpackIconSimplify.setFrames(3, 4, 4);
            }
            that.audioG.pause();
            that.audioC.pause();
            that.audioEm.pause();
            if (stateName === "house") {
                model.position.catHousex = that.cat.x;
                model.position.catHousey = that.cat.y;
            }
            that.state.start(stateName);
        };

        that.backpackIconSizeCallback = function() {
            // Remove current image in the button
            that.backpackIconSize.removeChild(that.backpackIconSizeChild);
            if (model.size === 1) {
                model.size = 1.1;
                // Add new image in the button
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 5);
                that.backpackIconSize.addChild(that.backpackIconSizeChild);
            } else if (model.size === 1.1) {
                model.size = 1.2;
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 6);
                that.backpackIconSize.addChild(that.backpackIconSizeChild);
            } else {
                model.size = 1;
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 4);
                that.backpackIconSize.addChild(that.backpackIconSizeChild);
            }
            that.audioG.pause();
            that.audioC.pause();
            that.audioEm.pause();
            if (stateName === "house") {
                model.position.catHousex = that.cat.x;
                model.position.catHousey = that.cat.y - 50;
            }
            that.state.start(stateName);
            // SOLUTION TAKE CAT POSITION AND RERENDER WHOLE SCENE
        };


        that.backpackIconAudioCallback = function() {
            if (that.sound.mute) {
                that.sound.mute = false;
                that.backpackIconAudio.setFrames(3, 2, 2);
                model.music = true;
            } else {
                that.sound.mute = true;
                that.backpackIconAudio.setFrames(3, 4, 4);
                // Because if we mute music will stop
                model.music = false;
            }
        };

        that.backpackIconVoiceCallback = function() {
            // volume is not taken as an option but a model thus we have used
            // change applier here for our work which involved changed changing
            // the utterance option of volume to volume.
            // Initially the utteranceOpts.volume has value undefined and then
            // we give it value 0 or 1 thus we have included both conditions in the "if".
            if (speechComp.model.utteranceOpts.volume === 0 ||
                                     typeof(speechComp.model.utteranceOpts.volume) === undefined) {
                speechComp.applier.change("utteranceOpts.volume", 1);
                that.backpackIconVoice.setFrames(3, 2, 2);
                model.voice = true;
            } else {
                speechComp.applier.change("utteranceOpts.volume", 0);
                that.backpackIconVoice.setFrames(3, 4, 4);
                model.voice = false;
            }
        };

        that.backpackIconColorCallback = function() {
            if (model.contrast === false) {
                that.colorPrefFilter();
                that.backpackIconColor.removeChild(that.backpackIconColorChild);
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 0);
                that.backpackIconColor.addChild(that.backpackIconColorChild);
                model.contrast = true;
            } else {
                that.world.filters = null;
                // First removing child to destroy chance of having sprite overlap
                that.backpackIconColor.removeChild(that.backpackIconColorChild);
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 8);
                that.backpackIconColor.addChild(that.backpackIconColorChild);
                model.contrast = false;
            }
            that.audioG.pause();
            that.audioC.pause();
            that.audioEm.pause();
            if (stateName === "house") {
                model.position.catHousex = that.cat.x;
                model.position.catHousey = that.cat.y;
            }
            that.state.start(stateName);
        };

        that.backpackIconSoundCallback = function() {
            if (model.sound) {
                model.sound = false;
                that.backpackIconSound.setFrames(3, 4, 4);
            } else {
                model.sound = true;
                that.backpackIconSound.setFrames(3, 2, 2);
            }
        };

        // Background for the backpack bar
        that.bg = that.add.sprite(0, 720, "backgroundbp");

        // 52, 44, 36, 28, 20
        // Black bar will always be above the button so it shows below the button.
        that.blackBar = that.add.sprite(69, 786, "popupScreensop");
        that.blackBar.anchor.setTo(0, 0.5);
        that.blackBar.scale.setTo(0, 0.136);

        // Decoy Sprite for showing selection when using q and w for navigation.
        that.decoySprite = that.add.sprite(175, 784, "backpackButtonAll", 3);
        that.decoySprite.anchor.setTo(0.5, 0.5);
        that.decoySprite.scale.setTo(0.8, 0.8);
        that.decoySprite.visible = false;

        // Decalaring all sub buttons
        // Not scaling these
        // General

        that.backpackIconAudio = that.add.button(175, 784, "backpackButtonAll",
                                        that.backpackIconAudioCallback, that, 3, 2, 2);
        that.backpackIconAudio.anchor.setTo(0.5, 0.5);
        that.backpackIconAudio.scale.setTo(0.8, 0.8);
        that.backpackIconAudio.addChild(that.add.sprite(-45, -25, "backpackIconAll", 2));
        if (model.music) {
            that.backpackIconAudio.setFrames(3, 2, 2);
        } else {
            that.backpackIconAudio.setFrames(3, 4, 4);
        }
        that.backpackIconAudio.visible = false;

        that.backpackIconVoice = that.add.button(275, 784, "backpackButtonAll",
                                        that.backpackIconVoiceCallback, that, 3, 2, 2);
        that.backpackIconVoice.anchor.setTo(0.5, 0.5);
        that.backpackIconVoice.scale.setTo(0.8, 0.8);
        that.backpackIconVoice.addChild(that.add.sprite(-50, -25, "backpackIconAll", 3));
        if (model.voice) {
            that.backpackIconVoice.setFrames(3, 2, 2);
        } else {
            that.backpackIconVoice.setFrames(3, 4, 4);
        }
        that.backpackIconVoice.visible = false;

        // that.pointer is to ensure that all the backpack icons are in position and appear
        // only when the room has been visited. It is to maintain order of icons in the prefBar
        that.pointer = 375;

        if (model.visited.sound) {
            that.backpackIconSound = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconSoundCallback, that, 3, 2, 2);
            that.backpackIconSound.scale.setTo(0.8, 0.8);
            that.backpackIconSound.anchor.setTo(0.5, 0.5);
            that.backpackIconSound.addChild(that.add.sprite(-50, -25, "backpackIconAll", 7));
            if (model.sound) {
                that.backpackIconSound.setFrames(3, 2, 2);
            } else {
                that.backpackIconSound.setFrames(3, 4, 4);
            }
            that.pointer = that.pointer + 100;

            that.backpackIconSound.visible = false;
        }
        if (model.visited.size) {
            that.backpackIconSize = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconSizeCallback, that, 3, 2, 2);
            that.backpackIconSize.anchor.setTo(0.5, 0.5);
            that.backpackIconSize.scale.setTo(0.8, 0.8);
            if (model.size === 1) {
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 4);
            } else if (model.size === 1.1) {
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 5);
            } else {
                that.backpackIconSizeChild = that.add.sprite(-50, -25, "backpackIconAll", 6);
            }
            that.backpackIconSize.addChild(that.backpackIconSizeChild);
            that.pointer = that.pointer + 100;

            that.backpackIconSize.visible = false;
        }
        if (model.visited.color) {
            that.backpackIconColor = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconColorCallback, that, 3, 2, 2);
            that.backpackIconColor.anchor.setTo(0.5, 0.5);
            that.backpackIconColor.scale.setTo(0.8, 0.8);
            if (model.contrast) {
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 0);
            } else {
                that.backpackIconColorChild = that.add.sprite(-50, -25, "backpackIconAll", 8);
            }
            that.backpackIconColor.addChild(that.backpackIconColorChild);
            that.pointer = that.pointer + 100;

            that.backpackIconColor.visible = false;
        }

        if (model.visited.simplify) {
            that.backpackIconSimplify = that.add.button(that.pointer, 784, "backpackButtonAll",
                                            that.backpackIconSimplifyCallback, that, 3, 2, 2);
            that.backpackIconSimplify.anchor.setTo(0.5, 0.5);
            that.backpackIconSimplify.scale.setTo(0.8, 0.8);
            that.backpackIconSimplify.addChild(that.add.sprite(-50, -22, "backpackIconAll", 1));
            if (model.simplify) {
                that.backpackIconSimplify.setFrames(3, 2, 2);
            } else {
                that.backpackIconSimplify.setFrames(3, 4, 4);
            }
            that.pointer = that.pointer + 100;

            that.backpackIconSimplify.visible = false;
        }

        // This is for alt to shrink and expand backpack on its press.

        // This is bool for if the list is in expanded state
        that.expandBool = false;

        // selection sake
        that.backpackCount = 1;
        that.backpackList = ["audio", "voice"];

        // Populate list with properties that are present(visited).
        for (var item in model.visited) {
            if (model.visited[item] === true && item !== "house") {
                that.backpackList.push(item);
            }
        }

        that.blackBarScaleX = (20 + (8 * (that.backpackList.length - 2))) / 100;

        that.travelBackpackList = function(bool) {
            for (var i = 0; i < that.backpackList.length; i++) {
                if (that.backpackList[i] === "size") {
                    that.backpackIconSize.visible = bool;
                }
                if (that.backpackList[i] === "color") {
                    that.backpackIconColor.visible = bool;
                }
                if (that.backpackList[i] === "simplify") {
                    that.backpackIconSimplify.visible = bool;
                }
                if (that.backpackList[i] === "sound") {
                    that.backpackIconSound.visible = bool;
                }
                if (that.backpackList[i] === "voice") {
                    that.backpackIconVoice.visible = bool;
                }
                if (that.backpackList[i] === "audio") {
                    that.backpackIconAudio.visible = bool;
                }
            }
        };

        that.expandShrinkBackpack = function() {
            if (!that.expandBool) {
                that.add.tween(that.blackBar.scale).to({ x: that.blackBarScaleX, y: 0.136 },
                                    200, Phaser.Easing.Sinusoidal.InOut, true);
                that.cat.frame = 8;
                that.decoySprite.visible = true;
                that.travelBackpackList(true);
                that.expandBool = true;
                // Keys are first removed from their captures.
                that.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
                that.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
                that.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

                // New functions are assigned to keys
                that.right = that.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                that.left = that.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                that.right.onDown.add(that.changeSelectionBackpackRight, that);
                that.left.onDown.add(that.changeSelectionBackpackLeft, that);
                that.enter.onDown.add(that.acceptSelectionBackpack, that);
            } else {
                that.add.tween(that.blackBar.scale).to({ x: 0, y: 0.136 },
                                    200, Phaser.Easing.Sinusoidal.InOut, true);
                that.cat.frame = 5;
                that.decoySprite.visible = false;
                that.travelBackpackList(false);
                that.expandBool = false;

                that.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
                that.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
                that.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
                that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                that.cursors = that.input.keyboard.createCursorKeys();
                that.backpackShimForEnter();
                that.backpackShimForLangPref();
            }
        };

        that.expandShrinkBackpackClick = function() {
            if (!that.expandBool) {
                that.add.tween(that.blackBar.scale).to({ x: that.blackBarScaleX, y: 0.136 },
                                    200, Phaser.Easing.Sinusoidal.InOut, true);
                that.cat.frame = 8;
                that.decoySprite.visible = false;
                that.travelBackpackList(true);
                that.expandBool = true;
                // Keys are first removed from their captures.
                that.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
                that.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
                that.input.keyboard.removeKey(Phaser.Keyboard.ENTER);

                // New functions are assigned to keys
                that.right = that.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                that.left = that.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                that.right.onDown.add(that.changeSelectionBackpackRight, that);
                that.left.onDown.add(that.changeSelectionBackpackLeft, that);
                that.enter.onDown.add(that.acceptSelectionBackpack, that);
            } else {
                that.add.tween(that.blackBar.scale).to({ x: 0, y: 0.136 },
                                    200, Phaser.Easing.Sinusoidal.InOut, true);
                that.cat.frame = 5;
                that.decoySprite.visible = false;
                that.travelBackpackList(false);
                that.expandBool = false;

                that.input.keyboard.removeKey(Phaser.Keyboard.RIGHT);
                that.input.keyboard.removeKey(Phaser.Keyboard.LEFT);
                that.input.keyboard.removeKey(Phaser.Keyboard.ENTER);
                that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);
                that.cursors = that.input.keyboard.createCursorKeys();
                that.backpackShimForEnter();
                that.backpackShimForLangPref();
            }
        };

        // When the selection popUp of the screens are open then enter should be
        //  mapped to the go button on the screen and here we have kept care of that.
        that.backpackShimForEnter = function() {
            if (that.aisleScreenAppearBool || that.newspaperScreenAppearBool ||
                that.standScreenAppearBool || that.envelopeScreenAppearBool) {
                that.enter.onDown.add(that.goButtonCallback, that);
            }
        };

        that.backpackShimForLangPref = function() {
            if (stateName === "langPref") {
                that.enter.onDown.addOnce(that.acceptSelection, that);
            }
        };

        that.acceptSelectionBackpack = function() {
            // So that selections start happening only once user has started selecting
            if (that.decoySprite.visible) {
                that.prop = that.backpackList[that.backpackCount - 1];
                if (that.prop === "size") {
                    that.backpackIconSizeCallback();
                }
                if (that.prop === "color") {
                    that.backpackIconColorCallback();
                }
                if (that.prop === "simplify") {
                    that.backpackIconSimplifyCallback();
                }
                if (that.prop === "sound") {
                    that.backpackIconSoundCallback();
                }
                if (that.prop === "voice") {
                    that.backpackIconVoiceCallback();
                }
                if (that.prop === "audio") {
                    that.backpackIconAudioCallback();
                }
            }
        };

        that.changeSelectionBackpackLeft = function() {
            that.backpackCount--;
            that.decoySprite.visible = true;
            if (that.backpackCount === 0) {
                that.backpackCount = that.backpackList.length;
                that.decoySprite.x = that.decoySprite.x +
                                        (100 * (that.backpackList.length - 1));
                return;
            }
            that.decoySprite.x = that.decoySprite.x - 100;
        };

        that.changeSelectionBackpackRight = function() {
            that.backpackCount++;
            that.decoySprite.visible = true;
            if (that.backpackCount === (that.backpackList.length + 1)) {
                that.backpackCount = 1;
                that.decoySprite.x = 175;
                return;
            }
            that.decoySprite.x = that.decoySprite.x + 100;
        };

        // Just the big backpack Icon that is present leftmost.
        // Reason for declaring it here in the bottom is to make that.expandShrinkBackpack
        // work for it.
        that.backpackButton = that.add.button(70, 786, "backpackButtonAll",
                                        that.expandShrinkBackpackClick, that, 1, 0, 0);
        that.backpackButton.anchor.setTo(0.5, 0.5);
        that.backpackButton.scale.setTo(0.9, 0.9);


        that.alt = that.input.keyboard.addKey(Phaser.Keyboard.ALT);
        that.alt.onDown.add(that.expandShrinkBackpack, that);

    };

    demo.state.house.messageBar = function(that, speechComp, model, message, time, y) {
        that.messageBar = that.add.sprite(0, y, "messageBarAll");
        // It is just a bit small in size so to make it fit the screen.
        that.messageBar.scale.setTo(1.001, 1);
        that.messageBarText = that.add.text(50, 40, message);
        that.messageBarText.scale.setTo(model.size, model.size);
        that.messageBar.addChild(that.messageBarText);
        speechComp.queueSpeech(message, true, { lang: model.lang.type });
        that.time.events.add(time, that.messageBar.destroy, that.messageBar);
    };

    // Message Option added Fix
    demo.state.house.notifs = function(that, element, elementNotif, speechComp, message, model) {
        if (that.physics.arcade.overlap(element, that.cat) &&
                                                    elementNotif.alpha === 0) {
            that.add.tween(elementNotif).to({ alpha: 1 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
            speechComp.queueSpeech(message, true, { lang: model.lang.type });
        }

        if (!that.physics.arcade.overlap(element, that.cat) &&
                                                    elementNotif.alpha === 1) {
            that.add.tween(elementNotif).to({ alpha: 0 },
                            800, Phaser.Easing.Sinusoidal.InOut, true);
        }

    };

    // Phaser functions
    demo.state.house.preload = function() {
    };

    demo.state.house.create = function(that, model, speechComp) {
        // Audio
        that.audioG = that.add.audio("gChord");
        that.audioC = that.add.audio("cChord");
        that.audioEm = that.add.audio("emChord");

        // Audio to play
        that.audioG.play("", 0, 0.1, true);

        // We could have put this background color in the if..else just below but
        // we thought we should have a background color always so that bacckground
        // color from other levels dont always keep on changing the background,
        // because raw background color is present in the backpack region.
        that.stage.backgroundColor = "#f36f46";

        // Ensuring simplify Pref
        if (!model.simplify) {
            that.background = that.add.sprite(0, 0, "backgroundh");
        }

        if (model.simplify && model.contrast) {
            that.stage.backgroundColor = "#a8a8a8";
        }

        // Ensuring color Pref
        if (model.contrast) {
            that.colorPrefFilter();
        }

        if (!model.music) {
            that.sound.mute = true;
        }

        if (!model.voice) {
            speechComp.applier.change("utteranceOpts.volume", 0);
        }
        // Size implemented throughly using model.size

        // Sound implementation remaining

        // Create platforms group and added arcade physics to it
        that.platforms = that.add.group();
        that.platforms.enableBody = true;
        that.platforms.physicsBodyType = Phaser.Physics.ARCADE;

        // Add floor1 to platforms and made it immovable
        that.floor1 = that.platforms.create(0, 200, "platformh");
        that.floor1.scale.setTo(0.8, 1);
        that.floor1.body.immovable = true;

        // Add floor2 to platforms and made it immovable
        that.floor2 = that.platforms.create(256, 440, "platformh");
        that.floor2.scale.setTo(0.8, 1);
        that.floor2.body.immovable = true;

        // Add ground to platforms and made it immovable
        that.ground = that.platforms.create(0, 675, "platformh");
        that.ground.body.immovable = true;

        // Safe with yarn balls
        that.safeDial = that.add.sprite(0, -110, "safeAsseth", 0);
        that.safeDial.anchor.setTo(0.5, 0.5);
        that.safeDial.scale.setTo(0.4, 0.4);
        that.safeHandle = that.add.sprite(0, -50, "safeAsseth", 1);
        that.safeHandle.anchor.setTo(0.5, 0.5);
        that.safeHandle.scale.setTo(0.4, 0.4);
        that.safeRotater = that.add.sprite(45, -80, "safeAsseth", 2);
        that.safeRotater.anchor.setTo(0.5, 0.5);
        that.safeRotater.scale.setTo(0.4, 0.4);
        that.safe = that.add.sprite(450, 675, "doorh", 2);
        that.safe.anchor.setTo(0.5, 1);
        that.safe.addChild(that.safeDial);
        that.safe.addChild(that.safeHandle);
        that.safe.addChild(that.safeRotater);
        that.safe.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.safe);
        that.safe.body.immovable = true;


        that.openSafe = that.add.sprite(450, 675, "doorh", 3);
        that.openSafe.anchor.setTo(0.5, 1);
        that.yarnBall = that.add.sprite(-5, -90, "safeAsseth", 3);
        that.physics.arcade.enable(that.yarnBall);
        that.yarnBall.body.immovable = true;
        that.yarnBall.enableBody = false;
        that.yarnBall.scale.setTo(0.5, 0.5);
        that.openSafe.addChild(that.yarnBall);
        that.openSafe.scale.setTo(model.size, model.size);
        that.openSafe.visible = false;


        // door or the room state, will see them for collision
        // Entry Door
        that.add.sprite(50, 38, "doorh", 0);
        // Size Pref Door
        that.sizeDoor = that.add.sprite(460, 200, "doorh", 1);
        that.sizeDoor.anchor.setTo(0.5, 1);
        if (model.passcodeCollected.size) {
            that.sizeDoor.addChild(that.add.text(-55, -130, " **\nAC",
                                            { font: "50px Arial", fill: "#fff" }));
        }
        that.sizeDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.sizeDoor);
        that.sizeDoor.body.immovable = true;
        // Color Pref Door
        that.colorDoor = that.add.sprite(830, 200, "doorh", 1);
        that.colorDoor.anchor.setTo(0.5, 1);
        if (model.passcodeCollected.color) {
            that.colorDoor.addChild(that.add.text(-57, -130, " **\n KL",
                                            { font: "50px Arial", fill: "#fff" }));
        }
        that.colorDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.colorDoor);
        that.colorDoor.body.immovable = true;
        // Simplify Pref Door
        that.simplifyDoor = that.add.sprite(460, 440, "doorh", 1);
        that.simplifyDoor.anchor.setTo(0.5, 1);
        if (model.passcodeCollected.simplify) {
            that.simplifyDoor.addChild(that.add.text(-55, -130, " **\nMB",
                                            { font: "50px Arial", fill: "#fff" }));
        }
        that.simplifyDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.simplifyDoor);
        that.simplifyDoor.body.immovable = true;
        // Sounds Pref Door
        that.soundDoor = that.add.sprite(830, 440, "doorh", 1);
        that.soundDoor.anchor.setTo(0.5, 1);
        if (model.passcodeCollected.sound) {
            that.soundDoor.addChild(that.add.text(-57, -130, " **\nGH",
                                            { font: "50px Arial", fill: "#fff" }));
        }
        that.soundDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.soundDoor);
        that.soundDoor.body.immovable = true;
        // Main Exit Door
        that.mainExitDoor = that.add.sprite(1065, 675, "doorh", 1);
        that.mainExitDoor.anchor.setTo(0.5, 1);
        that.mainExitDoor.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.mainExitDoor);
        that.mainExitDoor.body.immovable = true;

        // Cat
        that.cat = that.add.sprite(model.position.catHousex,
                                        model.position.catHousey, "catMoveh", 5);
        that.cat.scale.setTo(model.size, model.size);
        that.physics.arcade.enable(that.cat);
        that.cat.body.bounce.y = 0.2;
        that.cat.body.gravity.y = 1000;
        that.cat.body.collideWorldBounds = true;
        that.cat.animations.add("moveLeft",
            [0, 1, 2, 3], 10, true);
        that.cat.animations.add("moveRight",
            [4, 5, 6, 7], 10, true);

        // This is present here to rearrange the order as the notifs were
        // coming below this popup.
        that.popUp = that.add.sprite(0, -800, "popupScreensop");
        that.popDown = that.add.sprite(0, 840, "popupScreensop");

        // automatically populate the cursor key define each key
        that.cursors = that.input.keyboard.createCursorKeys();
        that.enter = that.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        // Notif size pref door
        that.sizeDoorNotif = that.add.sprite(440, 125, "messageBoxAll", 0);
        that.sizeDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.sizeDoorNotif.anchor.setTo(0.5, 1);
        that.sizeDoorNotif.scale.setTo(model.size, model.size);
        that.sizeDoorNotif.alpha = 0;
        // Notif color pref door
        that.colorDoorNotif = that.add.sprite(805, 125, "messageBoxAll", 0);
        that.colorDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.colorDoorNotif.anchor.setTo(0.5, 1);
        that.colorDoorNotif.scale.setTo(model.size, model.size);
        that.colorDoorNotif.alpha = 0;
        // Notif simplify pref door
        that.simplifyDoorNotif = that.add.sprite(435, 339, "messageBoxAll", 0);
        that.simplifyDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.simplifyDoorNotif.anchor.setTo(0.5, 1);
        that.simplifyDoorNotif.scale.setTo(model.size, model.size);
        that.simplifyDoorNotif.alpha = 0;
        // Notif sound pref door
        that.soundDoorNotif = that.add.sprite(805, 339, "messageBoxAll", 0);
        that.soundDoorNotif.addChild(that.add.text(-50, -100, model.lang.obj.enterRoom));
        that.soundDoorNotif.anchor.setTo(0.5, 1);
        that.soundDoorNotif.scale.setTo(model.size, model.size);
        that.soundDoorNotif.alpha = 0;
        // Notif safe
        that.safeNotif = that.add.sprite(450, 570, "messageBoxAll", 0);
        that.safeNotif.addChild(that.add.text(-75, -100, model.lang.obj.safeNotif));
        that.safeNotif.anchor.setTo(0.5, 1);
        that.safeNotif.scale.setTo(model.size, model.size);
        that.safeNotif.alpha = 0;
        // Yarn Ball Notif
        that.yarnBallNotif = that.add.sprite(480, 570, "messageBoxAll", 0);
        that.yarnBallNotif.addChild(that.add.text(-75, -100, model.lang.obj.yarnBallNotif));
        that.yarnBallNotif.anchor.setTo(0.5, 1);
        that.yarnBallNotif.scale.setTo(model.size, model.size);
        that.yarnBallNotif.alpha = 0;
        // Notif mainExitDoor
        that.mainExitDoorNotif = that.add.sprite(1045, 500, "messageBoxAll", 0);
        that.mainExitDoorNotif.addChild(that.add.text(-70, -60, model.lang.obj.exitRoom));
        that.mainExitDoorNotif.anchor.setTo(0.5, 1);
        that.mainExitDoorNotif.scale.setTo(model.size, model.size);
        that.mainExitDoorNotif.alpha = 0;

        // To make endGameAnimation work
        that.gameEndSafeAnimationBool = false;
        that.yarnBallFoundBool = false;
        that.yarnBallNotifAppear = false;

        // This is for the backpack menu
        that.backpack();

        // To display movement controls to the user at the start of the game
        if (!model.visited.house) {
            that.messageBarMovement();
        }
        // Now user has visited the house
        model.visited.house = true;

        that.stateEnterAnimation();
    };

    demo.state.house.update = function(that, model) {
        // this keeps seperation between platforms and cat or else the cat would
        // pass the ground and stop at the bounds
        that.physics.arcade.collide(that.cat, that.platforms);

        // overlap checks if the sizeDoor and the cat are overlapping each other
        // and at the same time the pressing ENTER makes cat move into room.
        // These -20 in cats y position because if cat increases its size inside room
        // and comes out it will again fall to the floor below.
        if (that.physics.arcade.overlap(that.sizeDoor, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y - 50;
            that.state.start("sizePref");
        }

        if (that.physics.arcade.overlap(that.colorDoor, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y - 50;
            that.state.start("colorPref");
        }

        if (that.physics.arcade.overlap(that.simplifyDoor, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y - 50;
            that.state.start("simplifyPref");
        }

        if (that.physics.arcade.overlap(that.soundDoor, that.cat) && that.enter.isDown &&
                                                                        !that.expandBool) {
            that.audioG.pause();
            model.position.catHousex = that.cat.x;
            model.position.catHousey = that.cat.y - 50;
            that.state.start("soundPref");
        }

        that.gameEndSafeAnimation();

        // This extra yarnBallNotifAppear is a endtime fix, the Bool we had
        // had for the Notif we used here. This ensures that yarnBall is not
        // picked up before safe opens
        if (that.physics.arcade.overlap(that.yarnBall, that.cat) &&
                                                !that.yarnBallFoundBool &&
                                                    that.enter.isDown &&
                                                        !that.expandBool &&
                                                            that.yarnBallNotifAppear) {
            that.yarnBall.visible = false;
            that.yarnBallFound();
            that.yarnBallFoundBool = true;
            that.yarnBallNotif.visible = false;
        }

        if (that.yarnBallFoundBool) {
            that.mainExitDoorNotifFunc();
        }

        if (that.physics.arcade.overlap(that.mainExitDoor, that.cat) &&
                            that.yarnBallFoundBool &&
                                that.enter.isDown &&
                                    !that.expandBool) {
            that.audioG.pause();
            that.storeCookie();
            that.state.start("endingScreen");
        }

        that.catMovementUpdate();

        // Size Door Notif
        that.sizeDoorNotifFunc();

        // Color Door Notif
        that.colorDoorNotifFunc();

        // Simplify Door Notif
        that.simplifyDoorNotifFunc();

        // Sound Door Notif
        that.soundDoorNotifFunc();

        // Safe Notif
        that.safeNotifFunc();

        // yarn Ball Notif
        if (that.yarnBallNotifAppear) {
            that.yarnBallNotifFunc();
        }

        // This will come only after user has collected the yarn Ball
        if (that.yarnBallFoundBool) {
            that.mainExitDoorNotifFunc();
        }

    };

})(jQuery, fluid);
