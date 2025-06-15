module QCli
	# Prints a CLI message with emoji indicators
	#
	# @param line [String] The message to display
	# @param kind [String] The type of message (info, error, success, warning, doing, ball)
	def self.message(line, kind = "success")
		case kind
		when "info"
			puts "ℹ️  #{line}"
		when "error"
			puts "❌ #{line}"
		when "warning"
			puts "⚠️️  #{line}"
		when "doing"
			puts "⌛ #{line}"
		when "ball"
			puts "🟠 #{line}"
		when "check", "success"
			puts "✅ #{line}"
		else
			puts "bad kind: #{kind}"
		end
	end
end
