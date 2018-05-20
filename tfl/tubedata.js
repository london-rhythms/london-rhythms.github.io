//mapbox token
//mapboxgl.accessToken = //'pk.eyJ1Ijoia2FhdG5sIiwiYSI6ImNqY2h2d2ZtMzFnaTQzNHBhOWhvaWs3aWs//ifQ.Ok-oAUUWa36bsPl_tOJ13g';

// same backround as Greg 
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3NsYXRlcjY0IiwiYSI6ImNqYzk3NTU3YTA5MjAycXAzcmkzazl0YXcifQ.a066cgDjUYxGvv0ei_rHKg'

//create map
var map = new mapboxgl.Map({
    container: 'map', // div id in html
    style: 'mapbox://styles/gslater64/cjd35ag6828t32spdig74dkko',
    //style: 'mapbox://styles/kaatnl/cje7cgai0h5zl2smonbz0oybe', 
    center: [-0.2,51.4833],
    // to change startng view height 
    pitch: 60,
    // to rotate starting view 
    // bearing: -60,    
    // starting zoom
    zoom: 11,
    maxZoom: 20,
    // data not visible further away 
    minZoom: 11,
    
});

//add layers                                         
map.on('load', function () {
    
    /* EXITS: MAPBOX INTERVAL DATA: 0-1272 */
    map.addLayer({
        id: 'Exits',
        // for 3D effect 
        type: 'fill-extrusion',
        source: {
            type: 'vector',
            url: 'mapbox://kaatnl.0m8m2xhy'
        },
        // filter on first value unixtime 
        'filter': ['==', ['number', ['get', 'unix']], 1487296800],
        'source-layer': 'station_unix_locations_final-81o5o1',
        'layout': {
            'visibility': 'none'
        },
        paint: {
            'fill-extrusion-opacity': 0.75,
            'fill-extrusion-color': {
                property: 'Exits',
                type: 'exponential',
                stops: [
                    // all values that had string "Below 5" were in python set to 0. 
                    // only showing colour from 5 onwards 
                    // http://www.0to255.com/17146E for scale 
                    [1, 'rgba(100, 100, 100, 0.7)'],
                    [5, '#deddf9'],
                    [50, '#c2c0f4'],
                    [100, "#a6a3ee"],
                    [200, "#7c78e7"],
                    [300, "#605ce1"],
                    [400, "#443fdc"],
                    [500, "#231ea7"],
                    [600, "#1d198b"],
                    [700, "#17146e"],
                    [800, "#110f51"],
                    [900, "#0e0c43"],
                    [1000, "#0b0a35"],
                    [1100, "#080726"],
                    [1200, "#050418"],
                    [1300, "#020209"]
                ]
            },
            'fill-extrusion-height': {
                property: 'Exits',
                type: 'exponential',
                stops: [
                    [1, 0],
                    [5, 125],
                    [50, 250],
                    [100, 500],
                    [200, 1000],
                    [300, 1500],
                    [400, 2000],
                    [500, 2500],
                    [600, 3000],
                    [700, 3500],
                    [800, 4000],
                    [900, 4500],
                    [1000, 5000],
                    [1100, 5500],
                    [1200, 6000],
                    [1300, 6500]
                ]
            }}
    });     
    
    /* ENTRIES: MAPBOX INTERVAL DATA: 0-1272 */
    map.addLayer({
        id: 'Entries',
        type: 'fill-extrusion',
        source: {
            type: 'vector', 
            url: 'mapbox://kaatnl.0m8m2xhy'
        },
        // filter on first value unixtime
        // starting 1471568400
        // 1487296800
        'filter': ['==', ['number', ['get', 'unix']], 1487296800],
        'source-layer': 'station_unix_locations_final-81o5o1',
        'layout': {
            // starting view
            'visibility': 'visible'
        },
        paint: {
            'fill-extrusion-opacity': 0.75,
            'fill-extrusion-color': {
                property: 'Entries',
                type: 'exponential',
                stops: [
                    // all values that had string "Below 5" were in python set to 0. 
                    // only showing colour from 5 onwards 
                    // http://www.0to255.com/17146E for scale 
                    [1, 'rgba(100, 100, 100, 0.7)'],
                    [5, '#deddf9'],
                    [50, '#c2c0f4'],
                    [100, "#a6a3ee"],
                    [200, "#7c78e7"],
                    [300, "#605ce1"],
                    [400, "#443fdc"],
                    [500, "#231ea7"],
                    [600, "#1d198b"],
                    [700, "#17146e"],
                    [800, "#110f51"],
                    [900, "#0e0c43"],
                    [1000, "#0b0a35"],
                    [1100, "#080726"],
                    [1200, "#050418"],
                    [1300, "#020209"]
                ]
            },
            'fill-extrusion-height': {
                property: 'Entries',
                type: 'exponential',
                stops: [
                    [1, 0],
                    [5, 125],
                    [50, 250],
                    [100, 500],
                    [200, 1000],
                    [300, 1500],
                    [400, 2000],
                    [500, 2500],
                    [600, 3000],
                    [700, 3500],
                    [800, 4000],
                    [900, 4500],
                    [1000, 5000],
                    [1100, 5500],
                    [1200, 6000],
                    [1300, 6500]
                ]
            }}
    });
    
/* ADDING LEGEND
CODE HAS TO GO INTO MAP.ON LOAD FUNCTION */

var layers = ['0-50', '50-100', '100-200', '200-300', '300-400', '400-500', '500-600', '600-700', '700-800', '800-900', '900-1000', '1000-1100', '1100-1200', '1200-1300'];

var colors = ['#deddf9', '#c2c0f4', '#a6a3ee', '#7c78e7', '#605ce1', '#443fdc', '#231ea7', '#1d198b', '#17146e', '#110f51', '#0e0c43', '#0b0a35', '#080726', '#050418', '#020209'];

for (i = 0; i < layers.length; i++) {
  var layer = layers[i];
  var color = colors[i];
  var item = document.createElement('div');
  var key = document.createElement('span');
  key.className = 'legend-key';
  key.style.backgroundColor = color;

  var value = document.createElement('span');
  value.innerHTML = layer;
  item.appendChild(key);
  item.appendChild(value);
  legend.appendChild(item);
}
    
});

