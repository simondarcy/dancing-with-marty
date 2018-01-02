var mobileSettings = {
    upBtnPos:{x:30, y:60},
    downBtnPos:{x:105, y:60},
    leftBtnPos:{x:165, y:60},
    rightBtnPos:{x:90, y:60},
    btnScale:0.7,
    marty:{scale:0.5}
};

var desktopSettings = {
    upBtnPos:{x:100, y:100},
    downBtnPos:{x:210, y:100},
    leftBtnPos:{x:310, y:100},
    rightBtnPos:{x:200, y:100},
    btnScale:1,
    marty:{scale:0.5}
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

