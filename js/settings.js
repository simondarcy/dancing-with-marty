var mobileSettings = {
    upBtnPos:{x:40, y:60},
    downBtnPos:{x:115, y:60},
    leftBtnPos:{x:120, y:60},
    rightBtnPos:{x:45, y:60},
    btnScale:0.7,
    marty:{scale:0.8},
    shareX:100,
    shareY:140,
    shareSpacing:100,
    splashMarty:{scale:0.4},
    shareScale:1,
    isMobile:true,
    logoScale:0.6,
    paddle:{scale:0.8, textOffset:125},
    instructions:"Make Marty dance by swiping in the direction of the corresponding arrow as they collide.",
    instrunctionPadding:50,
    instructionsFont:"20px Baloo Paaji",
    score:{font:"40px Baloo Paaji", y:70},
    bonus:{font:"30px Baloo Paaji", speed:1000}
};

var desktopSettings = {
    upBtnPos:{x:100, y:100},
    downBtnPos:{x:210, y:100},
    leftBtnPos:{x:210, y:100},
    rightBtnPos:{x:100, y:100},
    btnScale:1,
    marty:{scale:1.1},
    shareX:100,
    shareY:100,
    shareSpacing:100,
    shareScale:1,
    isMobile:false,
    logoScale:0.8,
    splashMarty:{scale:0.5},
    paddle:{scale:1, textOffset:160},
    instructions:"Using the arrow keys. Make Marty dance by pressing the corresponding arrow as they collide.",
    instrunctionPadding:500,
    instructionsFont:"24px Baloo Paaji",
    score:{font:"50px Baloo Paaji", y:95},
    bonus:{font:"40px Baloo Paaji", speed:1000}
};

var settings = mobileSettings;

var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

if (w > 1160){
    //Switch to desktop settings
    settings = desktopSettings;
}

//max width height

//800 x 450

if(w>1160){
    w = 1160;
    h = 650;
}

