using BackendDesafio.Models;
using BackendDesafio.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BackendDesafio.Controllers
{

    [Route("api/animals")]
    [ApiController]

    public class AnimalsController: ControllerBase{
        private readonly AnimalService _animalService;

        public AnimalsController(AnimalService animalService)
        {
            _animalService = animalService;
        }

        [HttpGet]
        public ActionResult<List<Animal>> Get() { 
            System.Console.WriteLine("Passou");
            return _animalService.GetAnimals();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Animal animal)
        {
            System.Console.WriteLine("Passou");
            var result = await  _animalService.Create(animal);
            return Created("api/[controller]/{animal.Id}", animal);
        }

        [HttpGet("{id:length(24)}", Name = "Get")]
        public ActionResult<Animal> Get(string id)
        {
            var animal = _animalService.Get(id);
            if (animal == null)
            {
                return NotFound();
            }
            return animal;
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Animal newAnimal){
            var result = _animalService.Get(id);
            if(result == null)
                return NotFound();
            
            _animalService.Update(id, newAnimal);
            return Ok(newAnimal);
        }      

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var animal = _animalService.Get(id);

            if (animal == null)
            {
                return NotFound();
            }
            _animalService.Delete(animal);

            return NoContent();
        }
    }

}