// License: CC0
//
// Reference:
//
// * https://github.com/kittykatattack/learningPixi
// * http://pixijs.download/v5.3.10/docs/PIXI.Sprite.html
//


// -------------------------------------------
// experimenting with dynamic texture loading
//

var g_img = new Image();
g_img.src = 'img/head_00.png';
var xxx ;

var g_tarot_major_name = [
  "The Fool", "The Magician", "The Papess/High Priestess", "The Empress",
  "The Emperor","The Pope/Hierophant","The Lovers","The Chariot","Strength",
  "The Hermit","The Wheel","Justice","The Hanged Man","Death","Temperance",
  "The Devil","The Tower","The Star","The Moon","The Sun","Judgement","The World"
];

function _experiment() {
  let n = 4*12;
  let rgba = new Float32Array(n);

  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  canvas.height = g_img.height;
  canvas.width = g_img.width;
  ctx.drawImage(g_img, 0, 0, g_img.width, g_img.height);
  xxx = ctx.getImageData(0,0, g_img.width, g_img.height);

  // should be Uint8ClampedArray
  let a = xxx.data;

}

//
//
// -------------------------------------------

function howdy() {
  let _howdy = [
    " _  _  _____      _______   __",
    "| || |/ _ \\ \\    / /   \\ \\ / /",
    "| __ | (_) \\ \\/\\/ /| |) \\ V / ",
    "|_||_|\\___/ \\_/\\_/ |___/ |_|  ",
    "                              "
  ];
  console.log(_howdy.join("\n"));
}

var g_ctx = {
  //"width":800,
  //"height":1500,
  "width":300,
  "height":600,
  "type" : "WebGL",
  "app" : {},
  "container" :{},

  "ready": false,

  "toks" : ["head", "chest", "leg", "feet", "arm" ],

  "sprite": {
    "head": [],
    "chest": [],
    "leg": [],
    "feet":[],
    "arm":[]
  },

  "active" : {
    "head": "",
    "chest": "",
    "leg": "",
    "feet": "",
    "arm": ""
  },

  "state" : {
    "head" : { "v": false, "idx": 0, "anim_idx":0, "di":180, "x":0, "y":0, "dx":0, "dy":0, "da":0, "dp":0, "lx": 1, "ly": 2 },
    "chest": { "v": false, "idx": 0, "anim_idx":0, "di":185, "x":0, "y":0, "dx":0, "dy":0, "da":0, "dp":0, "lx": 1, "ly": 2 },
    "leg"  : { "v": false, "idx": 0, "anim_idx":0, "di":190, "x":0, "y":0, "dx":0, "dy":0, "da":0, "dp":0, "lx": 1, "ly": 2 },
    "feet" : { "v": false, "idx": 0, "anim_idx":0, "di":175, "x":0, "y":0, "dx":0, "dy":0, "da":0, "dp":0, "lx": 1, "ly": 2 },
    "arm"  : { "v": false, "idx": 0, "anim_idx":0, "di":170, "x":0, "y":0, "dx":0, "dy":0, "da":0, "dp":0, "lx": 1, "ly": 2 },
    "name" : { "v": false, "idx": 0 }
  },

  "count":0
};

