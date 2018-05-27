# -*- coding: utf-8 -*-
"""
Created on Fri Mar 30 11:42:35 2018

@author: Greg
"""

import numpy as np
import pandas as pd
import json
import datetime as dt
import yelp_api
yp = yelp_api

#%%
# test response
result = yp.search('london', 'pubs', 1, 0)
result['total']


#%% 
def get_businesses_multi(city, categories):

    dict_out = {}
    
    for cat in categories:
        
        dict_out[cat] = []
        
        # make initial request to get the total number of business results
        check = yp.search(city, cat, 1, 0)
        
        total = check['total']
    
        print('------------------------')
        print()
        print(cat.upper())
        print()
        
        if total > 1000:
            print('total businesses greater than 1,000, only first 1,000 results will be returned')
            total = 999
            
        else:
            print('total businesses = ', total)
        
        # set max number of  results that can be returned at one time
        results = 50
        # offset will be incremented to run through results up to total
        offset = 0
        
        full_requests = int(np.floor(total/results))
        remaining_requests = total%results
        
        print('Full requests: ', full_requests)
        print('and ', remaining_requests, ' picked up in the remainder')
        print()
        print('------------------------')
            
            # run through full requests + 1 extra for the remainder
        for i in range(1, full_requests + 2):
            
            # request 50 results while still in full range
            if i <= full_requests:
                print('Type:                  full')
                request = yp.search(city, cat, results, offset)
                
            # else just grab the remainder 
            if i > full_requests:
                print('Type:                  partial')
                request = yp.search(city, cat, remaining_requests, offset)


            print('Request number: ', i, ' out of ', full_requests+1)
            print('Offset:                ', offset)
            print()
                
            # increment the offset each loop
            offset += results
            
            # extend category array of dictionary with businesses from each request
            dict_out[cat].extend(request['businesses'])
            
    return dict_out
#%%

cats = ['musicvenues', 'restaurants', 'adultentertainment', 'beergardens', 'comedyclubs', 'danceclubs', 'jazzandblues', 'karaoke', 'pianobars', 'poolhalls', 'cocktailbars', 'gaybars', 'hookah_bars',  'pubs', 'sportsbars', 'wine_bars']
#cats = ['musicvenues', 'pubs', 'restaurants']
#cats = ['musicvenues', 'danceclubs']
city = 'london'

full_results = get_businesses_multi(city, cats)

with open('full_results.json', 'w') as f:
    json.dump(full_results, f, indent=2)

#%%
# format and save full results

full_results_formatted = dict()

for cat in cats:
    full_results_formatted[cat] = []

    # run through businesses within category
    for key in full_results[cat]:
        # create a dictionary with the keys we need
        d = dict()
        d['name'] = key['name']
        d['id'] = key['id']
        d['coordinates'] = key['coordinates']
#        print(cat)
#        print(key['name'])
#        print()
    
        # append the new dictionary into the list in main one
        full_results_formatted[cat].append(d)
    

with open('full_results_formatted.json', 'w') as f:
    json.dump(full_results_formatted, f, indent=2)
    
#%%
# GET RID OF DUPLICATES!!! 
#with open('full_results_formatted.json') as f:
#    data = json.load(f)
    
frame = []
    
for cat in cats:
    
    for key in full_results_formatted[cat]:
        
        d = dict()
        
        d['category'] = cat
        d['id'] = key['id']
        
        frame.append(d)
        
table = pd.DataFrame(frame)
table.describe()
table = table.sort_values(by=['id','category'])
#table.to_csv('all_businesses_dupes_sorted.csv')

# MAKE TABLE DISTINCT 
table = table.drop_duplicates(subset='id', keep='last')
#table.to_csv('all_businesses_dupes_removed.csv')

table.describe()

#for i, row in enumerate(table['id'][table['category'] == 'danceclubs']):
#    
#    print(row)
#    print(i)
#%%
# FIND OPENING HOURS FOR VENUES
# warning this will query the Yelp API once for each business in your output from above

# test output
#out = yp.business(full_results_formatted['pubs'][183]['id'])


business_hours = dict()

for cat in cats:
    
    print()
    print('-------------------------')
    print(cat.upper())
    print('-------------------------')
    print()
    business_hours[cat] = []
    
#    for i, key  in enumerate(full_results_formatted[cat]):
    for i, key  in enumerate(table['id'][table['category'] == cat]):
        
        try:
#            name = key['id']
            d = yp.business(key)
            business_hours[cat].append(d)
#            print(i)
#            print(name)
            
        except Exception:
            print('error at ', cat, ' - ', name, ' index no. ', i)
            pass
        

    
with open('business_hours.json', 'w') as f:
    json.dump(business_hours, f, indent=2)
    
    

#%%
    
def convert_time(time_in):

    h = int(time_in[0:2])
    m = int(time_in[2:4])
    time_out = dt.time(h,m)

    return time_out


#%%
# CREATE NEW FILE WITH VENUE DETAILS AND OPENING HOURS
    
# test format
#business_hours['pubs'][0]['hours'][0]['open']

business_hours_formatted = dict()

for cat in cats:
    
    business_hours_formatted[cat] = []

    for key in business_hours[cat]:
        
        d = dict()  # blank dictionary to populate
        hours = []
        
        # try and find hours or skip
        try:
            h = key['hours'][0]['open']  # identify opening hours array
            hs = dict()
            
            # cycle through days and append hours to lists
            for days in h:
                
                
                day_no = days['day']
                hs[day_no] = dict()
#                hs['day'] = days['day']
                hs[day_no] ['start'] = convert_time(days['start']).isoformat()
                hs[day_no] ['end'] = convert_time(days['end']).isoformat()
                
#                hours.append(hs)
    
            # build dictionary and append to list
            d['name'] = key['name']
#            d['coordinates'] = key['coordinates']
            d['lat'] = key['coordinates']['latitude']
            d['lon'] = key['coordinates']['longitude']
            d['id'] = key['id']
            d['hours'] = hs
            
            business_hours_formatted[cat].append(d)
        
        except Exception:
            pass
        
#test retrieve
#business_hours_formatted['restaurants'][960]

with open('business_hours_formatted.json', 'w') as f:
    json.dump(business_hours_formatted, f, indent=2)
    
    
business_hours_formatted['wine_bars'][20]


#%%
# quick SUMMARY - number of businesses in each category:

s = []

for cat in cats:
    
    t = 0
    d = dict()

    for key in business_hours_formatted[cat]:

        t = t+1
        
    d['category'] = cat
    d['total'] = t
    s.append(d)


summary_after.to_csv('business_count_analysis.csv')
