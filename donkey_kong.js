import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

/*context*/

const fall = 500
const speed = 2

kaboom({
    global:true,
    fullscreen:true,
    width: 800,
    height: 600,
    background: [ 0, 0, 0, ],
    scale:1.5,
    crisp:true,
})

/*assets*/
loadSpriteAtlas("/sprites/mario/Mario.png", {
    "mario": {
        x: 0,
        y:0,
        width: 588,
        height: 100,
        sliceX: 6,
        anims: {
            idle_right: {from: 0, to: 0},
            idle_left:{from: 1, to: 1},
            run_right: { from: 2, to: 3, loop:true, speed: 5 },
            run_left: { from: 4, to: 5, loop:true, speed: 5 },
        },
    },
})
loadSprite("floor", "sprites/map/floor_size_1.png");
loadSprite("floor_solid", "sprites/map/floor_solid_size_1.png");
loadSprite("ladder", "sprites/map/ladder_size_1.png");
loadSprite("oil_drum", "sprites/map/oil_drum_1.png");
loadSprite("straight_barrel_x4", "sprites/map/straight_barrel_x4.png");

/*game*/

scene("game", () => {

    gravity(200);

    layers([
        "background",
        "game",
        "ui",
    ],  "game")

    /*mario*/

    const mario = add([
        sprite("mario"),
        pos(60, 400),
        area(),
        body(),
        scale(0.35),
    ])

    mario.play("idle_right")
    
    function jump() {
        if (mario.isGrounded()) {
            mario.jump(100);
        }
    }

    onKeyPress("up", jump);
    onKeyPress("space", jump);
    

    onUpdate(() => {
        const curAnim = mario.curAnim()

        if (isKeyDown("left")) {
            if (curAnim !=="run_left")
            {
                mario.play("run_left")
            }
            mario.pos.x -=speed
        }
        else if (isKeyDown("right")) {
            if (curAnim !=="run_right")
            {
                mario.play("run_right")
            }
            mario.pos.x +=speed
        }
        else 
        {
            const direction = curAnim.split('_').pop() ?? "left"
            mario.play(`idle_${direction}`)
        }
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
        "             $ $------                ",
        "                ======                ",
        "                                      ",
        "             $ $                      ",
        "                                      ",
        "                                      ",
        "             ---                      ",
        "             ===                      ",
        "                                      ",                               
        "                     $                ",
        "                                      ",
        "                                      ",
        "                     $                ",
        "                                      ",
        "                                      ",
        "             $ $     $                ",
        "                                      ",
        "                                      ",
        "             $ $     $                ",
        "                                      ",
        "                                      ",
        "             $ $     $                ",
        "                                      ",
        "     --------------                   ",
        "     ==============---                ",
        "                   ===---             ",
        "                      ===---          ",
        "                         ===---       ",
        "                            ===       ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                $                     ",
        "                               --     ",
        "                            ---==     ",
        "                $        ---===       ",
        "                      ---===          ",
        "                   ---===             ",
        "                ---===                ",
        "             ---===                   ",
        "          ---===                      ",
        "       ---===                         ",
        "       ===                            ",
        "                                      ",
        "                          $           ",
        "                                      ",
        "                                      ",
        "                          $           ",
        "              $                       ",
        "                                      ",
        "         $                            ",
        "              $                       ",
        "                                      ",
        "         $                            ",
        "              $                       ",
        "                                      ",
        "         $                            ",
        "              $                       ",
        "                                      ",
        "         $                            ",
        "              $                       ",
        "                                      ",
        "         $                            ",
        "              $                       ",
        "                                      ",
        "         $                $           ",
        "              $                       ",
        "     --                               ",
        "     ==---                $           ",
        "       ===--- $                       ",
        "          ===---                      ",
        "             ===---       $           ",
        "                ===---                ",
        "                   ===---             ",
        "                      ===---          ",
        "                         ===---       ",
        "                            ===       ",
        "                                      ",
        "                                      ",
        "             $                        ",
        "                                      ",
        "                   $                  ",
        "             $                        ",
        "                                      ",
        "                   $        $         ",
        "                                      ",
        "                                      ",
        "                   $        $         ",
        "                                      ",
        "                                      ",
        "                   $        $         ",
        "                                      ",
        "                                      ",
        "                   $        $         ",
        "                                      ",
        "                                      ",
        "                   $        $         ",
        "                                      ",
        "             $                        ",
        "                   $        $         ",
        "                                      ",
        "             $                 --     ",
        "                   $        ---==     ",
        "                         ---===       ",
        "             $        ---===          ",
        "                   ---===             ",
        "                ---===                ",
        "             ---===                   ",
        "          ---===                      ",
        "       ---===                         ",
        "       ===                            ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                                      ",
        "                 $                    ",
        "                                      ",
        "                                      ",
        "         $       $                    ",
        "                                      ",
        "                                      ",
        "         $       $                    ",
        "                                      ",
        "                                      ",
        "         $       $                    ",
        "                                      ",
        "                                      ",
        "         $       $                    ",
        "                                      ",
        "                                      ",
        "         $       $                    ",
        "                                      ",
        "                                      ",
        "         $       $                    ",
        "                                      ",
        "     --                               ",
        "     ==---       $                    ",
        "       ===---                         ",
        "          ===---                      ",
        "             ===---                   ",
        "                ===---                ",
        "                   ===---             ",
        "                      ===---          ",
        "                         ===---       ",
        "                            ===       ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "                                      ",
        "                                      ",
        "                $                     ",
        "       o                              ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                                      ",
        "                                      ",
        "                            $         ",
        "                $                     ",
        "                                      ",
        "                            $         ",
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
            "ladder",
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
            solid(),
            scale(0.35),
        ],
    });

    /*lose conditions*/

    mario.onCollide("barrel", () => {
        go("lose", score);
        shake();
        addKaboom(mario.pos);
    });

    mario.action (() => {
        if (mario.pos.y >= fall) {
            go("lose", score)
        }
    })

    /*score counter*/

    let score = 0;

    const scoreLabel = add([
        text(score),
        pos(445, 25),
        scale(0.5),
    ]);

    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });
});

/*lose scene*/

scene("lose", (score) => {

    /*display score*/

    add([
        text("Press 'Enter' to play again!"),
        pos(width() / 2, height() / 2 + 80),
        scale(0.40),
        origin("center"),
    ]);

    add([
        text(score),
        pos(width() / 2, height() / 2 - 80),
        scale(1.5),
        origin("center"),
    ]);

    /*go back to game*/

    onKeyPress("enter", () => go("game"));
})

go("game")
