import json
from qtools import *

class DataManager:
	def __init__(self):
		self.lines = []
		self.verbs = []
		self.__initialize()

	def __initialize(self):
		self.__load_data()
		self.__build_verbs()

	def __load_data(self):
		self.lines = qfil.get_lines_from_file("../../../../webs/italian/texts/itnotes.html")

	def __build_verbs(self):
		for line in self.lines:
			if "//" in line:
				meaning = self.get_meaning(line)
				verb = line
				verb = verb.split(":", 1)[0]
				verb = verb.split("#", 1)[0]
				verb = verb.split("//", 1)[0]
				verb = verb.strip()
				self.verbs.append({
					"name": verb,
					"meaning": meaning
					})

	# examples
	# adattarsi: // to adapt oneself; il software si adatta; the software automatically adapts
	# alzarsi: // to get up
	# lavarsi: // to wash yourself
	# prepararsi: // to get ready
	# ribellarsi: // to revolt
	# assaggiare##: *, /i, *, /iamo, *, *, * // taste
	# incorporare //
	# envitare# // avoid
	# apprezzare // appreciate
	def get_meaning(self, line: str) -> str:

		# Split the line at the first occurrence of '//' to extract the comment
		comment = line.split('//', 1)[1].strip()
		if not comment:
			return ''
		
		# Only take text before colon if present (ignore explanations)
		if ':' in comment:
			comment = comment.split(':', 1)[0].strip()

		# Cut off examples
		if ';' in comment:
			comment = comment.split(';', 1)[0].strip()

		return comment

	def create_verbs_json_file(self):
		try:
			json_data = json.dumps(self.verbs, indent=4, ensure_ascii=False)
			with open("../parseddata/verbs.json", 'w', encoding='utf-8') as json_file:
				json_file.write(json_data)
			qcli.message(f"Wrote {len(self.verbs)} verbs to verbs.json")
		except Exception as err:
			qcli.message(f"Error: {err}", "error")

