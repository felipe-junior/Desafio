using System;
using Xunit;
using Moq;
using FluentAssertions;
using  BackendDesafio.Controllers;
using  BackendDesafio.Services;
using  BackendDesafio.Models;
using System.Collections.Generic;
using MongoDB.Bson;

namespace backend.tests
{
    public class AnimalsControllerUnitTest
    {

        [Fact]
        public void Test1()
        {   
            string id = ObjectId.GenerateNewId().ToString();
            var animalsStub = StubAnimals(id);
            var animalsStubCopy = StubAnimals(id);
            var serviceStub = new Mock<AnimalService>();
            serviceStub.Setup(serv => serv.GetAnimals()).Returns(animalsStub);
            var controllerAnimal = new AnimalsController(serviceStub.Object);
            var requestresult = controllerAnimal.Get();
           // Assert.IsType<List<Animal>>(requestresult.Value);
            requestresult.Value.Should().BeEquivalentTo(animalsStubCopy,
                options => options.ComparingByMembers<Animal>())

;        }

        private List<Animal> StubAnimals(String id){
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
