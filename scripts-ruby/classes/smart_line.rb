require_relative '../qtools/qstr'
require_relative '../qtools/qdev'

class SmartLine 
	attr_accessor :line, :core_line, :line_number, :num_of_tabs, :marker, :core_line_parsed, :variables

	# line_number = 0 means the line is added line, not an existing line in the file
	# num_of_tabs = 0 means to get the indention from the line, otherwise it is the number of tabs to indent
	def initialize(line, line_number = 0, num_of_tabs = 0, variables = {})
		@line = line
		@core_line = line.strip
		@core_line_parsed = ""
		@line_number = line_number
		if num_of_tabs == 0
			@num_of_tabs = QStr.get_number_of_preceding_tabs(line)
		else 
			@num_of_tabs = num_of_tabs
		end
		@marker = self.extract_markeridcode_from_line(line)
		@variables = variables || {}
	end

	def parse
		@core_line_parsed = @core_line
		@variables.each do |name, value|
			varMarker = "@@" + name
			if @core_line.include?(varMarker)
				@core_line_parsed = @core_line.gsub(varMarker, value)
			end
		end
	end

	def rerender_line_for_file
		"\t" * @num_of_tabs + @core_line_parsed
	end

	def debug	
		puts @core_line
		puts "--------------------------"
		puts "line_number = #{@line_number}"
		puts "num_of_tabs = #{@num_of_tabs}"
		if @marker.nil?
			puts "(no marker)"
		else
			puts "marker = #{@marker}"
		end
		puts "================================================"
	end

	def get_visble_tab_line
		return "[TAB]" * @num_of_tabs + @core_line
	end


	private

	def extract_markeridcode_from_line(line)
		m = line.match(/##MARKER:(.*?)##/)
		return m[1].strip if m
		nil
	end

	def extract_marker_from_line(line)
		if line.include?("//##MARKER:")
			# Extract the marker ID code from the line
			marker_start = line.index("//##MARKER:") + "//##MARKER:".length
			marker_end = line.index("##", marker_start)
			@marker = line[marker_start...marker_end].strip if marker_end
		else
			@marker = nil
		end
	end
end