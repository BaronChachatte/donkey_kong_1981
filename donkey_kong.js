import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

/*context*/
const fall = 500
const speed = 1.7
const climbing_speed = 0.1

kaboom({
    global: true,
    fullscreen: true,
    width: 600,
    height: 450,
    background: [0, 0, 0,],
    scale: 1.5,
    crisp: true,
})

/*assets*/
loadSpriteAtlas("sprites/mario/Mario.png", {
    "mario": {
        x: 0,
        y: 0,
        width: 588,
        height: 100,
        sliceX: 6,
        anims: {
            idle_right: { from: 0, to: 0 },
            idle_left: { from: 1, to: 1 },
            run_right: { from: 2, to: 3, loop: true, speed: 5 },
            run_left: { from: 4, to: 5, loop: true, speed: 5 },
        },
    },
})
// sprite DK
loadSpriteAtlas("sprites/donkey_kong/DK.png", {
    "DK": {
        x: 0,
        y: 0,
        width: 2400,
        height: 250,
        sliceX: 6,
        anims: {
            beating: { from: 0, to: 1, loop: true, speed: 5 },
            baril_drop: { from: 2, to: 5, speed: 5 },
        },
    },
})
loadSpriteAtlas("sprites/obstacles/barrel.png", {
    "barrel": {
        x: 0,
        y: 0,
        width: 360,
        height: 90,
        sliceX: 4,
        anims: { from: 0, to: 3, loop: true, speed: 5 }
    }
});
loadSprite("floor", "sprites/map/floor_size_1.png");
loadSprite("floor_solid", "sprites/map/floor_solid_size_1.png");
loadSprite("ladder", "sprites/map/ladder_size_1.png");
loadSprite("oil_drum", "sprites/map/oil_drum_1.png");
loadSprite("straight_barrel_x4", "sprites/map/straight_barrel_x4.png");
loadSprite("heart", "sprites/misc/heart.png");
loadSprite("running_princess_right_2", "sprites/princess/running_princess_right_2.png");
loadSprite("running_mario_left_2", "sprites/mario/running_mario_left_2.png");
loadSprite("standing_donkey_kong", "sprites/donkey_kong/standing_donkey_kong.png");

/*intro*/
scene("intro", () => {
    /*keybindings*/
    add([
        text("Press 'left' or 'right' to move left or right!"),
        pos(width() / 2, height() / 2 - 160),
        scale(0.25),
        origin("center"),
    ]);

    add([
        text("Press 'space' to jump!"),
        pos(width() / 2, height() / 2 - 80),
        scale(0.25),
        origin("center"),
    ]);

    add([
        text("Press 'up' or 'down' to climb or climb down ladders!"),
        pos(width() / 2, height() / 2),
        scale(0.25),
        origin("center"),
    ]);

    add([
        text("Press 'Enter' to play!"),
        pos(width() / 2, height() / 2 + 120),
        scale(0.40),
        origin("center"),
    ]);


    /*go to game*/
    onKeyPress("enter", () => go("game"));
})