//create exit and entry button to show data
var toggleableLayerIds = [ 'Entries', 'Exits' ];
    
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    
    var link = document.createElement('a');
    link.id = id;
    link.href = '#'+id;
    link.className = '';
    link.textContent = id;

    /* STARTING LAYER BUTTON 
    FOR SOME REASON CAN ONLY ACCESS ELEMENT ID OF THE FIRT SPECIFIED LAYER*/ 
    $("#Entries").attr("class", "active");
    console.log(document.getElementById("Entries"));
    
        link.onclick = function (e) {
        
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();         
    
        if (this.className === '' && this.id === 'Exits') {
            map.setLayoutProperty('Exits', 'visibility', 'visible');
            map.setLayoutProperty('Entries', 'visibility', 'none');            
            this.className = 'active';
            var Entries = document.getElementById('Entries');
            Entries.className = '';              
        } 
        else if (this.className === 'active' && this.id === 'Exits') {
            map.setLayoutProperty('Exits', 'visibility', 'none');
            this.className = '';
            
        }
        else if (this.className === '' && this.id === 'Entries') {
            map.setLayoutProperty('Entries', 'visibility', 'visible');
            map.setLayoutProperty('Exits', 'visibility', 'none');
            this.className = 'active';
            var Exits = document.getElementById('Exits');
            Exits.className = '';      
        }
        else if (this.className === 'active' && this.id === 'Entries') {
            map.setLayoutProperty('Entries', 'visibility', 'none');
            this.className = '';     
        }
        }
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

