/* Storyline buttons to make interac tion easier, d3 used */

var pageNum = 1;
var backButton = d3.select("#story-back");
var forwardButton = d3.select("#story-forward");
var pageNumbers = d3.select("#storymode-controls-numbers");
var storyHeader = d3.select("#storymode-header");
var storyContent = d3.select("#storymode-content h9");

/* STORY PAGES */
var stories = [

  { title: "London Night Tube Expansion",
    description: "The London Night Tube was introduced in 2015 and runs on Friday and Saturday nights. Initially only the Central Line and Victoria Line were operating.",
    // change starting position also on filter of map!!!!
    index: 0,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.5,
      center: [-0.2,51.4833],
      bearing: -60,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.5,
      center: [-0.2,51.4833],
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "London Night Tube Expansion",
    description: "In October 2016 the Jubilee Line service started to operate and in November 2016 the Northern Line.",
    index: 156,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11,
      center: [-0.2,51.4833],
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      center: [-0.2,51.4833],
      pitch: 60.0,
      speed: 0.3
    }
  },

  { title: "London Night Tube Expansion",
    description: "In December 2016 the London Night Tube expanded once more by also operating the Piccadilly Line during the night.",
    index: 312,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      center: [-0.2,51.4833],
      bearing: +20,
      pitch: 60.0,
      speed: 0.3
    },
  },
    
  { title: "Number of Entries during Friday Night",
    description: "02:00 - Passenger flow that enters the night tube on Friday is clustered around Soho and Liverpool Street. Number of entries is decreasing over night.",
    index: 312,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 12,
      center: [-0.13,51.498],
      bearing: -20,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 12,
      center: [-0.13,51.498],
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Friday Night",
    description: "02:30",
    index: 313,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Friday Night",
    description: "03:00",
    index: 314,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    } 
  },
    
  { title: "Number of Entries during Friday Night",
    description: "03:30",
    index: 315,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Friday Night",
    description: "04:00",
    index: 316,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Friday Night",
    description: "04:30",
    index: 317,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 12,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Saturday Night",
    description: "02:00 - Passenger flow that enters the night tube on Saturday is clustered around Soho and Liverpool Street. Number of entries is decreasing over night.",
    index: 318,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Saturday Night",
    description: "02:30",
    index: 319,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Saturday Night",
    description: "03:00",
    index: 320,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Saturday Night",
    description: "03:30",
    index: 321,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Saturday Night",
    description: "04:00",
    index: 322,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries during Saturday Night",
    description: "04:30",
    index: 323,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11.8,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11.8,
      center: [-0.13,51.498],
      bearing: -7,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Friday Night",
    description: "02:00 - Passenger flow that exits the night tube on Friday is is relatively more clustered around the outer parts of London (e.g. Ealing, Tooting and Stratford). Number of exits is slowly decreasing over time.",
    index: 312,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      center: [-0.2,51.4833],
      bearing: 7,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      center: [-0.2,51.4833],
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Friday Night",
    description: "02:30",
    index: 313,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Friday Night",
    description: "03:00",
    index: 314,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Friday Night",
    description: "03:30",
    index: 315,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Friday Night",
    description: "04:00",
    index: 316,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Friday Night",
    description: "04:30",
    index: 317,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Saturday Night",
    description: "02:00 - Flow of passengers that exits the night tube on Saturday is is relatively more clustered around the outer parts of London (e.g. Ealing, Tooting and Stratford). Number of exits is slowly decreasing over time.",
    index: 318,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Saturday Night",
    description: "02:30",
    index: 319,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Saturday Night",
    description: "03:00",
    index: 320,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Saturday Night",
    description: "03:30",
    index: 321,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Saturday Night",
    description: "04:00",
    index: 322,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Exits during Saturday Night",
    description: "04:30",
    index: 323,
    entries: 'none',
    exits: 'visible',
    entries_status: "",
    exits_status: "active",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  },
    
  { title: "Number of Entries/Exits during the Night",
    description: "Look at the exit and entry passenger flow during the night tube over time by starting the play button.",
    index: 0,
    entries: 'visible',
    exits: 'none',
    entries_status: "active",
    exits_status: "",
    flyTo1: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    },
    flyTo2: {
      zoom: 11,
      pitch: 60.0,
      speed: 0.3
    }
  }
    
];

/* STORY FUNCTIONS */

// Update Story.
function updateStory1(storyObj) {
  
  // story variables
  var title = storyObj['title'];
  var description = storyObj['description'];
  var cameraSettings = storyObj['flyTo1'];
  
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

/* CHECK */

function updateStory2(storyObj) {
  
  // story variables
  var title = storyObj['title'];
  var description = storyObj['description'];
  // control for back
  var cameraSettings = storyObj['flyTo2'];
  
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
  updateStory2(stories[pageNum-1]);
});

// Story mode click through BACKWARD.
forwardButton.on("click", function () {
  
  // Update the Navigation bottom panel.
  pageNum = pageNum + 1;
  pageNumbers.text(pageNum + " of " + stories.length);
  backButton.style( "visibility", (pageNum == 1) ? "hidden" : "visible" );
  forwardButton.style( "visibility", (pageNum == stories.length) ? "hidden" : "visible" );

  // Update the story.
  updateStory1(stories[pageNum-1]);
});