/*game*/
scene("game", () => {
    gravity(250);

    /* game layers */
    layers([
        "background",
        "game",
        "ui",
    ], "game")

    /* spawn mario */
    const mario = add([
        sprite("mario"),
        pos(60, 379),
        area(),
        body(),
        scale(0.32),
        health(3),
        layer("game"),
    ])

    /*mario jump*/
    function jump() {
        if (mario.isGrounded()) {
            mario.jump(120);
        }
    }

    onKeyPress("space", jump);

    // DK
    const DK = add([
        sprite("DK"),
        pos(100, 22),
        layer("game"),
        scale(0.25),
    ])

    DK.play("beating")

    /*mario animations*/
    onUpdate(() => {
        const curAnim = mario.curAnim()

        if (isKeyDown("left")) {
            if (curAnim !== "run_left") {
                mario.play("run_left")
            }
            mario.pos.x -= speed
        }

        else if (isKeyDown("right")) {
            if (curAnim !== "run_right") {
                mario.play("run_right")
            }
            mario.pos.x += speed
        }

        else {
            if (curAnim) {
                var directionAnim = curAnim.split('_')[1];
                mario.play('idle_' + directionAnim)
            }
        }
    })

    mario.play("idle_right")

    /*princess*/
    const princess = add([
        sprite("running_princess_right_2"),
        pos(245, 5),
        area(),
        scale(0.35),
        "princess"
    ])

    /*ladders and collide zones*/

    /* [first rung x, first rung y, number of rung, collide zone x, collide zone y] */
    var arr_ladder = [
        [420, 401, 5, [416, 336]],  /*rez-de-chaussee*/

        [135, 335, 5, [251, 263]],  /*1st floor*/
        [255, 343, 7, [131, 270]],

        [285, 277, 7, [281, 197]],  /*2nd floor*/
        [420, 269, 5, [416, 204]],

        [210, 207, 6, [131, 137]],  /*3rd floor*/
        [135, 203, 5, [206, 134]],

        [420, 137, 5, [416, 71]],  /*4th floor*/

        [315, 81, 5, [311, 16]],  /*5th floor*/
    ];

    /*ladder scale*/
    var height_ladder = 21 * 0.35;

    /*add ladders and collide zones*/
    arr_ladder.forEach(function (each_ladder) {
        for (var i = 0; i < each_ladder[2]; i++) {
            add([
                sprite("ladder"),
                pos(each_ladder[0], each_ladder[1] - i * height_ladder),
                area(),
                scale(0.35),
                'ladder',
                layer("background"),
            ])

            add_zone(
                'tagZone_' + each_ladder[3][0] + '_' + each_ladder[3][1],
                each_ladder[3][0],
                each_ladder[3][1]
            );
        }
    })

    var getLadders = get('ladder');

    /*collide zones*/
    function add_zone(tag_name, pos_x, pos_y) {
        /* external collide zone */
        add([
            rect(72, 96),
            pos(pos_x - 24, pos_y - 24),
            tag_name + '_externe',
            area(),
            color(127, 200, 255),
            opacity(0),  /* set opacity !=0 for debug */
        ])

        /* internal collide zone */
        add([
            rect(24, 48),
            pos(pos_x, pos_y),
            tag_name,
            area(),
            color(127, 200, 255),
            opacity(0),  /* set opacity !=0 for debug */
        ])
    }

    /*mario collide/not collide zone callback*/
    function collide_zone(tag_name, cb) {
        mario.onCollide(tag_name, () => {
            cb();
        })
    }

    function not_collide_zone(tag_name, cb) {
        mario.onCollide(tag_name + '_externe', () => {
            cb();
        })
    }

    // collide_zone('tagZone', () => {
    //     console.log('remove')
    // })

    // not_collide_zone('tagZone', () => {
    //     console.log('add')
    // })

    /*climb ladders*/
    mario.onUpdate(() => {
        getLadders.forEach(function (each_ladder) {
            if (mario.isTouching(each_ladder)) {
                if (isKeyDown("up")) {
                    mario.pos.y -= climbing_speed;
                    mario.jump(100);
                }

                else if (isKeyDown("down")) {
                    mario.pos.y += climbing_speed;
                }
            }
        })
    })

    /*level*/
    addLevel([
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "    4                                 ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $----                  ",
        "                ======                ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "             ===                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "     --------------                   ",
        "     ==============---                ",
        "                   ===---             ",
        "                      ===--           ",
        "                         ===  -       ",
        "                            ===       ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                               --     ",
        "                            ---==     ",
        "                $        ---===       ",
        "                      ---===          ",
        "                   ---===             ",
        "                ---===                ",
        "                ===                   ",
        "           --===                      ",
        "       -  ===                         ",
        "       ===                            ",
        "                                      ",
        "                          $           ",
        "                                      ",
        "                                      ",
        "                          $           ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                          $           ",
        "                                      ",
        "     --                               ",
        "     ==---                $           ",
        "       ===---                         ",
        "          ===---                      ",
        "             ===--        $           ",
        "                ===  -                ",
        "                   ===---             ",
        "                      ===--           ",
        "                         ===  -       ",
        "                            ===       ",
        "                                      ",
        "                                      ",
        "             $                        ",
        "                                      ",
        "                                      ",
        "             $                        ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "             $                        ",
        "                                      ",
        "                                      ",
        "             $                 --     ",
        "                            ---==     ",
        "                         ---===       ",
        "             $        ---===          ",
        "                   ---===             ",
        "                   ===                ",
        "             ---===                   ",
        "           --===                      ",
        "       -  ===                         ",
        "       ===                            ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "     --                               ",
        "     ==---                            ",
        "       ===---                         ",
        "          ===---                      ",
        "             ===---                   ",
        "                ===---                ",
        "                   ===---             ",
        "                      ===--           ",
        "                         ===  -       ",
        "                            ===       ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                                      ",
        "                                      ",
        "       o        $                     ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                               ---    ",
        "                            ---===    ",
        "                $        ---===       ",
        "                      ---===          ",
        "                   ---===             ",
        "    ---------------===                ",
        "    ===============                   ",
    ], {

        width: 15,
        height: 2,

        "-": () => [
            sprite("floor_solid"),
            area(),
            solid(),
            scale(0.35),
            layer("background"),
        ],

        "=": () => [
            sprite("floor"),
            scale(0.35),
            layer("background"),
        ],

        "$": () => [
            sprite("ladder"),
            area(),
            scale(0.35),
            layer("background"),
        ],

        "o": () => [
            sprite("oil_drum"),
            area(),
            scale(0.35),
            layer("background"),
        ],

        "4": () => [
            sprite("straight_barrel_x4"),
            area(),
            scale(0.35),
            layer("background"),
        ],
    });

    /*barrels*/

    /*spawn barrels*/
    function spawnBarrel() {
        add([
            sprite("barrel"),
            area(),
            body(),
            pos(190, 70),
            scale(0.2),
            'barrel',
        ]);

        wait(rand(3, 6), spawnBarrel);  /*spawn randomly between 3 to 6 seconds*/
    }

    spawnBarrel();

    /*destroy barrels if out of map*/
    onUpdate("barrel", (barrel) => {
        if (barrel.pos.y >= fall) {
            destroy(barrel);
        }
    })

    /*barrels pattern*/
    onUpdate("barrel", (barrel) => {
        if (barrel.pos.y < 80) {
            barrel.move(50, 0)
        }

        else if (barrel.pos.y > 120 && barrel.pos.y < 135) {
            barrel.move(-50, 0)
        }

        else if (barrel.pos.y > 190 && barrel.pos.y < 200) {
            barrel.move(50, 0)
        }

        else if (barrel.pos.y > 255 && barrel.pos.y < 265) {
            barrel.move(-50, 0)
        }

        else if (barrel.pos.y > 320 && barrel.pos.y < 340) {
            barrel.move(50, 0)
        }

        else if (barrel.pos.y > 385) {
            barrel.move(-50, 0)
        }
    })

    /*lose life if mario collides with any barrel*/
    onUpdate("barrel", (barrel) => {
        if (barrel.isTouching(mario)) {
            /*lose life*/
            mario.hurt(1);
            addKaboom(mario.pos);
            destroy(barrel);

            /*remove hp on counter*/
            hp.value -= 1
            hp.text = "HP:" + hp.value
        }
    })

    /*lose conditions*/

    /*lose if mario is out of map*/
    mario.action(() => {
        if (mario.pos.y >= fall) {
            go("lose", score)
        }
    })

    /*lose when hp reaches 0*/
    mario.onDeath(() => {
        go("lose", score)
    })

    /*win conditions*/
    mario.onCollide("princess", () => {
        go("win", score);
    });

    /*score counter*/
    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(445, 35),
        scale(0.25),
    ]);

    /* score refresh every frame */
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });

    /*hp counter*/
    const hp = add([
        text("HP: 3"),
        pos(445, 15),
        { value: 3 },
        scale(0.25),
    ])
});

