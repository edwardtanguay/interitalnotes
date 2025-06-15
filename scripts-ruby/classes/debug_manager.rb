class DebugManager
	def initialize(title)
		@title = title
		@lines = []
	end

	def add_line(line)
		@lines << line
	end

	def render(mode = "display")
		r = ""
		r += "+-#{@title.upcase}---------------------------+\n"
		@lines.each do |line|
			r += "| #{line}\n"
		end
		r += "+---#{"-" * @title.length}-------------------------+\n"
		if(mode == "display")
			puts r
		else
			return r
		end
	end

end