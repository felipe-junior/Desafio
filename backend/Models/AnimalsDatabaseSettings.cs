namespace BackendDesafio.Models
{
    public class AnimalsDatabaseSettings : IAnimalsDatabaseSettings
    {
        public string AnimalsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IAnimalsDatabaseSettings
    {
        string AnimalsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}