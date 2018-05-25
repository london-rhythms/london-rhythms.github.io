////MAPBOX////
//mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFubmFxaW4iLCJhIjoiY2l3b2RwY2VlMDAyYzJ6b2hsMTg1b3VvNSJ9.vhj9pOhlYJrNnrwpJKKLOQ';

//create sync maps
var wkdayMap = new mapboxgl.Map({
    container: 'wkday', //div id in html
    style: 'mapbox://styles/dannaqin/cjh4q4he5385p2rpulpxzb1xw',
    center: [-0.1, 51.55],
    zoom: 9,
    maxZoom: 15,
    minZoom: 5
});

var wkendMap = new mapboxgl.Map({
    container: 'wkend', //div id in html
    style: 'mapbox://styles/dannaqin/cjh688cui4miq2rpuhgu45fmi',
    center: [-0.1, 51.55],
    zoom: 9,
    maxZoom: 15,
    minZoom: 5
});

syncMaps(wkdayMap, wkendMap);


//actions after map loads-weekday
wkdayMap.on('load', function () {

    //colors and texts of legend
    var layers = ['0-0.4', '0.4-0.6', '0.6-0.9', '0.9-1.2', '1.2-3', '3-5', '>7'];
    var colors = ['#bbe3f7', '#91d2f2', '#6cbcea', '#0ba0e5', '#0074c2', '#014f92', '#012f6a'];

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

    //add comparing layer
    wkdayMap.addLayer({
        id: 'variance',
        type: 'fill',
        source: {
            type: 'vector',
            url: 'mapbox://dannaqin.5ege415e' 
        },
        'source-layer': 'london_count_var-blzo3g',
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            "fill-color": {
                "base": 1,
                "type": "interval",
                "property": 'count_var',
                //using quartiles as stop points
                "stops": [
                [-5, '#44ACCB'],
                [-0.04, '#82BFD1'],
                [0.03, '#F2B9B9'],
                [0.1, '#ff6666'],
                [0.5, '#D44141']]
            },
            "fill-opacity": 1
        }
    });

    //legend for comparing layer
    var layersComp = ['less active', '', '', '', 'more active'];
    var colorsComp = ['#44ACCB', '#82BFD1', '#F2B9B9', '#ff6666', '#D44141'];

    for (i = 0; i < layersComp.length; i++) {
        var layerC = layersComp[i];
        var colorC = colorsComp[i];
        var itemC = document.createElement('div');
        var keyC = document.createElement('span');
        keyC.className = 'legend-key';
        keyC.style.backgroundColor = colorC;

        var valueC = document.createElement('span');
        valueC.innerHTML = layerC;
        valueC.className = 'plegend';

        itemC.appendChild(keyC);
        itemC.appendChild(valueC);
        compareLeg.appendChild(itemC);
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
        'paint': {
            "line-color": "white",
            "line-width": 2
        },
        "filter": ["==", "name", ""]
    });
});


//actions after map loads-weekend
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
        'paint': {
            "line-color": "white",
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
        document.getElementById('statistics').innerHTML = '<h3>Hover over boroughs.</h3><p>Patterns of night social vitality on weekdays and weekends. Click "compare" to see the difference!</p>';
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
        document.getElementById('statistics').innerHTML = '<h3>Hover over boroughs.</h3><p>Patterns of night social vitality on weekdays and weekends. Click "compare" to see the difference!</p>';
    }

    //hover-show border
    wkendMap.setFilter("wkend-border", ["==", "name", twt[0].properties.name]);
});


//no border when mouseleave
wkdayMap.on("mouseleave", "london-wkcount", function () {
    wkdayMap.setFilter("wkday-border", ["==", "name", ""]);
});
wkendMap.on("mouseleave", "london-wkendcount", function () {
    wkendMap.setFilter("wkend-border", ["==", "name", ""]);
});


////CHART JS////
new Chart(document.getElementById("chart"), {
    type: 'line',
    data: {
        labels: ['18', '19', '20', '21', '22', '23', '24', '01', '02', '03', '04', '05'],
        datasets: [{
            data: [1478, 1276, 1236.666667, 1112.333333, 924, 658, 426, 229.6666667, 117, 74, 67.33333333, 102.6666667],
            label: "wkcount",
            borderColor: "#3e95cd",
            borderWidth: 1.5,
            pointRadius: 1.5,
            backgroundColor: "#3e95cd",
            fill: false
                }, {
            data: [1509, 1330, 1129.5, 970.5, 801.5, 917, 515.5, 228.5, 118, 82.5, 60.5, 91.5],
            label: "wkendcount",
            borderColor: "#c45850",
            borderWidth: 1.5,
            pointRadius: 1.5,
            pointStyle: 'triangle',
            backgroundColor: "#c45850",
            fill: false
                }]
    },
    options: {
        legend: {
            position: 'top',
            labels: {
                boxWidth: 10,
                fontColor: '#fff'
            }
        },
        scales: {
            xAxes: [{
                display: true,
                ticks: {
                    fontSize: 10,
                    fontColor: '#fff'
                },
                gridLines: {
                    color: 'rgba(255,255,255,0.2)'
                },
            }],
            yAxes: [{
                display: true,
                ticks: {
                    fontSize: 10,
                    fontColor: '#fff'
                },
                gridLines: {
                    color: 'rgba(255,255,255,0.2)'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Num of tweets',
                    fontSize: 12,
                    fontColor: '#fff'
                }
            }]
        }
    }

});




////CLICKING EVENTS////
//Click to show comparing layer
var link = document.getElementById('button');

link.onclick = function (e) {
    //change the visibility of variance layer
    var clickedLayer = 'variance';
    e.preventDefault();
    e.stopPropagation();

    var visibility = wkdayMap.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
        wkdayMap.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
    } else {
        this.className = 'active';
        wkdayMap.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    };

    //show and hide comparing texts and legends
    var x = document.getElementById("compareTxt");
    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    };

    //show and hide graph
    var y = document.getElementById("graph");
    if (y.style.display === "none" || y.style.display === "") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    }
};
