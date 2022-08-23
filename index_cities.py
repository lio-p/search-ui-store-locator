from elastic_enterprise_search import AppSearch
import json
from dotenv import load_dotenv
import random
import os
import csv
from elasticsearch import Elasticsearch, helpers


load_dotenv()

random.seed(42)

# es = Elasticsearch(host = os.getenv('REACT_APP_APP_SEARCH_BASE_URL'), port = 9200)


app_search = AppSearch(
    os.getenv('REACT_APP_APP_SEARCH_BASE_URL'),
    http_auth= os.getenv('APP_SEARCH_PRIVATE_KEY')
)

names = set()

print("Create engine cities...")
# Create engine
app_search.create_engine(
    engine_name="cities",
    language="en"
)
print("Engine created")
print ("Load data...")
# Load data
with open("./geonames-all-cities-with-a-population-1000.csv") as f:
    reader = csv.DictReader(f, delimiter = ";")
    products = []
    i = 0
    for obj in reader:
        doc =  {k.lower(): v for k, v in obj.items()}
        doc =  {k.replace(" ","_"): v for k, v in doc.items()}
        # doc = obj
        # if doc['name'] in names: 
        #     continue
        # names.add(doc['name'])
        # lat = doc["location"]["lat"]
        # lon = doc["location"]["lon"]
        # del doc["location"]
        # doc["location"] = str(lat) + "," + str(lon)
        products.append(doc)

        i = i + 1
        if i > 99:
            app_search.index_documents(engine_name="cities",documents=products,request_timeout=60)
            i = 0
            products = []
            print(".")
print ("Data loaded")        
print ("Update schema..")
# # Update schema
app_search.put_schema(
    engine_name="cities",
    schema={
        "coordinates": "geolocation"
    }
)
print ("Done")   