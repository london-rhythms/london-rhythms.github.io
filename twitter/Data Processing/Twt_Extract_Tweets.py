import tweepy
print("test")
from tweepy import Stream
from tweepy.streaming import StreamListener 
from tweepy import OAuthHandler
import json

# Use your own consumer_key and other details by registering for an application on Twitter 
# consumer_key = ""
# consumer_secret = ""
# access_token = ""
# access_secret = ""
 
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

api = tweepy.API(auth)
@classmethod
def parse(cls, api, raw):
    status = cls.first_parse(api, raw)
    setattr(status, 'json', json.dumps(raw))
    return status
 
# Status() is the data model for a tweet
tweepy.models.Status.first_parse = tweepy.models.Status.parse
tweepy.models.Status.parse = parse

class MyListener(StreamListener):
 
    def on_data(self, data):
        try:
            with open('Friday05April2018.json', 'a') as f:
                f.write(data)
                return True
        except BaseException as e:
            print("Error on_data: %s" % str(e))
        return True
 
    def on_error(self, status):
        print(status)
        return True
 
# Set the hashtag to be searched
twitter_stream = Stream(auth, MyListener())
# Greater london bounding box
# https://wiki.openstreetmap.org/wiki/Bounding_Box
# long-lat "51.2867602","51.6918741","-0.5103751","0.3340155"
# Each bounding box should be specified as a pair of longitude and latitude pairs,
# with the southwest corner of the bounding box coming first
# https://developer.twitter.com/en/docs/tweets/filter-realtime/guides/basic-stream-parameters

twitter_stream.filter(locations=[-0.5103751,51.2867602, 0.3340155, 51.6918741])
