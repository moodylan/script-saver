from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.before_request
def handle_options():
    if request.method == 'OPTIONS':
        return '', 200

@app.route('/generate-script', methods=['POST'])
def generate_script():
    data = request.json
    prompt = data.get('prompt', '')
    mock_response = f"This is a generated script for the prompt: {prompt}"
    return jsonify({'script': mock_response})

if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# # allows CORS for all routes, including requests from React (localhost:3000)
# CORS(app, resources={r"/*": {"origins": "*"}})

# @app.before_request
# def handle_options():
#     if request.method == 'OPTIONS':
#         return '', 200

# # define a route for the default URL and what request it accepts
# # POST = send data to the server
# @app.route('/generate-script', methods=['POST', 'OPTIONS'])


# def generate_script():
#   data = request.json
#   prompt = data.get('prompt', '')
#   # TODO: replace this mock with real AI later
#   mock_response = f"This is a generated script for the prompt: {prompt}"
#   return jsonify({'script': mock_response})

# if __name__ == '__main__':
#   app.run(debug=True) # run the server in debug mode
