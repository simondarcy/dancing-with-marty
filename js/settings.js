var mobileSettings = {
    upBtnPos:{x:40, y:60},
    downBtnPos:{x:115, y:60},
    leftBtnPos:{x:120, y:60},
    rightBtnPos:{x:45, y:60},
    btnScale:0.7,
    marty:{scale:1},
    shareX:100,
    shareY:140,
    shareSpacing:100,
    shareScale:1,
    isMobile:true,
    logoScale:1
};

var desktopSettings = {
    upBtnPos:{x:100, y:100},
    downBtnPos:{x:210, y:100},
    leftBtnPos:{x:310, y:100},
    rightBtnPos:{x:200, y:100},
    btnScale:1,
    marty:{scale:1.3},
    shareX:100,
    shareY:100,
    shareSpacing:100,
    shareScale:1,
    isMobile:false,
    logoScale:0.9
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

