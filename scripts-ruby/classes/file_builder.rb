require_relative '../qtools/qstr'
require_relative '../qtools/qfil'
require_relative '../classes/dynamic_file'

class FileBuilder
	def initialize(fileTemplate, newPagePathAndFileName)
		@fileTemplate = fileTemplate
		@newPagePathAndFileName = newPagePathAndFileName
		@fileTemplatePathAndFileName = "scripts/templates/fileTemplate_#{@fileTemplate}.txt"

		@variables = {}
		self.init_state
	end

	def init_state
		@lines = QFil.get_lines_from_file(@fileTemplatePathAndFileName)
		self.build_smart_lines
	end
	
	def add_variable(name, value)
		@variables[name] = value
	end

	def render_to_file
		self.parse
		QFil.write_lines_to_file(@newPagePathAndFileName, @smart_lines.map(&:rerender_line_for_file))
	end

	def parse
		@smart_lines.each do |smart_line|
			smart_line.parse
		end
	end

	def debug(level = 0)
		puts "FileBuilder Debug:"
		puts "  fileTemplate: #{@fileTemplate}"
		puts "  pathAndFileName: #{@pathAndFileName}"
		puts "  number of lines: #{@lines.length}"
		if level == 0
			puts "========================================="
			@lines.each do |line|
				puts line
			end
			puts "========================================="
		end
	end
	
	private 

	def build_smart_lines
		@smart_lines = []
		@lines.each_with_index do |line, index|
			smart_line = SmartLine.new(line, index + 1, 0, @variables)
			@smart_lines << smart_line
		end
	end

end