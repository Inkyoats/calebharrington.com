#!/usr/bin/python3
#
# create static HTML page for gallery html page
#
# usage:
#
#  ./html_pic_grid.py [-D dst_html_dir] [-u dst_html_thumb_dir] [-S img_srcdir]
#
# Where img_srcdir is the file system source of images
# dst_html_dir is the URL relative path of where files are located (embedded in the HTML)
# dst_html_thumb_dir is the URL of the thumbnail directory (embedded in the HTML)
#

import os, sys, getopt
import re

indent = "        "
count=0

def usage(fp):
  fp.write("\nusage:\n")
  fp.write("\n")
  fp.write("  html_pic_grid.py [-h] [-D dstdir] [-S srcdir] [-u smalldir]\n")
  fp.write("\n")
  fp.write("  [-h]              help\n")
  fp.write("  [-S|-srcdir]      source dir\n")
  fp.write("  [-D|-dstdir]      dest (html) dir\n")
  fp.write("  [-u|-smalldir]    small (thumbnail) dest (html) dir\n")
  fp.write("\n")

try:
  opts, args = getopt.getopt(sys.argv[1:], "hS:D:u:", ["help", "dstdir", "srcdir", "smalldir"])
except getopt.GetoptError as err:
  sys.stderr.write(err)
  sys.stderr.write("\n")
  usage(sys.stderr)
  sys.exit(2)

srcdir = "../"
imgdir = "pic"
imgdirsmall = "picsmall"

for o,a in opts:
  if o in ("-h", "--help"):
    usage(sys.stdout)
    sys.exit(0)
  elif o in ("-D", "--dstdir"):
    imgdir = a
    imgdirsmall = a + ".small"
  elif o in ("-u", "--smalldir"):
    imgdirsmall = a
  elif o in ("-S", "--srcdir"):
    srcdir = a
  else:
    assert False, "option not found"

#print(srcdir, imgdir, imgdirsmall)
#sys.exit(0)


html_pfx = """
<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <title>Caleb Harrington</title>
  <meta name="description" content="">
  <meta name="author" content="">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/pure-min.css">
  <link rel="stylesheet" href="css/styles.css">

  <link rel="stylesheet" href="css/custom.css">



  <link rel="icon" type="image/png" href="images/favicon.png">

  <script src="js/jquery.js"></script>
  <script src="js/jquery.lazy.js"></script>

  <link rel="stylesheet" href="css/magnific-popup.css">
  <script src="js/jquery.magnific-popup.js"></script>


</head>
<body>

  <!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->


<div id="layout">
    <!-- Menu toggle -->
    <a href="#menu" id="menuLink" class="menu-link">
        <!-- Hamburger icon -->
        <span></span>
    </a>

    <div id="menu">
        <div class="pure-menu">
          <div class="pure-menu-heading" >
            <div id='con_top_menu'>
              <img id='img_menu_skull' class='pure-img-responsive fader' data-src="images/floral-skull-linvert_s.jpg" alt='Caleb Harrington'>
            </div>
          </div>


          <!-- <a class="pure-menu-heading" href="#company">Company</a> -->

            <ul class="pure-menu-list">
                <li class="pure-menu-item"><a href="index" class="pure-menu-link">Home</a></li>
                <li class="pure-menu-item"><a href="gallery" class="pure-menu-link pure-menu-selected">Gallery</a></li>
                <li class="pure-menu-item"><a href="gallery_more" class="pure-menu-link">More Gallery</a></li>
                <li class="pure-menu-item"><a href="about" class="pure-menu-link">About</a></li>
                <li class="pure-menu-item"><a href="download" class="pure-menu-link">Downloads</a></li>

                <!-- 
                <li id='ok2' class="pure-menu-item menu-item-divided pure-menu-selected">
                    <a href="#" class="pure-menu-link">Services</a>
                </li>
                -->

                <!-- <li id='ok3' class="pure-menu-item"><a href="#contact" class="pure-menu-link">Contact</a></li> -->
            </ul>

            <ul class='pure-menu-list'>
              <li class="pure-menu-item"> &nbsp; </li>
              <li class="pure-menu-item"> &nbsp; Content </li>
              <li class="pure-menu-item"> &nbsp; licensed </li>
              <li class="pure-menu-item"> <a href='https://creativecommons.org/licenses/by-sa/3.0/us/' alt='CC-BY-SA'>CC-BY-SA</a></li>
              <li class="pure-menu-item"> &nbsp; </li>
              <li class="pure-menu-item"> &nbsp; <img src='assets/by-sa.svg'></img> </li>
            </ul>


        </div>
    </div>

    <div id="main">
        <div class="header">
          <div class='pure-g'>
            <div class='pure-u-1-3'></div>
            <div class='pure-u-1-3'>
              <h1>
                  <img id='img_header_banner' class="pure-img-responsive fader"  src='images/white_1007x640.jpg' data-src="images/caleb-harrington-com.jpg" alt="Caleb Harrington dot com">
              </h1>
            </div>
            <div class='pure-u-1-3'></div>
          </div>
        </div>

        <p> </p>

        <div class="content">

"""

html_sfx = """
        </div>
    </div>
</div>

  <script src="js/ui.js"></script>

  <!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->

  <script>
    $(function() {
      $('.fader').Lazy({ effect: 'fadeIn' });
      $('.popup-image').magnificPopup({
        type: 'image',

        removeDelay: 300,
        mainClass: 'mfp-fade',

        callbacks: {
          open: function() {
            var self = this;
            self.container.css("display", "none");
          },
          imageLoadComplete: function(id) {
            var self = this;
            self.container.fadeIn("slow");
          }
        }

      });
    });
  </script>


</body>
</html>

"""

print(html_pfx)

#for f in os.listdir("../"):
for f in os.listdir(srcdir):

  tok = f.split(".")
  if len(tok) < 2: continue
  if (tok[1] != "png") and (tok[1] != 'gif') and (tok[1] != 'gifv') and (tok[1] != 'jpg'): continue

  fbig = re.sub(r'_small', '', f)

  if (count % 5) == 0:
    if count>0:
      print( indent, "</div>")

  if (count % 5) == 0:
    print()
    print( indent, "<div class='pure-g'>")

  print( indent, "  <div class='pure-u-1-5'>")
  #print( indent, "    <a href='" + imgdir + "/" + fbig + "'>")
  print( indent, "    <a class='popup-image' href='" + imgdir + "/" + fbig + "'>")
  print( indent, "      <img class='pure-img-responsive fader' data-src='" + imgdirsmall + "/" + f + "' alt='" + f + "'>")
  print( indent, "    </a>")
  print( indent, "  </div>")

  count += 1

  #print(f, fbig)

if (count % 5) != 0:
  print( indent, "</div>")


print(html_sfx)
