

// MAP - key for mapbox and options for Mappa instance
const key = 'pk.eyJ1IjoiZ3NsYXRlcjY0IiwiYSI6ImNqYzk3NTU3YTA5MjAycXAzcmkzazl0YXcifQ.a066cgDjUYxGvv0ei_rHKg';
var options = {
  lat: 51.509865,
  lng: -0.118092,
  zoom: 12,
  studio: true, // false to use non studio styles
  style: 'mapbox://styles/gslater64/cjd35ag6828t32spdig74dkko',
};

// button variables
var b1, b2, b3, b4;

// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;
let canvas;

// gui object for sliders
var gui;

var speed = 30; // initial minute interval for timer
var time = 0;
var day_t = 0;
var table;
var speeds = [20,25,30,35,40,45,50,55,60, 100];
var speed_control = 3;
var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday', 'Sunday'];
// var categories = ['musicvenues', 'restaurants', 'adultentertainment', 'beergardens', 'comedyclubs', 'danceclubs', 'jazzandblues', 'karaoke', 'pianobars', 'poolhalls', 'cocktailbars', 'gaybars', 'hookah_bars',  'pubs', 'sportsbars', 'wine_bars']
var categories = ['restaurants', 'pubs', 'cocktailbars', 'wine_bars', 'musicvenues', 'danceclubs'];
let businesses = [];
let colour = [];
let colour2 = [];
let tables = [];

let cat_display = [];       // to hold booleans for display or not
let cat_open_count = [];    // to hold count of currently open businesses for each category
let cat_graphs = [];        // to hold arrays of business open counts for graphing
let graph_stack = []        // to hold running total of heights for stacked chart
var cat_totals = [936, 782, 347, 346, 133, 117];
// let bus_graph = [];

var paused = false;
var show_graph = false;
var story = false;
var story_point = 0;
var s; // HTML element
var sID = 0;
var stories; // to hold JSON details read in
var sLength = 6;

var searching = false;
var search_d;
var search_h;

let key_display = [];
let bus_key;


function  preload(){

  for (var day=0; day<7; day++){

    // alternate load line for github version
    // table = loadTable('../files/location_hours_day_' + str(day) + '.csv', 'csv', 'header');
    table = loadTable('location_hours_day_' + str(day) + '.csv', 'csv', 'header');
    tables.push(table);
  }
  stories = loadJSON('stories.json');  // load in location and text info for stories
}

function setup() {

  b1 = new Button(50, 350, 'PAUSE', 'paused');
  b2 = new Button(50, 420, 'GRAPH', 'show_graph');
  b3 = new Button(50, 490, 'STORY', 'story');
  b4 = new SButton(110, 490);

  colour2 = [color(0,116,217), color(57,204,204), color(1,255,112), color(255,220,0), color(240,18,190), color(255,65,54)];
  // colour2 = [color(0,116,217), color(57,204,204), color(1,255,112), color(255,220,0), color(240,18,190), color(133,27,75)];

  canvas = createCanvas(windowWidth, windowHeight);

  // Create a tile map and overlay the canvas on top.
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // GUI object
  gui = createGui('Speed Controller', width - 300, 20);
  sliderRange(0,8,1);
  gui.addGlobals('speed_control');

  textFont('Helvetica');

  let y = 120;
  // create colour array
  for (let i = 0; i < categories.length; i++){

    // create colour palette and load to array
    colorMode(HSB);
    c = map(i,0,categories.length, 100, 250);
    colour[i] = color(c,100,100);

    // set all category display array vars to true
    cat_display[i] = true;

    // set count of currently open businesses to 0
    cat_open_count[i] = 0;

    cat_graphs[i] = [];

    for (let j = 0; j<150; j++){
      cat_graphs[i][j] = 0;
    }

    // create array of key objects
    let k = new KeyItem(30, y, i);
    key_display.push(k);
    y += 30;
  }

  // load all data and generate businesses
  for (let d=0; d<tables.length; d++){

    // sub array
    businesses[d] = [];

    for (let r = 0; r < tables[d].getRowCount(); r++){

      let cat = tables[d].getString(r, 1);
      let name = tables[d].getString(r,2);
      let lat_in = Number(tables[d].getString(r, 4));
      let lon_in = Number(tables[d].getString(r, 3));
      let day = int(tables[d].getString(r,5));
      let open  = int(tables[d].getString(r, 6));
      let close = int(tables[d].getString(r, 7));

      // push each business object to business sub-array
      let b = new Business(name, cat, lat_in, lon_in, open, close);
      businesses[d].push(b);
    }
  }
}



