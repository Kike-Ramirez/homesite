var bugs = []; // array of Jitter objects
var element = document.getElementById('year_panel')
var style = window.getComputedStyle(element);

var divHeight = style.height;
var divWidth = style.width;

function setup() {

  cnv = createCanvas(int(divWidth), int(divHeight));

  // Move the canvas so it’s inside our <div id="year_panel">.
  cnv.parent('year_panel');

  // Create objects
  for (var i=0; i<50; i++) {
    bugs.push(new Year());
  }
}

function draw() {
  background(50, 89, 100);
  for (var i=0; i<bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
}

window.onload = function() {
  element = document.getElementById('year_panel')
  style = window.getComputedStyle(element);

  divHeight = style.height;
  divWidth = style.width;
  resizeCanvas(int(divWidth), int(divHeight));

}

window.onresize = function() {

  element = document.getElementById('year_panel')
  style = window.getComputedStyle(element);

  divHeight = style.height;
  divWidth = style.width;
  resizeCanvas(int(divWidth), int(divHeight));
};

// Year class
function Year() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(10, 30);
  this.speed = 1;

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}