# Search UI Store locator example

This is an example on how to build a Store locator using Search UI and Google Maps API. 

# Set up App Search 

Set up Elasticsearch and Enterprise Search. You can simply use Elastic Cloud to get an instance up and running in a few minutes: https://cloud.elastic.co/

Get the following informations from Enterprise Search: 

- Search API Key
- Private API Key
- Endpoint URL

Edit `.env` file and provide the informations where they belong. 

Install python script dependencies: `pip3 install -r requirements.txt`

Run the python script to load data into App Search: `python3 index_store.py`

# Set up application 

First you need to get a Google Maps API Key, you can get one in your [google cloud console](https://developers.google.com/maps/documentation/javascript/get-api-key).

Paste the Google Maps API Key to the `.env` file. 

Install application dependencies: `yarn install` 

Run the application: `yarn start` 

You can access the application on `localhost:3000` 


