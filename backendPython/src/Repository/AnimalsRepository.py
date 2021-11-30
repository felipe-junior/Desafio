from bson.objectid import ObjectId
import pymongo
connection_url =  "mongodb://localhost:27017/"
_client = pymongo.MongoClient(connection_url)

_database_desafio = _client["desafio"]
animals_collection = _database_desafio["animalsPython"]



def getAll():
    results = list(animals_collection.find({}))
    for result in results:
        result['_id']= str(result['_id'])
    for result in results:
        print(result)
    return results

def getOne(id):
    result = animals_collection.find_one({["_id"]: id})
    return result
def delete(id):
    result = animals_collection.delete_one({'_id': ObjectId(id)})
    return result
def create(animal):
    result = animals_collection.insert_one(animal)
    return result
    


