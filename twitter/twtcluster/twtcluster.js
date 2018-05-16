//mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubmFxaW4iLCJhIjoiY2l3b2RwY2VlMDAyYzJ6b2hsMTg1b3VvNSJ9.vhj9pOhlYJrNnrwpJKKLOQ';

//create sync maps
var wkdayMap = new mapboxgl.Map({
    container: 'wkday',  //div id in html
    style: 'mapbox://styles/dannaqin/cjh4q4he5385p2rpulpxzb1xw',
    center: [-0.1, 51.55],
    zoom: 9,
    maxZoom: 15,
    minZoom: 5
});

var wkendMap = new mapboxgl.Map({
    container: 'wkend',  //div id in html
    style: 'mapbox://styles/dannaqin/cjh688cui4miq2rpuhgu45fmi',
    center: [-0.1, 51.55],
    zoom: 9,
    maxZoom: 15,
    minZoom: 5
});

syncMaps(wkdayMap, wkendMap);


//actions after map load
wkdayMap.on('load', function () {

    //colors and texts of legend
    var layers = ['0-0.4', '0.4-0.6', '0.6-0.9', '0.9-1.2', '1.2-3', '3-5', '>5'];
    var colors = ['#043371', '#055194', '#0573bd', '#0999dc', '#3eb4f9', '#95dbfe', '#e9f5fb'];

    //create legend
    for (i = 0; i < layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        var value = document.createElement('span');
        value.innerHTML = layer;
        value.className = 'plegend';

        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }

    //add border layer for hover effect
    wkdayMap.addLayer({
        id: 'wkday-border',
        type: 'line',
        source: {
            type: 'vector',
            url: 'mapbox://dannaqin.22mqzsfi' // Your Mapbox tileset Map ID
        },
        'source-layer': 'london_wkcount-5snfji', // name of tilesets
        'layout': {},
        paint: {
            "line-color": "#e9f5fb",
            "line-width": 2
        },
        "filter": ["==", "name", ""]
    });
});


wkendMap.on('load', function () {
    
    //add border layer for hover effect
    wkendMap.addLayer({
        id: 'wkend-border',
        type: 'line',
        source: {
            type: 'vector',
            url: 'mapbox://dannaqin.22mqzsfi' // Your Mapbox tileset Map ID
        },
        'source-layer': 'london_wkcount-5snfji', // name of tilesets
        'layout': {},
        paint: {
            "line-color": "#e9f5fb",
            "line-width": 2
        },
        "filter": ["==", "name", ""]
    });
});


//hover effect-wkday map
wkdayMap.on('mousemove', function (e) {
    var twt = wkdayMap.queryRenderedFeatures(e.point, {
        layers: ['london-wkcount']
    });

    //hover-show texts
    if (twt.length > 0) {
        document.getElementById('statistics').innerHTML = '<h3><strong>' + twt[0].properties.name + '</strong></h3><p><strong>' + twt[0].properties.twt_count + '</strong> number of tweets were created per thousand population overnight.</p>';
    } else {
        document.getElementById('statistics').innerHTML = '<h3>Hover over boroughs.</h3>';
    }

    //hover-show border
    wkdayMap.setFilter("wkday-border", ["==", "name", twt[0].properties.name]);
});

//hover effect-wkend map
wkendMap.on('mousemove', function (e) {
    var twt = wkendMap.queryRenderedFeatures(e.point, {
        layers: ['london-wkendcount']
    });

    //hover-show texts
    if (twt.length > 0) {
        document.getElementById('statistics').innerHTML = '<h3><strong>' + twt[0].properties.name + '</strong></h3><p><strong>' + twt[0].properties.twt_count + '</strong> number of tweets were created per thousand population overnight.</p>';
    } else {
        document.getElementById('statistics').innerHTML = '<h3>Hover over boroughs.</h3>';
    }
    
    //hover-show border
    wkendMap.setFilter("wkend-border", ["==", "name", twt[0].properties.name]);
});

//no border when mouseleave
wkdayMap.on("mouseleave", "london-wkcount", function () {
    wkdayMap.setFilter("wkday-border", ["==", "name", ""]);
});
wkendMap.on("mouseleave","london-wkendcount", function () {
    wkendMap.setFilter("wkend-border", ["==", "name", ""]);
});
