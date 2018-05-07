var latitude = {
  min: 51.43581847,
  max: 51.5533802
}
var longitude = {
  min: -0.25285721,
  max: -0.00600815
}

const key = 'pk.eyJ1IjoiZ3NsYXRlcjY0IiwiYSI6ImNqYzk3NTU3YTA5MjAycXAzcmkzazl0YXcifQ.a066cgDjUYxGvv0ei_rHKg'

// Options for map
const options = {
  lat: 51.509865,
  lng: -0.118092,
  zoom: 12,
  studio: true, // false to use non studio styles
  style: 'mapbox://styles/gslater64/cjd35ag6828t32spdig74dkko',
};

// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;

let canvas;

var time = 0;
var day_t = 0;
var table;
var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday'];
var categories = ['musicvenues', 'restaurants', 'adultentertainment', 'beergardens', 'comedyclubs', 'danceclubs', 'jazzandblues', 'karaoke', 'pianobars', 'poolhalls', 'cocktailbars', 'gaybars', 'hookah_bars',  'pubs', 'sportsbars', 'wine_bars']
let businesses = [];
let colour = [];
let tables = [];
let cat_display = [];
let key_display = []
let bus_key;

function  preload(){

  for (var day=0; day<7; day++){

    // alternate load line for github version
    table = loadTable('../files/location_hours_day_' + str(day) + '.csv', 'csv', 'header');
    //table = loadTable('location_hours_day_' + str(day) + '.csv', 'csv', 'header');
    tables.push(table);
  }
}

function setup() {
  // createCanvas(windowWidth, windowHeight);

  canvas = createCanvas(1600, 900);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  textFont('Helvetica');

  let y = 100;
  // create colour array
  for (var i = 0; i < categories.length; i++){

    colorMode(HSB);
    c = map(i,0,categories.length, 100, 300);
    colour[i] = color(c,100,100);

    cat_display[i] = true;

    let k = new KeyItem(20, y, i);
    key_display.push(k);
    y += 30;
  }

  // load all data and generate businesses
  for (var d=0; d<tables.length; d++){

    // sub array
    businesses[d] = [];

    for (var r = 0; r < tables[d].getRowCount(); r++){

      let cat = tables[d].getString(r, 1);
      let name = tables[d].getString(r,2);
      let lat_in = Number(tables[d].getString(r, 4));
      let lon_in = Number(tables[d].getString(r, 3));
      let day = int(tables[d].getString(r,5));
      let open  = int(tables[d].getString(r, 6));
      let close = int(tables[d].getString(r, 7));

      let lat = map(lat_in, latitude.min, latitude.max, windowHeight, 0);
      let lon = map(lon_in, longitude.min, longitude.max, 0, windowWidth);

      // var pos = myMap.latLngToPixel(lat_in, lon_in);
      // ellipse(pos.x, pos.y, 3, 3);

      let b = new Business(name, cat, lat_in, lon_in, open, close);
      businesses[d].push(b);
    }

  }
}


function draw() {
  clear();
  // background('#282828');
  runTime(10);

  fill(255);
  textSize(30);
  text(day_names[day_t], 50, 30);
  text(timeString(), 50, 60);

  // bus_key.show();

  for (var i = 0; i < categories.length; i++){
    key_display[i].show();
  }

  // for(let bus of businesses[day_t]){
  for(let bus of businesses[0]){

    bus.hover();
    if(bus.isopen()){
      bus.show();
    }
  }
}

class Business {
  constructor(name, cat, lat, lon, open, close) {
    this.name = name;
    this.cat = cat;
    this.lat = lat;
    this.lon = lon;
    this.open = open;
    this.close = close;
    this.r = 2;
  }
}

Business.prototype.show = function () {
  // to turn categories on and off I could just switch the colours in this array between original and the same as the background
  let cat_index = categories.indexOf(this.cat);
  noStroke();
  fill(colour[cat_index]);

  var p = myMap.latLngToPixel(this.lat, this.lon);

  if(cat_display[cat_index]){

    // ellipse(this.lon, this.lat, this.r, this.r);
    ellipse(p.x, p.y, this.r, this.r);
  }
};

Business.prototype.isopen = function () {
  let output = false;

  if ( (this.close < this.open) && (this.open < time || time < this.close) ) {
    output = true;
  }
  else if ( this.open < time && time < this.close ) {
    output = true;
  }
  else {
    output = false;
  }
  return output;
};

Business.prototype.hover = function () {
  if (dist(this.lon, this.lat, mouseX, mouseY) < this.r){

    noFill();
    stroke('#F012BE');
    ellipse(this.lon, this.lat, this.r+10, this.r+10);
  }
};

class KeyItem {

  constructor(x, y, num){
    this.x = x;
    this.y = y;
    this.num = num;
    this.r = 15;
    this.selected = true;
  }

  show(){

    if(this.selected){

      fill(colour[this.num]);
      ellipse(this.x, this.y, this.r, this.r);
      fill(255);
      textSize(15);
      textAlign(LEFT, CENTER);
      text(categories[this.num], this.x + this.r, this.y);
    }
    else{
      fill(colour[this.num]);
      ellipse(this.x, this.y, this.r, this.r);
      fill('#282828');
      ellipse(this.x, this.y, this.r-2, this.r-2);
      fill(255);
      textSize(15);
      textAlign(LEFT, CENTER);
      text(categories[this.num], this.x + this.r, this.y);
    }
  }

  clicked(){

    if (dist(this.x, this.y, mouseX, mouseY) < this.r){
      // reverse selected boolean used above in show()
      this.selected = !this.selected;
      // reverse display boolean in cat_display array
      cat_display[this.num] = !cat_display[this.num];
    }
  }

}


function mousePressed(){
  // bus_key.clicked();
  for(let k of key_display){
    k.clicked();
  }
}

function runTime(interval){

  if (time > (1440 - interval)){
    if (day_t == 6){
      day_t = 0;
      time = 0;
    }
    else {
      time = 0;
      day_t = day_t + 1;
    }
  }
  else time += interval;
}


function timeString(){

  var hours = 0;
  var mins = 0;
  var out;

  hours = floor(time/60);
  mins = (time - (hours*60));

  if (hours<10){
    out = str('0' + hours + ':' + mins);
  }
  else out = str(hours + ':' + mins);

  return out;
}