function draw() {
  clear();

  frameRate(speeds[speed_control]);

  b1.show();
  b2.show();
  b3.show();
  if(story) b4.show();

  runTime(speed);

  fill(10, 200);
  rectMode(CORNERS);
  rect(width-170, height-130, width, height-20);
  fill(255);
  textSize(30);
  textAlign(LEFT, CENTER);
  text(day_names[day_t], width-160, height-60);
  text(timeString(time), width-160, height-100);

  // let z = myMap.map.getZoom();
  // print(z);
  // print(myMap.map.getZoom());
  // display all business points
  for(let bus of businesses[day_t]){
    bus.show();
  }


  // run category-type displays
  for (let i = 0; i < categories.length; i++){
    // display all key items
    key_display[i].show();

    // remove first item in each category graph array then add the current count to the end
    if(paused == false){

      cat_graphs[i].shift();
      cat_graphs[i].push(cat_open_count[i]);
      // clear down the open counters
      cat_open_count[i] = 0;
    }
  }
  // if graph button selected, display
  if(show_graph) graph3();
  runSearch();
  print(sID);
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
}

// defining colour, location and drawing if open and set to display
Business.prototype.show = function () {
  // print(myMap.getZoom());
  if (myMap.getZoom() <= 13){
    this.r = 3;
  }if (myMap.getZoom() > 13){
    this.r = 4;
  } if (myMap.getZoom() > 15){
    this.r = 8;
  }
  let cat_index = categories.indexOf(this.cat);
  noStroke();
  fill(colour2[cat_index]);

  // map lat lon to pixels on the map
  var p = myMap.latLngToPixel(this.lat, this.lon);

  // only draw if display is true and isopen is true
  // if(cat_display[cat_index] && this.isopen() ){
  //
  //   ellipse(p.x, p.y, this.r, this.r);
  //    if (paused == false){
  //      cat_open_count[cat_index] += 1;
  //    }
  // }
  // draw if open and selected to display
  if(this.isopen() ){
    if(cat_display[cat_index]){
      ellipse(p.x, p.y, this.r, this.r);
    }
    // load values into count unless animation paused
    if (paused == false){
       cat_open_count[cat_index] += 1;
     }
  }
}

// find out whether or not business is open based on current time
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
}

// hover - no longer works with map layer underneath..
Business.prototype.hover = function () {
  if (dist(this.lon, this.lat, mouseX, mouseY) < this.r){

    noFill();
    stroke('#F012BE');
    ellipse(this.lon, this.lat, this.r+10, this.r+10);
  }
}

// class for displaying individual categories in the key
class KeyItem {

  constructor(x, y, num){
    this.x = x;
    this.y = y;
    this.num = num;
    this.r = 20;
    this.selected = true;
  }

