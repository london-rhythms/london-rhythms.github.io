var latitude = {
  min: 51.43581847,
  max: 51.5533802,
}
var longitude = {
  min: -0.25285721,
  max: -0.00600815,
}

var time = 0;
var day_t = 0;
var table;
var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday'];
var categories = ['musicvenues', 'restaurants', 'adultentertainment', 'beergardens', 'comedyclubs', 'danceclubs', 'jazzandblues', 'karaoke', 'pianobars', 'poolhalls', 'cocktailbars', 'gaybars', 'hookah_bars',  'pubs', 'sportsbars', 'wine_bars']
let businesses = [];
let colour = [];
let tables = [];


function  preload(){

  for (var day=0; day<7; day++){

    table = loadTable('../files/location_hours_day_' + str(day) + '.csv', 'csv', 'header');
    tables.push(table);
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  // create colour array
  for (var i = 0; i < categories.length; i++){

    colorMode(HSB);
    c = map(i,0,categories.length, 100, 250);
    colour[i] = color(c,100,100);
  }

  for (var d=0; d<7; d++){

    businesses[d] = [];

    for (var r = 0; r < tables[d].getRowCount(); r++){

      var cat = tables[d].getString(r, 1);
      var name = tables[d].getString(r,2);
      var lat_in = tables[d].getString(r, 4);
      var lon_in = tables[d].getString(r, 3);
      var day = int(tables[d].getString(r,5));
      var open  = int(tables[d].getString(r, 6));
      var close = int(tables[d].getString(r, 7));

      var lat = map(float(lat_in), latitude.min, latitude.max, windowHeight, 0);
      var lon = map(float(lon_in), longitude.min, longitude.max, 0, windowWidth);

      let b = new Business(name, cat, lat, lon, open, close);
      businesses[d].push(b);
    }

  }

}


function draw() {

  print(day_t);
  print(time);

  background('#282828');
  runTime(10);

  fill(255);
  textSize(50);
  text(day_names[day_t], 10, 50);
  text(timeString(), 10, 100);

  for(let bus of businesses[day_t]){

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
    this.r = 3;
  }

  show(){

    // to turn categories on and off I could just switch the colours in this array between original and the same as the background
    var col = categories.indexOf(this.cat);

    noStroke();
    // fill('#F012BE');
    fill(colour[col]);

    ellipse(this.lon, this.lat, this.r, this.r);
  }

  isopen(){
    var output = false;

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
  }

  hover(){

    if (dist(this.lon, this.lat, mouseX, mouseY) < this.r){

      noFill();
      stroke('#F012BE');
      ellipse(this.lon, this.lat, this.r+10, this.r+10);
    }
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

// function runTime(interval){
//
//   if (time > (1440 - interval)){
//     time = 0;
//   }
//   else time += interval;
// }

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
