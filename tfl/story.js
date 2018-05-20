var pageNum = 1;
var backButton = d3.select("#story-back");
var forwardButton = d3.select("#story-forward");
var pageNumbers = d3.select("#storymode-controls-numbers");
var storyHeader = d3.select("#storymode-header");
var storyContent = d3.select("#storymode-content p");

/* STORY PAGES */
var stories = [

  { title: "Date, Time",
    description: "Blablabla",
    // change starting position also on filter of map!!!!
    index: 312,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo: {
      zoom: 11,
      center: [-0.2,51.4833],
      bearing: 0,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "Date, Time",
    description: "Blablabla.",
    index: 313,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo: {
      zoom: 12,
      center: [-0.13,51.498],
      bearing: -20,
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "Date, Time",
    description: "Blablabla.",
    index: 314,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo: {
      zoom: 12,
      //center: [-0.13,51.498],
      //bearing: -20,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Date, Time",
    description: "Blablabla.",
    index: 315,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo: {
      zoom: 11,
      center: [-0.2,51.4833],
      bearing: +10,
      pitch: 60.0,
      speed: 0.3
    }
  }
];

/* STORY FUNCTIONS */

// Update Story.
function updateStory(storyObj) {
  
  // story variables
  var title = storyObj['title'];
  var description = storyObj['description'];
  var cameraSettings = storyObj['flyTo'];
  
  // date variables
  var index = storyObj['index'];
  $('.range-slider').val(index);
  var date_value = values[index];
    
 // entry/exit variables
 var entries_visibility = storyObj['entries'];
 var exits_visibility = storyObj['exits'];
 var entries_status = storyObj['entries_status'];
 var exits_status = storyObj['exits_status'];
    
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
  
  // set entries/exits layer
  // set button colours
    
  map.setLayoutProperty('Entries', 'visibility', entries_visibility);
  map.setLayoutProperty('Exits', 'visibility', exits_visibility);
  $("#Entries").attr("class", entries_status);
  $("#Exits").attr("class", exits_status);

  // Update the Storymode content.
  storyHeader.text(title);
  storyContent.text(description);

  // Update Camera.
  map.flyTo(cameraSettings);
    
};


///////////// CALLBACKS ///////////////

// Story mode click through FORWARD.
backButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum - 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory(stories[pageNum-1]);
});

// Story mode click through BACKWARD.
forwardButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum + 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory(stories[pageNum-1]);
});