var values = [ 1.48185360e+09,   1.48185540e+09,   1.48185720e+09,
          1.48185900e+09,   1.48186080e+09,   1.48186260e+09,
          1.48194000e+09,   1.48194180e+09,   1.48194360e+09,
          1.48194540e+09,   1.48194720e+09,   1.48194900e+09,
          1.48245840e+09,   1.48246020e+09,   1.48246200e+09,
          1.48246380e+09,   1.48246560e+09,   1.48246740e+09,
          1.48254480e+09,   1.48254840e+09,   1.48255020e+09,
          1.48255200e+09,   1.48255380e+09,   1.48306320e+09,
          1.48306500e+09,   1.48306680e+09,   1.48306860e+09,
          1.48307040e+09,   1.48307220e+09,   1.48314960e+09,
          1.48315140e+09,   1.48315320e+09,   1.48315500e+09,
          1.48315680e+09,   1.48315860e+09,   1.48366800e+09,
          1.48366980e+09,   1.48367160e+09,   1.48367340e+09,
          1.48367520e+09,   1.48367700e+09,   1.48375440e+09,
          1.48375620e+09,   1.48375800e+09,   1.48375980e+09,
          1.48376160e+09,   1.48376340e+09,   1.48427280e+09,
          1.48427460e+09,   1.48427640e+09,   1.48427820e+09,
          1.48428000e+09,   1.48428180e+09,   1.48435920e+09,
          1.48436100e+09,   1.48436280e+09,   1.48436460e+09,
          1.48436640e+09,   1.48436820e+09,   1.48487760e+09,
          1.48487940e+09,   1.48488120e+09,   1.48488300e+09,
          1.48488480e+09,   1.48488660e+09,   1.48496400e+09,
          1.48496580e+09,   1.48496760e+09,   1.48496940e+09,
          1.48497120e+09,   1.48497300e+09,   1.48548240e+09,
          1.48548420e+09,   1.48548600e+09,   1.48548780e+09,
          1.48548960e+09,   1.48549140e+09,   1.48556880e+09,
          1.48557060e+09,   1.48557240e+09,   1.48557420e+09,
          1.48557600e+09,   1.48557780e+09,   1.48608720e+09,
          1.48608900e+09,   1.48609080e+09,   1.48609260e+09,
          1.48609440e+09,   1.48609620e+09,   1.48617360e+09,
          1.48617540e+09,   1.48617720e+09,   1.48617900e+09,
          1.48618080e+09,   1.48618260e+09,   1.48669200e+09,
          1.48669380e+09,   1.48669560e+09,   1.48669740e+09,
          1.48669920e+09,   1.48670100e+09,   1.48677840e+09,
          1.48678020e+09,   1.48678200e+09,   1.48678380e+09,
          1.48678560e+09,   1.48678740e+09,   1.48729680e+09,
          1.48729860e+09,   1.48730040e+09,   1.48730220e+09,
          1.48730400e+09,   1.48730580e+09,   1.48738320e+09,
          1.48738500e+09,   1.48738680e+09,   1.48738860e+09,
          1.48739040e+09,   1.48739220e+09,   1.47943440e+09,
          1.47943620e+09,   1.47943800e+09,   1.47943980e+09,
          1.47944160e+09,   1.47944340e+09,   1.47952080e+09,
          1.47952260e+09,   1.47952440e+09,   1.47952620e+09,
          1.47952800e+09,   1.47952980e+09,   1.48003920e+09,
          1.48004100e+09,   1.48004280e+09,   1.48004460e+09,
          1.48004640e+09,   1.48004820e+09,   1.48012560e+09,
          1.48012740e+09,   1.48012920e+09,   1.48013100e+09,
          1.48013280e+09,   1.48013460e+09,   1.48064400e+09,
          1.48064580e+09,   1.48064760e+09,   1.48064940e+09,
          1.48065120e+09,   1.48065300e+09,   1.48073040e+09,
          1.48073220e+09,   1.48073400e+09,   1.48073580e+09,
          1.48073760e+09,   1.48073940e+09,   1.48124880e+09,
          1.48125060e+09,   1.48125240e+09,   1.48125420e+09,
          1.48125600e+09,   1.48125780e+09,   1.48133520e+09,
          1.48133700e+09,   1.48133880e+09,   1.48134060e+09,
          1.48134240e+09,   1.48134420e+09,   1.47580200e+09,
          1.47580380e+09,   1.47580560e+09,   1.47580740e+09,
          1.47580920e+09,   1.47581100e+09,   1.47588840e+09,
          1.47589020e+09,   1.47589200e+09,   1.47589380e+09,
          1.47589560e+09,   1.47589740e+09,   1.47640680e+09,
          1.47640860e+09,   1.47641040e+09,   1.47641220e+09,
          1.47641400e+09,   1.47641580e+09,   1.47649320e+09,
          1.47649500e+09,   1.47649680e+09,   1.47649860e+09,
          1.47650040e+09,   1.47650220e+09,   1.47701160e+09,
          1.47701340e+09,   1.47701520e+09,   1.47701700e+09,
          1.47701880e+09,   1.47702060e+09,   1.47709800e+09,
          1.47709980e+09,   1.47710160e+09,   1.47710340e+09,
          1.47710520e+09,   1.47710700e+09,   1.47761640e+09,
          1.47761820e+09,   1.47762000e+09,   1.47762180e+09,
          1.47762360e+09,   1.47762540e+09,   1.47770280e+09,
          1.47770460e+09,   1.47770640e+09,   1.47770820e+09,
          1.47771000e+09,   1.47771180e+09,   1.47822480e+09,
          1.47822660e+09,   1.47822840e+09,   1.47823020e+09,
          1.47823200e+09,   1.47823380e+09,   1.47831120e+09,
          1.47831300e+09,   1.47831480e+09,   1.47831660e+09,
          1.47831840e+09,   1.47832020e+09,   1.47882960e+09,
          1.47883140e+09,   1.47883320e+09,   1.47883500e+09,
          1.47883680e+09,   1.47883860e+09,   1.47891600e+09,
          1.47891780e+09,   1.47891960e+09,   1.47892140e+09,
          1.47892320e+09,   1.47892500e+09,   1.48254660e+09,
          1.47156840e+09,   1.47157020e+09,   1.47157200e+09,
          1.47157380e+09,   1.47157560e+09,   1.47157740e+09,
          1.47165480e+09,   1.47165660e+09,   1.47165840e+09,
          1.47166020e+09,   1.47166200e+09,   1.47166380e+09,
          1.47217320e+09,   1.47217500e+09,   1.47217680e+09,
          1.47217860e+09,   1.47218040e+09,   1.47218220e+09,
          1.47225960e+09,   1.47226140e+09,   1.47226320e+09,
          1.47226500e+09,   1.47226680e+09,   1.47226860e+09,
          1.47277800e+09,   1.47277980e+09,   1.47278160e+09,
          1.47278340e+09,   1.47278520e+09,   1.47278700e+09,
          1.47286440e+09,   1.47286620e+09,   1.47286800e+09,
          1.47286980e+09,   1.47287160e+09,   1.47287340e+09,
          1.47338280e+09,   1.47338460e+09,   1.47338640e+09,
          1.47338820e+09,   1.47339000e+09,   1.47339180e+09,
          1.47346920e+09,   1.47347100e+09,   1.47347280e+09,
          1.47347460e+09,   1.47347640e+09,   1.47347820e+09,
          1.47398760e+09,   1.47398940e+09,   1.47399120e+09,
          1.47399300e+09,   1.47399480e+09,   1.47399660e+09,
          1.47407400e+09,   1.47407580e+09,   1.47407760e+09,
          1.47407940e+09,   1.47408120e+09,   1.47408300e+09,
          1.47459240e+09,   1.47459420e+09,   1.47459600e+09,
          1.47459780e+09,   1.47459960e+09,   1.47460140e+09,
          1.47467880e+09,   1.47468060e+09,   1.47468240e+09,
          1.47468420e+09,   1.47468600e+09,   1.47468780e+09,
          1.47519720e+09,   1.47519900e+09,   1.47520080e+09,
          1.47520260e+09,   1.47520440e+09,   1.47520620e+09,
          1.47528360e+09,   1.47528540e+09,   1.47528720e+09,
          1.47528900e+09,   1.47529080e+09,   1.47529260e+09];
      
