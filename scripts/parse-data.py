import json

from qtools import *

lines = qfil.get_lines_from_file("../../../../webs/italian/texts/itnotes.html")
verbs = []

for line in lines:
	if "//" in line:
		verb = line
		if ":" in verb:
			verb = verb.split(":", 1)[0]
			verb = verb.split("#", 1)[0]
			verb = verb.split("//", 1)[0]
			verb = verb.strip()
			verbs.append(verb)

print(f"{len(verbs)} verbs")
# for verb in verbs:
# 	print(f"\"{verb}\"")

try:
	json_data = json.dumps(verbs, indent=4)
	
	# Write JSON data to file
	with open("../parseddata/verbs.json", 'w') as json_file:
		json_file.write(json_data)
	
	qcli.message("Successfully updated verbs.json")

except Exception as err:
	qcli.message(f"Error: {err}", "error")