var g_info = {

  "location": {
    "head": [
      "img/head_00.png", "img/head_01.png", "img/head_02.png", 
      "img/head_03.png", "img/head_04.png", "img/head_05.png", 
      "img/head_06.png", "img/head_07.png", "img/head_08.png", 
      "img/head_09.png", "img/head_10.png", "img/head_11.png"
    ],
    "chest": [
      "img/chest_00.png", "img/chest_01.png", "img/chest_02.png", 
      "img/chest_03.png", "img/chest_04.png", "img/chest_05.png", 
      "img/chest_06.png", "img/chest_07.png", "img/chest_08.png", 
      "img/chest_09.png", "img/chest_10.png", "img/chest_11.png", 
      "img/chest_12.png", "img/chest_13.png"
    ],
    "leg": [
      "img/leg_00.png", "img/leg_01.png", "img/leg_02.png", 
      "img/leg_03.png", "img/leg_04.png", "img/leg_05.png", 
      "img/leg_06.png", "img/leg_07.png", "img/leg_08.png", 
      "img/leg_09.png", "img/leg_10.png", "img/leg_11.png", 
      "img/leg_12.png", "img/leg_13.png"
    ],
    "feet":[
      "img/feet_00.png", "img/feet_01.png", "img/feet_02.png", 
      "img/feet_03.png", "img/feet_04.png", "img/feet_05.png", 
      "img/feet_06.png", "img/feet_07.png", "img/feet_08.png", 
      "img/feet_09.png", "img/feet_10.png", "img/feet_11.png", 
      "img/feet_12.png", "img/feet_13.png", "img/feet_14.png", 
      "img/feet_15.png"
    ],
    "arm": [
      "img/arm_00.png", "img/arm_01.png", "img/arm_02.png", 
      "img/arm_03.png", "img/arm_04.png", "img/arm_05.png", 
      "img/arm_06.png", "img/arm_07.png", "img/arm_08.png", 
      "img/arm_09.png", "img/arm_10.png", "img/arm_11.png", 
      "img/arm_12.png", "img/arm_13.png", "img/arm_14.png", 
      "img/arm_15.png"
    ]
  },

  "head": [],
  "chest": [],
  "leg": [],
  "feet":[],
  "arm": [],

  "history" : []

};

//-------------------
//-------------------

// g_info.history
//
function save_history() {
  let toks = ["head", "chest", "leg", "feet", "arm", "name" ];

  let st = {};
  for (let i=0; i<toks.length; i++) {
    let tok = toks[i];
    st[tok] =  g_ctx.state[tok].idx;
  }

  let idx = g_info.history.length;

  g_info.history.push(st);

  let u = document.getElementById("ui_history");
  //$("#ui_history").append( $("<div style='pure-g' onclick='load_from_history(" + idx + ")'>").html("Historic " + idx) );
  //$("#ui_history").append( $("<div style='pure-g' onclick='load_from_history(" + idx + ")'>").html("Historic " + idx) );

  //$("#ui_history").append( $("<button style='pure-g' onclick='load_from_history(" + idx + ")'>").html("Historic " + idx) );

  //$("#ui_history").append( $("<a class='buttonx' onclick='load_from_history(" + idx + ")'>").html('ok, alright') );

  let z = [ "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;" ]; 
  let _s = z.join(" ");

  $("#ui_history").append( $("<button class='pure-button' onclick='load_from_history(" + idx + ")'>").html( _s + "Historic " + idx + _s ) );
  $("#ui_history").append( $("<br>") );
  $("#ui_history").append( $("<br>") );

}

function load_from_history(hist_ind) {
  let st = g_info.history[hist_ind];

  draw_simple( st.head,
               st.chest,
               st.arm,
               st.leg,
               st.feet );
  ui_name_update(st.name);
  update_realization_dl();
  update_twitter_link();
}

//-------------------
//-------------------

function url_twitter_linkback() {
  let url = "https://twitter.com/intent/tweet?";
  let name = g_tarot_major_name[g_ctx.state.name.idx];

  url += "text=Caleb+Harrington's+generative+tarot";
  url += encodeURIComponent(": " + name);
  url += "&url=https%3A%2F%2Fwww.calebharrington.com%2Fexperiments%2Ftarot";
  url += encodeURIComponent("?" + url_create_param_state());

  return url;
}

function update_twitter_link() {
  let ele = document.getElementById("ui_twitter");
  ele.href = url_twitter_linkback();
}

