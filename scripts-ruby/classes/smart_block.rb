require_relative '../qtools/qstr'
require_relative '../qtools/qdev'
require_relative '../qtools/qfil'

class SmartBlock
	def initialize(blockTemplateIdCode, markerBlockIdCode, pre_tabs = 0)
		@blockTemplateIdCode = blockTemplateIdCode
		@markerBlockIdCode = markerBlockIdCode
		@pre_tabs = pre_tabs
		self.init_state
	end

	def init_state
		@lines = QFil.get_lines_from_file("scripts/templates/blockTemplate_#{@blockTemplateIdCode}.txt")
		self.build_smart_lines
	end
	
	def build_smart_lines
		@smart_lines = []
		@smart_lines << SmartLine.new("//##MARKER:#{@markerBlockIdCode}.begin##")
		@lines.each_with_index do |line, index|
			smart_line = SmartLine.new(line, index + 1)
			@smart_lines << smart_line
		end
		@smart_lines << SmartLine.new("//##MARKER:#{@markerBlockIdCode}.end##")
	end

	def add_to_smart_lines(marker_index, smart_lines, pre_tabs, variables = {})
		new_smart_lines = []
		smart_lines.each_with_index do |smart_line, index|
			if index == marker_index
				@smart_lines.each do |smart_line|
					new_smart_lines << SmartLine.new(smart_line.line, 0, smart_line.num_of_tabs + pre_tabs, variables)
				end
			end
			new_smart_lines << smart_line
		end
		return new_smart_lines
	end

	def debug
		puts "SmartBlock Debug:"
		puts "  blockTemplateIdCode: #{@blockTemplateIdCode}"
		puts "  markerBlockIdCode: #{@markerBlockIdCode}"
		puts "  pre_tabs: #{@pre_tabs}"
		puts "========================================="
		@smart_lines.each do |smart_line|
			puts smart_line.get_visble_tab_line
		end
		puts "========================================="
	end
end