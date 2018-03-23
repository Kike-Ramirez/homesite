var bugs = []; // array of Jitter objects
var element = document.getElementById('year_panel')
var style = window.getComputedStyle(element);

var divHeight = style.height;
var divWidth = style.width;
var pos = 0;

function setup() {

  cnv = createCanvas(int(divWidth), int(divHeight));

  // Move the canvas so it’s inside our <div id="year_panel">.
  cnv.parent('year_panel');

  // Create objects
  for (var i=1979; i<2019; i++) {
    bugs.push(new Year(i));
  }
}

function draw() {
  background(0);
  for (var i=0; i<bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
}

function updateSize() {
  for (var i=0; i<bugs.length; i++) {
    bugs[i].update();
  }  
}

function mouseWheel(event) {
  print(event.delta);
  //move the square according to the vertical scroll amount
  pos += event.delta;
  //uncomment to block page scrolling
  //return false;
}

window.onload = function() {
  element = document.getElementById('year_panel')
  style = window.getComputedStyle(element);

  divHeight = style.height;
  divWidth = style.width;
  resizeCanvas(int(divWidth), int(divHeight));
  updateSize();

}

window.onresize = function() {

  element = document.getElementById('year_panel')
  style = window.getComputedStyle(element);

  divHeight = style.height;
  divWidth = style.width;
  resizeCanvas(int(divWidth), int(divHeight));
  updateSize();
};

// Year class
function Year(i_) {
  this.x = 0;
  this.y = (i_ - 1979) * (int(divHeight)/30);
  this.speed = 1;
  this.year = i_;

  this.move = function() {

  };

  this.update = function() {
    if (int(divHeight) > int(divWidth)) {
      this.x = 0;
      this.y = (i_ + pos - 1979) * (int(divHeight)/30);
      this.width = int(divWidth)-1;
      this.height = int(divHeight)/30;
    
    }
    else {
      this.x = (i_ - 1979) * (int(divWidth)/30);
      this.y = 0
      this.width = int(divWidth)/30;
      this.height = int(divHeight)-1;
    
    }
  }

  this.display = function() {
    noFill();
    stroke(255);
    rect(this.x, this.y, this.width, this.height);
    textAlign(CENTER,CENTER);
    textSize(this.height * 0.8);
    text(this.year, this.x,this.y, this.width, this.height);
  };
}