  show(){

    if(this.selected){

      fill(colour2[this.num]);
      ellipse(this.x, this.y, this.r, this.r);
      fill(255);
      textSize(15);
      textAlign(LEFT, CENTER);
      text(categories[this.num], this.x + this.r, this.y);
    }
    else{

      noFill();
      stroke(colour2[this.num]);
      ellipse(this.x, this.y, this.r, this.r);
      noStroke();
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

  manual_click(){
    this.selected = !this.selected;
    cat_display[this.num] = !cat_display[this.num];
  }
}

class Button{
  constructor(x, y, name, bool){
    this.x = x;
    this.y = y;
    this.name = name;
    this.bool = bool;
    this.r = 55;
    this.selected = false;
  }

  show(){
    textAlign(CENTER, CENTER);
    textSize(12);
    colorMode(RGB);

    // window uses string to find global variable
    if (window[this.bool] == false){
      stroke(100);
      fill(10, 150);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.r, this.r);
      noStroke();
      fill(255);
      text(this.name, this.x, this.y);
    }
    else{
      noStroke();
      fill(255);
      text(this.name, this.x, this.y);
      stroke(255);
      fill(200, 50);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.r, this.r);
    }
  }

  clicked(){
    if (dist(this.x, this.y, mouseX, mouseY) < this.r){
      // reverse selected boolean used above in show()
      this.selected = !this.selected;
      // switch global boolean passed in constructor
      window[this.bool] = !window[this.bool];
    }
  }

  story(){
    if (dist(this.x, this.y, mouseX, mouseY) < this.r){

      if (this.selected == false){
        resetStory();
        s = createDiv('');
        s.class('map-overlay').id('story');
        s.html('<H3>' + stories[0].title + '</H3> <p>' + stories[0].text + '</p>');
        //
        myMap.map.flyTo(stories[0].LatLng, stories[0].zoom);
      }
      else{
        s.remove();
        resetStory();
      }
    }
  }
}

class SButton{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 40;
    this.pressed = false;
  }

  show(){
    textAlign(CENTER, CENTER);
    textSize(30);
    colorMode(RGB);

    // window uses string to find global variable
    if (this.pressed == false){
      stroke(100);
      fill(10, 150);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.r, this.r);
      noStroke();
      fill(255);
      text('>', this.x, this.y);
    }
    else{
      noStroke();
      fill(255);
      text('>', this.x, this.y);
      stroke(255);
      fill(200, 50);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, this.r, this.r);
    }
    this.press();
  }
  // animation for when mouse is held on button
  press(){
    if (dist(this.x, this.y, mouseX, mouseY) < this.r && mouseIsPressed){
      // reverse selected boolean used above in show()
      this.pressed = true;
    }
    else{
      this.pressed = false;
    }
  }

  clicked(){
    if (dist(this.x, this.y, mouseX, mouseY) < this.r){
      // increment story ID when clicked
      if (sID == sLength) {
        sID = 0;
      }
      else{
        sID += 1;
      }
      // send new info to HTML element and zoom to new position
      s.html('<H3>' + stories[sID].title + '</H3> <p>' + stories[sID].text + '</p>');
      myMap.map.flyTo(stories[sID].LatLng, stories[sID].zoom);

      // run control switches
      storyControl();
    }
  }
}

// control additional elements depending on story mode
function storyControl(){

  switch (sID) {
    case 0:
      resetStory();
      break;

    case 1:
      setSearch(day_t,1290);
      break;

    case 2:
      paused = false;
      speed_control = 0;
      break;

    case 3:
      key_display[0].manual_click();
      key_display[1].manual_click();
      key_display[2].manual_click();
      break;

    case 4:
      key_display[0].manual_click();
      key_display[1].manual_click();
      key_display[2].manual_click();
      speed_control = 2;
      show_graph = true;
      break;

    case 5:
      print('case 5');
      key_display[2].manual_click();
      key_display[3].manual_click();
      key_display[4].manual_click();
      key_display[5].manual_click();
      break;

    case 6:
      print('case 6');
      key_display[0].manual_click();
      key_display[1].manual_click();
      key_display[4].manual_click();
      key_display[5].manual_click();
      // setSearch(0,0);
      break;
  }
}

// reset all elements which might have been altered
function resetStory(){
  sID = 0;
  show_graph = false;
  paused = false;
  speed_control = 3;
  for (i=0; i<categories.length; i++){
    cat_display[i] = true;
    key_display[i].selected = true;
  }
  myMap.map.flyTo(stories[0].LatLng, stories[0].zoom);
}

