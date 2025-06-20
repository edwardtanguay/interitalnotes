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
				verb = line
				verb = verb.split(":", 1)[0]
				verb = verb.split("#", 1)[0]
				verb = verb.split("//", 1)[0]
				verb = verb.strip()
				self.verbs.append({
					"name": verb,
					"meaning": self.__get_meaning(line),
					"conjugation_notes": self.__get_conjugation_notes(line),
					"examples": self.__get_examples(line)
					})

	def __get_examples(self, line: str) -> list[str]:
		raw_example_text = self.__get_text_after_first_semicolon(line)
		if raw_example_text == '':
			return []
		return self.__parse_line_to_dicts(raw_example_text)
		# return self.__parse_line_to_dicts("1iii; 1eee; 2iii; 2eee")

	def __parse_line_to_dicts(self, line: str) -> list[dict]:
		parts = [p.strip() for p in line.split(';')]
		if len(parts) % 2 != 0:
			raise ValueError("Uneven number of parts in example line: " + line)

		result = []
		for i in range(0, len(parts), 2):
			italian = parts[i]
			english = parts[i + 1]
			result.append({"italian": italian, "english": english})
		return result

	
	def __get_text_after_first_semicolon(self, s: str) -> str:
		parts = s.split(';', 1)
		return parts[1].strip() if len(parts) > 1 else ''


	def __get_conjugation_notes(self, line: str) -> str:
		if ":" in line and "//" in line:
			start = line.find(":") + 1
			end = line.find("//")
			return line[start:end].strip()
		return ""

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
	def __get_meaning(self, line: str) -> str:

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

