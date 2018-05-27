# -*- coding: utf-8 -*-

from urllib.error import HTTPError
from urllib.parse import quote
from urllib.parse import urlencode
import requests

#%%
# DEFINITIONS

# Insert own key and client values below
API_KEY = '#####'
Client_ID = '#####'

API_HOST = 'https://api.yelp.com'
SEARCH_PATH = '/v3/businesses/search'
BUSINESS_PATH = '/v3/businesses/'


#%%

# GitHub definitions:

# main request set-up, this formats the keys and is used in the next function to send the request
def request(host, path, api_key, url_params=None):
    """Given your API_KEY, send a GET request to the API.
    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        API_KEY (str): Your API Key.
        url_params (dict): An optional set of query parameters in the request.
    Returns:
        dict: The JSON response from the request.
    Raises:
        HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = '{0}{1}'.format(host, quote(path.encode('utf8')))
    headers = {
        'Authorization': 'Bearer %s' % api_key,
    }

    print(u'Querying {0} ...'.format(url))

    response = requests.request('GET', url, headers=headers, params=url_params)

    return response.json()

# tweaked request for the business search
    
def business(venue):

    url_params = {
            'locale':'en_GB'
    }

    url = '{0}{1}{2}'.format(API_HOST, quote(BUSINESS_PATH.encode('utf8')), venue)
    
    headers = {
        'Authorization': 'Bearer %s' % API_KEY,
    }

    print(u'Querying {0} ...'.format(url))

    response = requests.request('GET', url, headers=headers, params=url_params)

    return response.json()

#  business search
def search(location, category, limit, offset):
    """Query the Search API by a search term and location.
    Args:
        term (str): The search term passed to the API.
        location (str): The search location passed to the API.
    Returns:
        dict: The JSON response from the request.
    """

    url_params = {
        'location': location.replace(' ', '+'),
        'categories': category,
        'limit': limit,
        'offset': offset
    }
    return request(API_HOST, SEARCH_PATH, API_KEY, url_params=url_params)







