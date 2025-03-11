# sort.py
import json
from flask import Flask, request, jsonify 
'''
Flask is a web framework for Python that 
allows the creation of web apps.
'''

# Initialize the Flask app
app = Flask(__name__)

# Function to determine Hogwarts house based on user answers
def determine_house(answers):
    # Dictionary to keep score for each house
    scores = {"Gryffindor": 0, "Hufflepuff": 0, "Ravenclaw": 0, "Slytherin": 0}
    
    # Mapping of answers to respective houses
    mapping = {
        "Bravery": "Gryffindor",
        "Loyalty": "Hufflepuff",
        "Wisdom": "Ravenclaw",
        "Ambition": "Slytherin",
        "Phoenix": "Gryffindor",
        "Hippogrif": "Hufflepuff",
        "Owl": "Ravenclaw",
        "Basilisk": "Slytherin",
        "Defense Against the Dark Arts": "Gryffindor",
        "Herbology": "Hufflepuff",
        "Charms": "Ravenclaw",
        "Potions": "Slytherin"
    }

    # Going through answers and updating house scores
    for answer in answers:
        if answer in mapping:
            scores[mapping[answer]] += 1

    # Determining house with highest score
    sorted_house = max(scores, key=scores.get)
    return sorted_house

# Flask route to handle sorting requests
@app.route("/sort.py", methods=["POST"])
def sort():
    # Receive JSON data from client
    data = request.get_json()
    # Determine house based on answers
    house = determine_house(data["answers"])
    # Return the house as JSON response
    return jsonify({"house": house})

# Run Flask app if script is executed directly
if __name__ == "__main__":
    app.run(debug=True) # Start Flask app in debug mode