# -*- coding: utf-8 -*-
"""
Created on Sat Mar 31 14:33:40 2018

@author: Greg
"""

# -*- coding: utf-8 -*-
"""
Created on Thu Mar 29 16:57:13 2018

@author: Greg
"""

import json
import pandas as pd

#%%
# this function allows you to query the Yelp dataset
# define the dataset, the categories to output, and a time range (between 0 - 2400)
# it will output a table with the number of businesses in each category open at each
# time in the range, and optionally create a csv as well
   
 
def table_creator(data, categories, days, time_range, csv):


    output = []
    
    # loop through days in range
    for day in days:
        # loop through hours in defined range
        for time in time_range:
        
            out = dict()
            
            # loop through business categories in file
            for category in categories:
                count = 0
                # loop through business dictionaries  for current category
                for key in data[category]:
                    
                    # try to return hours for current day - not every business will have this data
                    try:
                        hs = key['hours'][str(day)]
    
                        s = pd.to_datetime(hs['start']).time()
                        e = pd.to_datetime(hs['end']).time()
                        
                        # check if  business times cross midnight, if so time needs only be either less than close or more than open, not both
                        if e < s and (time < e or time > s):
                                count += 1
                        
                        # else time must be between open and close for count to go up
                        elif time > s and time < e:
                            count += 1
                        
                    # skip if no data for current day
                    except Exception:
                        pass
                    
                # add the count for category to the dictionary           
                out[category] = count
               
            # add current time and day to the dictionary    
            out['time'] = time.isoformat()
            out['day'] = day
            # append dictionary to output before loop starts again
            output.append(out)
    
    table = pd.DataFrame(output)

    if csv == True:
        table.to_csv('venue_hours_table_output.csv')
        
    return table


#%%

# EXAMPLE
    
# load in test dataset
with open('business_hours_formatted.json') as f:
    data = json.load(f)

# set time range
time_range = pd.date_range('00:00', '23:00',  freq='60 min').time
print(time_range)

# define categories
categories = ['musicvenues', 'pubs']

# define day range
days = list(range(0,7))

# run function
table_creator(data, categories, days, time_range, csv=True)




#%%

# create  output file for p5js visualisation 

with open('business_hours_formatted.json') as f:
    data = json.load(f)
    
cats = ['restaurants', 'pubs', 'cocktailbars', 'wine_bars', 'musicvenues', 'danceclubs']


for day in range(0, 7):
    
    output = []
    
    for cat in cats:
        
        for key in data[cat]:
            
            d = dict()
                
            d['lat'] = key['lat']
            d['lon'] = key['lon']
            d['name'] = key['name']
            
            # try to get data for day 0
            try:
                
                ot = pd.to_datetime(key['hours'][str(day)]['start']).time()
                ct = pd.to_datetime(key['hours'][str(day)]['end']).time()
                om = (ot.hour *60) + ot.minute
                cm = (ct.hour *60) + ct.minute
            
            # else skip
            except:
                pass
                
            d['category'] = cat
            d['day'] = day
            d['open'] = om
            d['close'] = cm
            
            output.append(d)
        
        
    table = pd.DataFrame(output)
    table = table[['category','name', 'lon', 'lat', 'day','open', 'close']]
    
    table.to_csv('location_hours_day_' + str(day) + '.csv')


#i = 1
#out = ('location_hours_day_' + str(i) + '.csv')
#out