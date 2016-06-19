(function($, fluid) {
    "use strict";

    fluid.defaults("demo.state.house", {
        gradeNames: "fluid.phaser.state",
        invokers: {
            preload: {
                funcName: "demo.state.house.preload",
                args: ["{demo.discoveryCat}.game"]
            },
            create: {
                funcName: "demo.state.house.create",
                args: ["{demo.discoveryCat}.game", "{that}"]
            },
            update: {
                funcName: "demo.state.house.update",
                args: ["{demo.discoveryCat}.game"]
            }
        }
    });

var cat, platforms, leftKey, rightKey, cursors;

    demo.state.house.preload = function(game) {
    };

    demo.state.house.create = function(game, that) {
        // Tip: Arrange functions in the order they will play write time also
        // functions

        // Tip: Put all var together anchor together animation together
        // code
        game.add.sprite(0, 0, "backgroundh");
        platforms = game.add.group();
        platforms.enableBody = true;
        platforms.physicsBodyType = Phaser.Physics.ARCADE;
        var floor1 = platforms.create(0, 200, "platformh");
        floor1.scale.setTo(0.8, 1);
        floor1.body.immovable = true;
        var floor2 = platforms.create(256, 440, "platformh");
        floor2.scale.setTo(0.8, 1);
        floor2.body.immovable = true;
        var ground = platforms.create(0, 675, "platformh");
        ground.body.immovable = true;
        // door or the room state, will make them buttons
        game.add.sprite(50, 38, "doorh", 0);
        game.add.sprite(425, 38, "doorh", 1);

        // player
        cat = game.add.sprite(500, 500, "catMoveh", 5);
        cat.scale.setTo(0.4, 0.4);
        game.physics.arcade.enable(cat);
        cat.body.bounce.y = 0.2;
        cat.body.gravity.y = 300;
        cat.body.collideWorldBounds = true;
        cat.animations.add("moveLeft",
            [0, 1, 2, 3], 10, true);
        cat.animations.add("moveRight",
            [4, 5, 6, 7], 10, true);
        // automitically populate the cursor key need not do for each key
        cursors = game.input.keyboard.createCursorKeys();
    };

    demo.state.house.update = function(game) {
        game.physics.arcade.collide(cat, platforms);
        if (cursors.left.isDown) {
            cat.body.velocity.x = -150;
            cat.animations.play("moveLeft");
        } else if (cursors.right.isDown) {
            cat.body.velocity.x = 150;
            cat.animations.play("moveRight");
        } else {
            cat.animations.stop();
            cat.body.velocity.x = 0;
        }
        if (cursors.up.isDown && cat.body.touching.down) {
            cat.body.velocity.y = -400;
        }
    };

})(jQuery, fluid);
