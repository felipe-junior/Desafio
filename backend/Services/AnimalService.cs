using BackendDesafio.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendDesafio.Services
{
    public class AnimalService
    {
        private readonly IMongoCollection<Animal> _animals; 
        public AnimalService(IAnimalsDatabaseSettings settings)
        {
            MongoClient client= new MongoClient(settings.ConnectionString);
            IMongoDatabase database = client.GetDatabase(settings.DatabaseName);
            _animals = database.GetCollection<Animal>(settings.AnimalsCollectionName);
        }
        public AnimalService(){}

        public virtual List<Animal> GetAnimals() 
        {   
            var animals = _animals.Find(animal => true).ToList();
            animals.Reverse();
            return animals;
            
        }

        public async Task<Animal> Create(Animal animal){
            //_animals.InsertOne(animal);
            await _animals.InsertOneAsync(animal);
            return animal;
        }
         public Animal Get(string id) =>
            _animals.Find<Animal>(animal => animal.Id == id).FirstOrDefault();
        public void Update(string id, Animal newAnimal){
           
            _animals.ReplaceOne(animal=> animal.Id ==id, newAnimal);
        }
        public void Delete(Animal animalTarget){
            var result = _animals.DeleteOne(animal => animal.Id == animalTarget.Id);
            
        }
    }
}