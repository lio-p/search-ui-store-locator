from elastic_enterprise_search import AppSearch
import json
from dotenv import load_dotenv
import random
import os


load_dotenv()

random.seed(42)

app_search = AppSearch(
    os.getenv('REACT_APP_APP_SEARCH_BASE_URL'),
    http_auth= os.getenv('APP_SEARCH_PRIVATE_KEY')
)

names = set()

print("Create engine best-buy-stores...")
# Create engine
app_search.create_engine(
    engine_name="best-buy-stores",
    language="en",
)
print("Engine created")
print ("Load data...")
# Load data
with open("./stores.json") as reader:
    jsonFile = json.load(reader)
    products = []
    i = 0
    for obj in jsonFile:
        
        doc = obj
        if doc['name'] in names: 
            continue
        names.add(doc['name'])
        lat = doc["location"]["lat"]
        lon = doc["location"]["lon"]
        del doc["location"]
        doc["location"] = str(lat) + "," + str(lon)
        products.append(doc)

        i = i + 1
        if i > 99:
            app_search.index_documents(engine_name="best-buy-stores",documents=products,request_timeout=60)
            i = 0
            products = []
print ("Data loaded")        
print ("Update schema..")
# Update schema
app_search.put_schema(
    engine_name="best-buy-stores",
    schema={
        "location": "geolocation"
    }
)
print ("Done")   