function url_parse_param_state(s) {
  let _lookup = {
    "h" : "head",
    "a" : "arm",
    "c" : "chest",
    "l" : "leg",
    "f" : "feet",
    "n" : "name"
  };
  let _lookup_idx = {
    "head": 0,
    "chest":0,
    "arm":0,
    "leg":0,
    "feet":0,
    "name":0
  };
  let a = s.split("?").slice(-1)[0].split("&")
  for (let i=0; i<a.length; i++) {
    let t = a[i].split("=");
    let tok = _lookup[t[0]];
    let idx = parseInt( t[1] );
    _lookup_idx[tok] = idx;

  }

  console.log(">>>",
    "head",
    _lookup_idx["head"],
    "chest",
    _lookup_idx["chest"],
    "arm",
    _lookup_idx["arm"],
    "leg",
    _lookup_idx["leg"],
    "feet",
    _lookup_idx["feet"]);

  //draw_simple(h_idx, c_idx, a_idx, l_idx, f_idx);
  draw_simple(
    _lookup_idx["head"],
    _lookup_idx["chest"],
    _lookup_idx["arm"],
    _lookup_idx["leg"],
    _lookup_idx["feet"]
  );

  ui_name_update(_lookup_idx["name"]);
}

function url_create_param_state() {
  let toks = ["head", "chest", "leg", "feet", "arm", "name" ];
  let url_tok = [ "h", "c", "l", "f", "a", "n" ];

  //let s = "?";
  let s = "";
  for (let i=0; i<toks.length; i++) {
    let tok = toks[i];
    if (i>0) { s += "&"; }
    s += url_tok[i] + "=" + g_ctx.state[tok].idx;
  }
  //s += "n=" + g_ctx.

  return s;
}

function update_realization_dl() {
  //g_ctx.app.renderer.extract.canvas().toBlob(function(x) {
  g_ctx.app.renderer.extract.canvas( g_ctx.app.stage ).toBlob(function(x) {
    var ele = document.getElementById("ui_download_x");
    ele.href = URL.createObjectURL(x);
  }, "image/png");
}

//-------------------
//-------------------



function texture_setup(x) {
  let toks = ["head", "chest", "leg", "feet", "arm" ];
  for (let i=0; i<toks.length; i++) {
    let tok = toks[i];
    for (let j=0; j<g_info.location[tok].length; j++) {
      let loc = g_info.location[tok][j];

      let _sprite  = new PIXI.Sprite(PIXI.Loader.shared.resources[loc].texture);
      _sprite.width = g_ctx.width;
      _sprite.height = g_ctx.height;
      g_ctx.sprite[tok].push( _sprite );
    }
  }

  g_ctx.ready = true;

  init_finalize();
}

function texture_load() {
  let toks = ["head", "chest", "leg", "feet", "arm" ];
  let img_list = [];
  for (let i=0; i<toks.length; i++) {
    let tok = toks[i];
    for (let j=0; j<g_info.location[tok].length; j++) {
      let loc = g_info.location[tok][j];
      img_list.push(loc);
      //PIXI.Loader.shared.add(loc).load(texture_setup);
    }
  }

  PIXI.Loader.shared.add(img_list).load(texture_setup);
}

function _clamp(v,l,u) {
  if (v<l) { v = l; }
  if (v>u) { v = u; }
  return v;
}

function _irnd(l,u) {
  if (typeof u === "undefined") {
    u = l;
    l = 0;
  }

  return Math.floor(Math.random()*(u-l) + l);
}