/*lose scene*/
scene("lose", (score) => {
    add([
        sprite("standing_donkey_kong"),
        pos(width() / 2, height() / 2 - 80),
        scale(0.5),
        origin("center"),
    ]);

    /*display score*/
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(1.5),
        origin("center"),
    ]);

    /*play again*/
    add([
        text("Press 'Enter' to play again!"),
        pos(width() / 2, height() / 2 + 160),
        scale(0.40),
        origin("center"),
    ]);

    /*go back to game*/
    onKeyPress("enter", () => go("intro"));
})

/*win scene*/
scene("win", (score) => {
    add([
        sprite("running_princess_right_2"),
        pos(width() / 2 - 160, height() / 2 - 80),
        scale(1),
        origin("center"),
    ]);

    add([
        sprite("heart"),
        pos(width() / 2, height() / 2 - 80),
        scale(1),
        origin("center"),
    ]);

    add([
        sprite("running_mario_left_2"),
        pos(width() / 2 + 160, height() / 2 - 80),
        scale(1),
        origin("center"),
    ]);

    /*display score*/
    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(1.5),
        origin("center"),
    ]);

    /*play again*/
    add([
        text("Press 'Enter' to play again!"),
        pos(width() / 2, height() / 2 + 160),
        scale(0.40),
        origin("center"),
    ]);

    /*go back to game*/
    onKeyPress("enter", () => go("intro"));
})

go("game")