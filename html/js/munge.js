function munge(txt) {
  //var _s = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-=`~!@#$%^&*()_+[]{}|;:'\"\\,./<>?";
  var _s = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  var res_text = "";
  for (var ii=0; ii<txt.length; ii++) {
    res_text += txt[ii];
    res_text += _s[ Math.floor(Math.random()*_s.length) ];
  }
  return res_text;
}

function unmunge(ele_id) {
  var ele = document.getElementById(ele_id);
  if (!ele_id) { return; }

  var txt = ele.innerHTML;

  var res_text = "";
  for (var ii=0; ii<txt.length; ii++) {
    if ((ii%2)==0) {
      res_text = res_text + txt[ii];
    }
  }

  ele.innerHTML = res_text;
}