values.sort();
    
var interval;
$('#forward').click(function () {
  var index = $('.range-slider').val();
    index++;
    index = index > 323 ? 0 : index;
    $('.range-slider').val(index);
    
    var date_value = values[index];
    
    // multiply by 1000
    var d = new Date(date_value*1000);
    
    // if condition otherwise 0 too much for minutes 30 --> 030
    
    if (d.getMinutes() < 2) {
        
        var time = "0"+d.getHours() + ':' + "0"+ d.getMinutes();
        
        var week_day = weekday[d.getDay()];
        var month2 = month[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear();  
        
        var date2 = week_day + " " + month2 + " " + day + ", " + year;
        
        var new_d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + "0" + d.getHours() + ':' + "0"+ d.getMinutes() + ':' + "0"+d.getSeconds();     
    }
    
    if (d.getMinutes() > 1) {
        
        var time = "0"+d.getHours() + ':' + d.getMinutes() 
        
        var week_day = weekday[d.getDay()];
        var month2 = month[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear(); 
        
        var date2 = week_day + " " + month2 + " " + day + ", " + year;
        
        var new_d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + "0" + d.getHours() + ':' + d.getMinutes() + ':' + "0"+d.getSeconds();    
    }
        
    $("#time").html(time);
    $("#date").html(date2);    
    
    map.setFilter('Entries', ['==', ['number', ['get', 'unix']], values[index]]);
    map.setFilter('Exits', ['==', ['number', ['get', 'unix']], values[index]]);
    //If you want to change something on the map when the year is INCREASED, do it here 
  	//map.legend.setContent(index);
});
$('#backward').click(function () {
  var index = $('.range-slider').val();
    index--
    index = index < 0 ? 323 : index;
    $('.range-slider').val(index);
    
    var date_value = values[index];
    
    // multiply by 1000
    var d = new Date(date_value*1000);
    
    // if condition otherwise 0 too much for minutes 30 --> 030
    
    if (d.getMinutes() < 2) {
        
        var time = "0"+d.getHours() + ':' + "0"+ d.getMinutes();
        
        var week_day = weekday[d.getDay()];
        var month2 = month[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear();  
        
        var date2 = week_day + " " + month2 + " " + day + ", " + year;
        
        var new_d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + "0" + d.getHours() + ':' + "0"+ d.getMinutes() + ':' + "0"+d.getSeconds();     
    }
    
    if (d.getMinutes() > 1) {
        
        var time = "0"+d.getHours() + ':' + d.getMinutes() 
        
        var week_day = weekday[d.getDay()];
        var month2 = month[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear(); 
        
        var date2 = week_day + " " + month2 + " " + day + ", " + year;
        
        var new_d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + "0" + d.getHours() + ':' + d.getMinutes() + ':' + "0"+d.getSeconds();    
    }
        
    $("#time").html(time);
    $("#date").html(date2);       
    
    map.setFilter('Entries', ['==', ['number', ['get', 'unix']], values[index]]);
    map.setFilter('Exits', ['==', ['number', ['get', 'unix']], values[index]]);
    //If you want to change something on the map when the year is DECREASED, do it here 
  	//map.legend.setContent(index);
}); 
$('#play').click(function(){
	interval=setInterval(function (){
	$("#forward").trigger('click');
        // affects the rate of speed of slider 
  },1200);
});
$("#stop").click(function(){
	clearInterval(interval);
});
    
 
document.getElementById('input').addEventListener('input', function(e) {
    // get value of the slider when changing the slider manually 
    var index = parseInt(e.target.value);
    map.setFilter('Entries', ['==', ['number', ['get', 'unix']], values[index]]);
    map.setFilter('Exits', ['==', ['number', ['get', 'unix']], values[index]]);   
    
    //console.log("?????");
    
    d3.csv("Bank.csv", function(data){
    data_size = data.length;
    
        var check = String(values[index] + ".0");
        
        for (i=0; i < data_size; i ++) {
            var check2 = String(data[i].unix);
            if (check == check2) {

            }
        }
    });
    
    
});

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array(12);
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
    
var index = $('.range-slider').val();
   
var input = document.getElementById('input'),
   output = document.getElementById('output');
input.oninput = function(){
    // value shown in slder in HTML format 3
    var date_value = values[this.value];
    
    // multiply by 1000
    var d = new Date(date_value*1000);
    
    // if condition otherwise 0 too much for minutes 30 --> 030
    
    if (d.getMinutes() < 2) {
        
        var time = "0"+d.getHours() + ':' + "0"+ d.getMinutes();
        
        var week_day = weekday[d.getDay()];
        var month2 = month[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear();  
        
        var date2 = week_day + " " + month2 + " " + day + ", " + year;
        
        var new_d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + "0" + d.getHours() + ':' + "0"+ d.getMinutes() + ':' + "0"+d.getSeconds();     
    }
    
    if (d.getMinutes() > 1) {
        
        var time = "0"+d.getHours() + ':' + d.getMinutes() 
        
        var week_day = weekday[d.getDay()];
        var month2 = month[d.getMonth()];
        var day = d.getDate();
        var year = d.getFullYear(); 
        
        var date2 = week_day + " " + month2 + " " + day + ", " + year;
        
        var new_d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' ' + "0" + d.getHours() + ':' + d.getMinutes() + ':' + "0"+d.getSeconds();    
    }
     
    var index = $('.range-slider').val();
    //$("#time").html(values[index]);
    $("#time").html(time);
    $("#date").html(date2);   
    
};    

/* SHOW EXIT AND ENTRY VALUE ON KLICK */
map.on('click', 'Exits', function (e) {
        coordinates = e.lngLat;
        var station = e.features[0].properties.Station;
        console.log(station);
       
        var csv = String(station + ".csv");
        console.log(csv);
       
        var number_exits = e.features[0].properties.Exits;
        var number_entries = e.features[0].properties.Entries;
    
              new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(station+"Exits"+number_exits+"Entries"+number_entries)
            .addTo(map); 
});

map.on('click', 'Entries', function (e) {
        coordinates = e.lngLat;
        var station = e.features[0].properties.Station;
       
        var csv = String(station + ".csv");
       
        var number_exits = e.features[0].properties.Exits;
        var number_entries = e.features[0].properties.Entries;
    
              new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(station+"Exits"+number_exits+"Entries"+number_entries)
            .addTo(map); 
});
