from flask import Flask, request
from flask_restful import Resource, Api 
from sqlalchemy import create_engine
from json import dumps
from flask_jsonpify import jsonify
from flask_cors import CORS, cross_origin

db_connect = create_engine('sqlite:///delta.db')
app = Flask(__name__)
api = Api(app)
CORS(app)

@app.route("/")
def hello():
  return jsonify({'text': 'Flights Searcher'})

class AllFlights(Resource):
    def get(self):
        conn = db_connect.connect() # connect to database
        query = conn.execute("select distinct destination from flights order by destination") # This line performs query and returns json result
        result = [dict(zip({'name'}, i)) for i in query.cursor.fetchall()]  # Fetches all stations
        return jsonify(result);
class Flights(Resource):
  def get(self, station):
    conn = db_connect.connect()
    query = conn.execute("select * from flights where destination =? or origin=?", (station, station))# This line performs query and returns json result
    result = [dict(zip(tuple(query.keys()),i)) for i in query.cursor] # Fetches all flights where destination or origin equals station
    return jsonify(result)
   
api.add_resource(Flights, '/flights/<station>') # Route_1
api.add_resource(AllFlights, '/stations') # Route_2
if __name__ == '__main__':
     app.run(port='5002')