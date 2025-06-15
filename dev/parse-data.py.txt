import json

from qtools import *

class Flashcard:
	def __init__(self, suuid, category, front, back):
		self.suuid = suuid
		self.category = category
		self.front = front
		self.back = back

lines = qfil.get_lines_from_file("../data/flashcards.txt")

flashcards = []
for i in range(0, len(lines), 4):
	if i + 3 > len(lines):
		break
	
	category = lines[i].strip()
	front = lines[i+1].strip()
	back = lines[i+2].strip()
	
	flashcard = Flashcard(
		suuid=qstr.generate_short_uuid(),
		category=category,
		front=front,
		back=back
	)
	
	flashcards.append(flashcard.__dict__)

try:
	# Convert flashcards to JSON
	json_data = json.dumps(flashcards, indent=4)
	
	# Write JSON data to file
	with open("../parseddata/flashcards.json", 'w') as json_file:
		json_file.write(json_data)
	
	qcli.message("Successfully updated flashcards.json")

except Exception as err:
	qcli.message(f"Error: {err}", "error")