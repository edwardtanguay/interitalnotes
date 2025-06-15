require_relative '../qtools/qdev'
require_relative '../qtools/qcli'

SCORE = 100 # constant defined at the top level

class Learn
	def print_title(title) 
		QCli.message(title)
	end

	def ex_001
		self.print_title("EX001: Create a file")
		path_and_file_name = "../developer/output/test.txt"
		File.open(path_and_file_name, "w") do |file|
			file.puts("this is line 1")
			file.puts("this is line 2")
		end
		QDev.debug("File #{path_and_file_name} created")
	end

	def ex_002
		self.print_title("EX002: Various ways to print text")
		puts "hello 1" # automatically adds a newline
		print "hello 2\n" # prints without newline
		p "hello 3" # prints everything including quotes and newlines
		p "hello 4" # prints everything including quotes and newlines
	end

	def ex_003
		self.print_title("EX003: String interpolation and concatenation, and constant")
		age = 34
		puts "Your age is #{age}" # string interpolation
		puts 'Your age is #{age}' # DOESN'T WORK: single quotes do not interpolate
		age = 35
		puts "Your age is " + age.to_s # concatenation with conversion to string 
		# SCORE = 100 # this will raise an error because SCORE is a constant defined inside a method
		puts "the score is #{SCORE}"	# prints the constant SCORE
		# SCORE = 110 # This will raise an error because SCORE is a constant
	end

	def ex_004
		ex_001 # call the first example to create the file
	end

end