// set time to search for
function setSearch(day, hour){

  searching = true;
  search_d = day;
  search_h = hour;
}

// pause animation when set time is reached
function runSearch(){

  if (searching){

    speed_control = 9;

    if(search_d == day_t && search_h <= time && search_h+60 <= time){
      paused = true;
      searching = false;
      speed_control = 2;
    }
  }
}

function graph3(){

  // caclulate current total businesses displayed to use in dynamic mapping of y value
  let total = 0;
  for (i=0; i<cat_totals.length; i++){
    if (cat_display[i]){
      total += cat_totals[i];
    }
  }

  noStroke();
  rectMode(CORNERS);

  // draw bottom border
  let borderheight = height*.04;
  let bottom = height - borderheight;
  fill(50);
  rect(0, bottom, width, height);

  let ctime = (day_t*1440) + time;

  // loop through each category
  for (j=0; j<cat_graphs.length; j++){

    // find interval by dividing animation width by number of datapoints
    let int = (width*.9) / cat_graphs[j].length;
    let x = 0;

    // loop through all open counts for categories
    for (let i=0; i<cat_graphs[j].length; i++){

      colorMode(RGB);
      // map stored count to graph scale
      let y = map(cat_graphs[j][i], 0, total,  0, height*.1);

      fill(colour2[j]);
      noStroke();
      // use first category to run graph times display
      if(j == 0){
        graphTimes(x, i, ctime, cat_graphs[j]);
        if(cat_display[j]){
          rect(x, bottom, x+(int*.3), bottom-y);  // draw bar
          graph_stack[i] = y;                     // load y value into running height count
        }
        else{
          graph_stack[i] = 0;                     // if not displayed set running count to 0
        }

      }
      if(j > 0){
        if(cat_display[j]){
          // draw bar using the height value from the last run category in order to stack
          rect(x, bottom-graph_stack[i], x+(int*.3), bottom-graph_stack[i]-y);
          graph_stack[i] += y; // add y value to stack height for next category
        }
      }
      x += int;
    }
  }
  fill(255);
  text(total,width*.92, height*.9-borderheight);
  stroke(255);
  line(width*.91, height*.9-borderheight, width*.91, height);
  line(width*.91, height*.9-borderheight,width*.915, height*.9-borderheight);
}

// to plot time elements on moving chart
function graphTimes(x, i, ctime, array){
  // position is how many array elements back in time current element inspect
  // dif is this difference in time
  let p = array.length - i;
  let dif = p*speed;
  // if it's a full day behind the current time
  if ( (ctime-dif)%1440 == 0){

    let d = (ctime-dif)/1440;
    let ind = 0;
    if(d < 0) {
      ind = day_names.length + d;
    }
    else {
      ind = d;
    }
    fill(255);
    text(day_names[ind], x+3, height*.975);
    stroke(255);
    line(x, height*.85, x, height);
  }
}


function mouseClicked(){
  // bus_key.clicked();
  b3.story();
  for(let k of key_display){
    k.clicked();
  }
  b1.clicked();
  b2.clicked();
  b3.clicked();
  b4.clicked();
}

function add(a, b) {
    return a + b;
}

// function mouseReleased(){
//   b4.unclicked();
// }

// run time variable when playing
function runTime(interval){

  if (paused == false){

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

  else{
    time = time;
  }
}

// convert time variable into nicely formatted string
function timeString(t){

  var hours = 0;
  var mins = 0;
  var out;

  hours = floor(t/60);
  mins = (t - (hours*60));

  if (hours<10){
    if (mins ==0){
      out = str('0' + hours + ':00');
    }
    else{
      out = str('0' + hours + ':' + mins);
    }
  }
  else{
    if (mins ==0){
      out = str(hours + ':00');
    }
    else{
      out = str(hours + ':' + mins);
    }
  }
  return out;
}
