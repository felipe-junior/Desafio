using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BackendDesafio.Models
{
    public class Animal
    {   
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("nome")]
        public string Nome { get; set; }

        [BsonElement("tipo")]
        public string Tipo { get; set; }
        [BsonElement("peso")]
        public double  Peso{ get; set; }

        [BsonElement("dataNascimento")]
        public DateTime DataNascimento{get; set;}
        
    
    }
}