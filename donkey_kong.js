import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";

/*context*/

const fall = 500
const speed = 100

kaboom({
    width: 570,
    height: 444,
    background: [ 0, 0, 0, ],
})

/*assets*/

loadSprite("mario", "sprites/mario/standing_mario_right.png");
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
    ], "game")

    /*mario*/

    const mario = add([
        sprite("mario"),
        pos(60, 400),
        area(),
        body(),
        scale(0.35),
    ])
    
    function jump() {
        if (mario.isGrounded()) {
            mario.jump(100);
        }
    }

    onKeyPress("up", jump);
    
    onKeyDown("left", () => {
        mario.move(-speed, 0);
    });
    
    onKeyDown("right", () => {
        mario.move(speed, 0);
    });

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