var bugs = []; // array of Jitter objects
var element = document.getElementById('year_panel')
var style = window.getComputedStyle(element);

var divHeight = style.height;
var divWidth = style.width;
var pos = -40;
var touchIni, touchEnd;

function setup() {

  cnv = createCanvas(int(divWidth), int(divHeight));

  // Move the canvas so it’s inside our <div id="year_panel">.
  cnv.parent('year_panel');

  // Create objects
  for (var i=1970; i<2030; i++) {
    bugs.push(new Year(i));
  }

  touchIni = 0;
  touchEnd = 0;

  textFont("Montserrat");

}

function draw() {
  background(0);
  for (var i=0; i<bugs.length; i++) {
    bugs[i].update();
    bugs[i].display();
  }

  fill(255,0,0);
  noStroke();
  textSize(20);
  textAlign(LEFT, CENTER);
  text(int(frameRate()*100)/100.0, 80, 10);
}

function updateSize() {
  for (var i=0; i<bugs.length; i++) {
    bugs[i].update();
  }  
}

function touchMoved() {

  if (mouseX < width) {
    pos += (mouseY - pmouseY) / 100.0;
  
  }
  
  return false;
  
}

window.addEventListener("load", function(event) {
  element = document.getElementById('year_panel')
  style = window.getComputedStyle(element);

  divHeight = style.height;
  divWidth = style.width;

  resizeCanvas(int(divWidth), int(divHeight));
  updateSize();
});


window.addEventListener("resize", function(event) {

  element = document.getElementById('year_panel')
  style = window.getComputedStyle(element);

  divHeight = style.height;
  divWidth = style.width;

  resizeCanvas(int(divWidth), int(divHeight));
  updateSize();

});

// Year class
function Year(i_) {

  this.x = 0;
  this.y = (i_ - 1970) * (int(divHeight)/22.0);
  this.speed = 1;
  this.year = i_;
  this.width = int(divWidth)-1;
  this.height = int(divHeight)/22.0;
  this.size = this.height * 0.6;
  this.selected = false;
  this.rotation = radians(0);
  this.offsetmax = -0.25 * this.width
  this.offsetx = this.offsetmax;
  this.marginmax = this.height * 0.3;
  this.margin = this.marginmax;
  this.scalemin = 0.5;
  this.scale = this.scalemin;

  this.update = function() {

    this.x = 0;
    this.y = (i_ + pos - 1970.0) * (int(divHeight)/22.0 + this.margin);
    this.width = int(divWidth)-1;
    this.height = int(divHeight)/22.0;
    this.size = this.width * 0.2;

    if (this.size > this.height * 0.7) this.size = this.height * 0.7;

    if (abs(this.y-windowHeight*0.5) < this.height * 0.5) this.selected = true;
    else this.selected = false;

    if (abs(this.y-windowHeight*0.5) < this.height * 0.5 * 15) {
      
      var dist = map(abs(this.y-windowHeight*0.5), 0, this.height * 0.5 * 15, 0.0, 1.0);

      this.offsetx = pow(dist, 2) * this.offsetmax;
      this.scale = this.scalemin + 0.5 * pow((1 - dist), 2);

    }

    else {

      this.offsetx = this.offsetmax;
      this.scale = this.scalemin;

    }

  }

  this.display = function() {


    if (this.selected) {
      fill(255);
      stroke(0);
    }
    else {
      noFill();
      stroke(255);
    }
    textAlign(RIGHT,CENTER);
    textSize(this.size * this.scale);

    if ((this.y >= 0) && (this.y <= windowHeight)) {
      push();
      translate(this.x + this.offsetx, this.y);
      rotate(this.rotation);
      rect(0, 0, this.scale * this.width, this.scale * this.height);
      text(this.year + " ", 0, 0, this.scale * this.width, this.scale * this.height);
      pop();
    }

  };
}