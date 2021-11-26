using System;
using Xunit;
using Moq;
using FluentAssertions;
using  BackendDesafio.Controllers;
using  BackendDesafio.Services;
using  BackendDesafio.Models;
using System.Collections.Generic;
using MongoDB.Bson;
using Microsoft.AspNetCore.Mvc;

namespace backend.tests
{
    public class AnimalsControllerUnitTest
    {

        [Fact]
        public void GetAnimals_WithExistingItems_ReturnsExpectedItem()
        {   
            string id = ObjectId.GenerateNewId().ToString();
            var animalsFake = RandomAnimals(id);
            var animalsFakeCopy = RandomAnimals(id);
            var serviceStub = new Mock<AnimalService>();
            serviceStub.Setup(serv => serv.GetAnimals()).Returns(animalsFake);
            var controllerAnimal = new AnimalsController(serviceStub.Object);
            var requestresult = controllerAnimal.Get();
           
            Assert.IsType<OkObjectResult>(requestresult.Result);
            var okObjectResult = requestresult.Result as OkObjectResult;
            
            Assert.IsType<List<Animal>>(okObjectResult.Value);
            
            okObjectResult.Value.Should().BeEquivalentTo(animalsFakeCopy,
            options => options.ComparingByMembers<Animal>());
        }
        [Fact]
        public void GetAnimals_DoesNot_Generates_Any_Exception_When_Ask_For_Service()
        {   
            string id = ObjectId.GenerateNewId().ToString();
            var animalsFake = RandomAnimals(id);
            var animalsFakeCopy = RandomAnimals(id);
            var serviceStub = new Mock<AnimalService>();
            serviceStub.Setup(serv => serv.GetAnimals()).Returns(()=>{
               throw new Exception();
            });
            
            var controllerAnimal = new AnimalsController(serviceStub.Object);
            Action act = ()=>controllerAnimal.Get();
            var exception = Record.Exception(act);
            Assert.Null(exception);     
        }


        [Fact]
        public void Return_Notfound_If_Animal_Doesnt_exist(){
            var id = ObjectId.GenerateNewId().ToString();
            var serviceStub = new Mock<AnimalService>();
            serviceStub.Setup( serv => serv.Get(id)).Returns(()=>(Animal)null);
            var controllerAnimal = new AnimalsController(serviceStub.Object);
            var requestresult = controllerAnimal.Get(id);
           
            Assert.IsType<NotFoundResult>(requestresult.Result);
        }
        [Fact]
        public void Return_Animal_If_ID_Matches(){
            var id = ObjectId.GenerateNewId().ToString();
            var serviceStub = new Mock<AnimalService>();
            serviceStub.Setup( serv => serv.Get(id)).Returns(()=>new Animal{Id=id});
            var controllerAnimal = new AnimalsController(serviceStub.Object);
            var requestresult = controllerAnimal.Get(id);
            Assert.IsType<Animal>(requestresult.Value);
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        private List<Animal> RandomAnimals(String id){
            var stubListAnimals = new List<Animal>();

            stubListAnimals.Add(new Animal {Id=id, Nome="cangurizin",
            DataNascimento=new DateTime(), Peso= 10.0, Tipo="marsupial"});
            stubListAnimals.Add(new Animal {Id=id, Nome="hamster",
            DataNascimento=new DateTime(), Peso= 10.0, Tipo="roedor"});
            stubListAnimals.Add(new Animal {Id=id, Nome="totó",
            DataNascimento=new DateTime(), Peso= 10.0, Tipo="cachorro"});

            return stubListAnimals;
        }
    }
}
