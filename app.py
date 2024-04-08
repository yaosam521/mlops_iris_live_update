from flask import Flask
from flask import render_template, request, jsonify
import joblib

species_list = ['Setosa', 'Versicolor', 'Virginica']
    
#Loading the pickled model gives a bunch of errors
model = joblib.load('iris_pipeline.pkl')

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/predict", methods=['POST'])
def predict():
    sepalLength = float(request.json['sepalLength'])
    sepalWidth = float(request.json['sepalWidth'])
    petalLength = float(request.json['petalLength'])
    petalWidth = float(request.json['petalWidth'])

    prediction = model.predict([[sepalLength,sepalWidth,petalLength,petalWidth]])[0]
    return jsonify({'prediction': str(species_list[prediction])})

@app.errorhandler(404)
def not_found(error):
    return render_template('error.html'),404

if __name__ == '__main__':
   app.run()