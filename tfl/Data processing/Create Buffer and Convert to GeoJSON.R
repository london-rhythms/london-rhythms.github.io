library(rgdal)
library(sp)
library(raster) 
library(rgeos)
library(ggplot2)

# convert spatial polygon to geojson packages
library(spdplyr)
library(geojsonio)
library(rmapshaper)

# Read the .csv file
# Either , or ; as seperator 
plot.locations <- read.csv("London stations final unixtime coordinates.csv", 
                           sep = ",")

# look at the data structure
str(plot.locations)

# view column names
names(plot.locations)

# In order to convert our data.frame to a SpatialPointsDataFrame, 
# Also need to know the CRS associated with those coordinate values <- in the end not necessary 

# add ID to locations dataframe <- not necessary anymore, but wanted to check if ID's were the same
plot.locations$ID <- seq.int(nrow(plot.locations))

# convert to spatial points dataframe
# did 2:3 instead of 3:2 which caused the swapped coordinates problem <- solved now 
locations <- SpatialPointsDataFrame(plot.locations[,3:2],
                            plot.locations)

## tried different CRS systems, but there was always an error in mapbox that the bounding box is too big
## therefore did not assign CRS in the end 

plot(locations)

# experiment with different width to see what looks best in mapbox
locations_polygon <- gBuffer(locations, width=0.003, byid=TRUE)

plot(locations_polygon)

polygon_dataframe = fortify(locations_polygon)

# convert polygon to geojson 
# Show the first 10 rows
head(locations_polygon@data, 10)

# select relevant columns
locations_polygon_select <- locations_polygon %>% 
  select(Station, Entries, Exits, unix, ID)

# show first 10 rows
head(locations_polygon_select@data, 10)

# transform into geojson 
locations_polygon_json <- geojson_json(locations_polygon_select)

# export into file system 
geojson_write(locations_polygon_json, file = "~/MRes Spatial Data Science/Term 2 Modules/Digital Visualisation/Group Project/station_unix_locations_final.geojson")