function draw_simple(h_idx, c_idx, a_idx, l_idx, f_idx) {
  let toks = ["feet", "leg", "chest", "arm", "head"];

  //let zord = [ -5, -4, -3, -2, -1, 0 ];
  let zord = [ 1, 2, 3, 4, 5 ];
  let _idx = [];

  draw_clear();

  h_idx = _clamp(h_idx, 0, g_ctx.sprite["head"].length-1);
  c_idx = _clamp(c_idx, 0, g_ctx.sprite["chest"].length-1);
  a_idx = _clamp(a_idx, 0, g_ctx.sprite["arm"].length-1);
  l_idx = _clamp(l_idx, 0, g_ctx.sprite["leg"].length-1);
  f_idx = _clamp(f_idx, 0, g_ctx.sprite["feet"].length-1);

  g_ctx.container.addChild( g_ctx.sprite["head"][h_idx] );
  g_ctx.container.addChild( g_ctx.sprite["chest"][c_idx] );
  g_ctx.container.addChild( g_ctx.sprite["arm"][a_idx] );
  g_ctx.container.addChild( g_ctx.sprite["leg"][l_idx] );
  g_ctx.container.addChild( g_ctx.sprite["feet"][f_idx] );

  g_ctx.active["head"]  = g_ctx.sprite["head"][h_idx] ;
  g_ctx.active["chest"] = g_ctx.sprite["chest"][c_idx] ;
  g_ctx.active["arm"]   = g_ctx.sprite["arm"][a_idx] ;
  g_ctx.active["leg"]   = g_ctx.sprite["leg"][l_idx] ;
  g_ctx.active["feet"]  = g_ctx.sprite["feet"][f_idx] ;


  _idx.push(f_idx);
  _idx.push(l_idx);
  _idx.push(c_idx);
  _idx.push(a_idx);
  _idx.push(h_idx);

  for (let i=0; i<toks.length; i++) {
    let tok = toks[i];
    g_ctx.state[tok].dp  = 2.0*Math.PI*Math.random();
    g_ctx.state[tok].v = true;

    g_ctx.active[tok].zIndex = zord[i];

    $("#ui_slider_" + tok).slider("value", _idx[i]);
  }

  g_ctx.state.head.idx    = h_idx;
  g_ctx.state.arm.idx     = a_idx;
  g_ctx.state.chest.idx   = c_idx;
  g_ctx.state.feet.idx    = f_idx;
  g_ctx.state.leg.idx     = l_idx;

}

function ui_name_update(idx) {
  if (typeof idx === "undefined") {
    idx = _irnd( g_tarot_major_name.length );
  }
  let ele = document.getElementById("ui_tarot_text");
  ele.innerHTML = g_tarot_major_name[idx];
}

function draw_simple_rand() {
  let h = _irnd( g_ctx.sprite["head"].length );
  let c = _irnd( g_ctx.sprite["chest"].length );
  let a = _irnd( g_ctx.sprite["arm"].length );
  let l = _irnd( g_ctx.sprite["leg"].length );
  let f = _irnd( g_ctx.sprite["feet"].length );

  draw_simple(h,c,a,l,f);

  let n = _irnd( g_tarot_major_name.length );

  g_ctx.state.name.idx = n;

  ui_name_update(n);

  update_realization_dl();
  update_twitter_link();

  save_history();
}

function draw_swap(tok, idx) {
  g_ctx.container.removeChild( g_ctx.active[tok] );
  idx = _clamp(idx, 0, g_ctx.sprite[tok].length-1 );
  g_ctx.active[tok] = g_ctx.sprite[tok][idx];
  g_ctx.container.addChild( g_ctx.active[tok] );

  g_ctx.state[tok].idx = idx;

  update_realization_dl();
  update_twitter_link();
}

function draw_clear() {
  let toks = ["head", "chest", "leg", "feet", "arm" ];
  for (let i=0; i<toks.length; i++) {
    let tok = toks[i];
    g_ctx.container.removeChild( g_ctx.active[tok] );
    g_ctx.active[tok] = {};
  }
}

function animate() {
  requestAnimationFrame(animate);
  if (!g_ctx.ready) { return; }

  for (let i=0; i<g_ctx.toks.length; i++) {
    let tok = g_ctx.toks[i];

    if (g_ctx.state[tok].v) {
      //g_ctx.state[tok].idx++;
      //g_ctx.state[tok].dy = g_ctx.state[tok].ly*Math.sin( (2.0*Math.PI*g_ctx.state[tok].idx / g_ctx.state[tok].di) + g_ctx.state[tok].dp );
      g_ctx.state[tok].anim_idx++;
      g_ctx.state[tok].dy = g_ctx.state[tok].ly*Math.sin( (2.0*Math.PI*g_ctx.state[tok].anim_idx / g_ctx.state[tok].di) + g_ctx.state[tok].dp );
      g_ctx.active[tok].y = g_ctx.state[tok].y + g_ctx.state[tok].dy;
    }
  }


  g_ctx.count++;
}

