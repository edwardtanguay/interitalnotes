require_relative '../qtools/qfil'
require_relative '../qtools/qcli'
require_relative '../qtools/qstr'

lines = QFil.get_lines_from_file("data/flashcards.txt")
QCli.message("Read #{lines.size} lines from flashcards.txt")

flashcards = []
i = 0
while i < lines.size
	suuid = QStr.generate_suuid
	category = lines[i]&.strip || ""
	front = lines[i + 1]&.strip || ""
	back = lines[i + 2]&.strip || ""

	if !category.empty? && !front.empty? && !back.empty?
		flashcards << {
			'suuid' => suuid,
			'category' => category,
			'front' => front,
			'back' => back
		}
	else
		QCli.message(
			"Skipping incomplete flashcard at lines #{i + 1}-#{i + 3}",
			"warning"
		)
	end
	i += 4
end

QCli.message("Generated #{flashcards.size} flashcards")

# Save flashcards to JSON file
require 'json'
json_data = JSON.pretty_generate(flashcards)
begin
	QFil.write_text_block_to_file("parseddata/flashcards.json", json_data)
	QCli.message("Wrote #{flashcards.size} flashcards to flashcards.json")
rescue
	QCli.message("Error writing flashcards to JSON file", "error")
end