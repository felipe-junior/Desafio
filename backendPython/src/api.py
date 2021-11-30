from datetime import datetime
from flask import Flask, request
from flask import json
from flask.json import jsonify
from flask_restx import Resource, Api

from Repository import AnimalsRepository


app = Flask(__name__)
api = Api(app)

animals = []

@api.route('/animals/<string:animal_id>')
class Animal(Resource):
    def get(self, animal_id):
        return jsonify({
            "nome":"toto",
            "tipo": "cachorro",
            "peso": "12",
            "dataNascimento": datetime.now()
        })
    def delete(self, animal_id):
        try:
            result = AnimalsRepository.delete(animal_id)
            if(result.deleted_count==0): #Nao achou o id e nao apagou
                return {"msg": "Nao foi possivel encontrar o animal especificado."}, 404
        except Exception as ex:
            return {"msg": "Erro interno"}, 500
    # def put(self, animal_id):
    #     todos[animal_id] = request.form['data']
    #     return {animal_id: todos[animal_id]}
    def delete(self, animal_id):
        print(animal_id)
        print(request.json())

@api.route('/animals')
class Animals(Resource):
    def get(self):
        return AnimalsRepository.getAll()
    def post(self): 
        try:
            data= request.get_json()
            animalName = data.get("nome")
            animalTipo = data.get("tipo")
            animalDataNascimento = data.get("dataNascimento")
            animalPeso = data.get("peso")
            newAnimal = {"nome": animalName, "type": animalTipo, "dataNascimento": animalDataNascimento, "peso": animalPeso}
            result = AnimalsRepository.create(newAnimal)

            if(animalName and animalTipo and animalDataNascimento and animalPeso):
                return {"msg": "Todos os dados são obrigátorios"}, 400
        except Exception as ex:
            return {"msg": "Erro interno"}, 500

        return str(result.inserted_id)
    
if __name__ == '__main__':
    app.run(debug=True)