function animate_pixi(dt) {
  if (!g_ctx.ready) { return; }

  for (let i=0; i<g_ctx.toks.length; i++) {
    let tok = g_ctx.toks[i];

    if (g_ctx.state[tok].v) {
      //g_ctx.state[tok].idx++;
      //g_ctx.state[tok].dy = g_ctx.state[tok].ly*Math.sin( (2.0*Math.PI*g_ctx.state[tok].idx / g_ctx.state[tok].di) + g_ctx.state[tok].dp );
      g_ctx.state[tok].anim_idx++;
      g_ctx.state[tok].dy = g_ctx.state[tok].ly*Math.sin( (2.0*Math.PI*g_ctx.state[tok].anim_idx / g_ctx.state[tok].di) + g_ctx.state[tok].dp );
      g_ctx.active[tok].y = g_ctx.state[tok].y + g_ctx.state[tok].dy;
    }
  }

  g_ctx.count++;
}

function init_finalize() {
  init_ui();

  let tok = window.location.href.split("?");
  if (tok.length>1) {
    url_parse_param_state(tok[1]);
  }
  else {
    draw_simple_rand();
  }
}

function init_ui() {
  $("#ui_random").click( draw_simple_rand );

  $("#ui_slider_head").slider({
    value:0,
    min:0,
    max: g_ctx.sprite.head.length-1,
    step:1,
    slide : function(event, ui) {
      draw_swap("head", ui.value);
    }
  });

  $("#ui_slider_chest").slider({
    value:0,
    min:0,
    max: g_ctx.sprite.chest.length-1,
    step:1,
    slide : function(event, ui) {
      draw_swap("chest", ui.value);
    }
  });

  $("#ui_slider_arm").slider({
    value:0,
    min:0,
    max: g_ctx.sprite.arm.length-1,
    step:1,
    slide : function(event, ui) {
      draw_swap("arm", ui.value);
    }
  });

  $("#ui_slider_leg").slider({
    value:0,
    min:0,
    max: g_ctx.sprite.leg.length-1,
    step:1,
    slide : function(event, ui) {
      draw_swap("leg", ui.value);
    }
  });

  $("#ui_slider_feet").slider({
    value:0,
    min:0,
    max: g_ctx.sprite.feet.length-1,
    step:1,
    slide : function(event, ui) {
      draw_swap("feet", ui.value);
    }
  });


}

function init() {
  g_ctx.type = "WebGL";
  if (!PIXI.utils.isWebGLSupported()) {
    g_ctx.type = "canvas";
  }

  PIXI.utils.sayHello(g_ctx.type);
  howdy();

  g_ctx.app = new PIXI.Application({
    width:g_ctx.width,
    height:g_ctx.height,
    antialias: true,
    transparent: false,
    resolution: 1
  });

  // experimenting with allowing scroll when hitting the canvas
  //

  // prevents double tap to zoom
  //
  g_ctx.app.view.style["touch-action"] = "manipulation";

  // allows pixi.js canvas to be 'scrollable' on mobile
  // https://github.com/pixijs/pixijs/issues/2410
  //
  g_ctx.app.renderer.plugins.interaction.autoPreventDefault = false;

  let app = g_ctx.app;

  g_ctx.app.renderer.backgroundColor = 0xe0e0e0;

  g_ctx.container = new PIXI.Container();
  g_ctx.container.sortableChildren = true;

  g_ctx.app.stage.addChild(g_ctx.container);

  texture_load();

  //let b = document.body.appendChild(g_ctx.app.view);
  let ele = document.getElementById("ui_canvas");
  ele.appendChild(g_ctx.app.view);

  //animate();
  g_ctx.app.ticker.add(animate_pixi);

  // wip...don't know how to tell pixi to do the spirte z index sorting
  //
  g_ctx.app.stage.children.sort( function(a,b) {
    if (a.zIndex > b.zIndex) { return -1; }
    if (a.zIndex < b.zIndex) { return 1; }
    return 0;
  });

}
