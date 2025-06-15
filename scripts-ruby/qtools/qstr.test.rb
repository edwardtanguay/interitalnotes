require 'minitest/autorun'
require_relative 'qstr'

class TestQStr < Minitest::Test
	def test_generate_suuid_length
		suuid = QStr.generate_suuid
		assert_equal 6, suuid.length
	end

	def test_generate_suuid_characters
		suuid = QStr.generate_suuid
		assert_match /^[A-Za-z0-9]{6}$/, suuid
	end

	def test_generate_suuid_randomness
		suuids = Array.new(1000) { QStr.generate_suuid }
		unique_count = suuids.uniq.size
		assert_operator unique_count, :>, 990  # 990+ unique suggests sufficient randomness
	end
end

class TestQstrConvertMultipleSpacesToOneSpace < Minitest::Test
	def test_convert_multiple_spaces_to_one_space
		test_cases = [
			{expected: "Hello World", input: "Hello   World"},
			{expected: "Hello World", input: "Hello    World"},
			{expected: "Hello World", input: "   Hello   World   "},
			{expected: "Hello World", input: "Hello World"},
			{expected: "", input: "   "}
		]

		test_cases.each do |test_case|
			assert_equal test_case[:expected], QStr.convert_multiple_spaces_to_one_space(test_case[:input])
		end
	end
end

class TestQstrPutSpaceBeforeEveryCapitalLetter < Minitest::Test
	def test_main
		test_cases = [
			{expected: "read Text File", input: "readTextFile"},
			{expected: "Read Text File", input: "ReadTextFile"},
			{expected: "read-text-file", input: "read-text-file"},
			{expected: "read_text_file", input: "read_text_file"}
		]

		test_cases.each do |test_case|
			assert_equal test_case[:expected], QStr.put_one_space_before_every_capital_letter_except_first(test_case[:input])
		end
	end
end

class TestForceTextNotation < Minitest::Test
	def test_force_text_notation
		inputs = ["read file", "Read File", "readFile", "ReadFile", "read-file", "read_file"]
		inputs.each do |input|
			assert_equal "read file", QStr.force_text_notation(input) 
		end
	end
end

class TestForceTitleNotation < Minitest::Test
	def test_force_title_notation
		inputs = ["read file", "Read File", "readFile", "ReadFile", "read-file", "read_file"]
		inputs.each do |input|
			assert_equal "Read File", QStr.force_title_notation(input) 
		end
		test_cases = [
			{expected: "Read the File", input: "read the file"},
			{expected: "A an the and but or for nor on at to from by in of with over Under", input: "a an the and but or for nor on at to from by in of with over under"},
		]
		test_cases.each do |test_case|
			assert_equal test_case[:expected], QStr.force_title_notation(test_case[:input])
		end
	end
end

class TestForcePascalNotation < Minitest::Test
	def test_force_pascal_notation
		inputs = ["read file", "Read File", "readFile", "ReadFile", "read-file", "read_file"]
		inputs.each do |input|
			assert_equal "ReadFile", QStr.force_pascal_notation(input) 
		end
	end
end

class TestForceCamelNotation < Minitest::Test
	def test_force_camel_notation
		inputs = ["read file", "Read File", "readFile", "ReadFile", "read-file", "read_file"]
		inputs.each do |input|
			assert_equal "readFile", QStr.force_camel_notation(input) 
		end
	end
end

class TestForceSnakeNotation < Minitest::Test
	def test_force_snake_notation
		inputs = ["read file", "Read File", "readFile", "ReadFile", "read-file", "read_file"]
		inputs.each do |input|
			assert_equal "read-file", QStr.force_snake_notation(input) 
		end
	end
end

class TestForceKebabNotation < Minitest::Test
	def test_force_kebab_notation
		inputs = ["read file", "Read File", "readFile", "ReadFile", "read-file", "read_file"]
		inputs.each do |input|
			assert_equal "read_file", QStr.force_kebab_notation(input) 
		end
	end
end

class TestGetNumberOfPrecedingTabs < Minitest::Test
	def test_get_number_of_preceding_tabs
		test_cases = [
			{expected: 0, input: "Hello World"},
			{expected: 1, input: "\tHello World"},
			{expected: 2, input: "\t\tHello World"},
			{expected: 0, input: "   Hello World"},
			{expected: 3, input: "\t\t\tHello World"},
			{expected: 3, input: "\t\t\tHello World\t"},
			{expected: 3, input: "\t\t\tHello\tWorld\t"}
		]

		test_cases.each do |test_case|
			assert_equal test_case[:expected], QStr.get_number_of_preceding_tabs(test_case[:input])
		end
	end
end

class TestChopLeft < Minitest::Test
	def test_chop_left
		test_cases = [
			{expected: "Hello World", main: "Hello World", chunk: "nn"},
			{expected: "Hello World", main: "nnHello World", chunk: "nn"},
		]	
		test_cases.each do |test_case|
			assert_equal test_case[:expected], QStr.chop_left(test_case[:main], test_case[:chunk])
		end
	end
end

class TestChopRight < Minitest::Test
	def test_chop_right
		test_cases = [
			{expected: "Hello World", main: "Hello World", chunk: "nn"},
			{expected: "Hello World", main: "Hello Worldnn", chunk: "nn"},
		]	
		test_cases.each do |test_case|
			assert_equal test_case[:expected], QStr.chop_right(test_case[:main], test_case[:chunk])
		end
	end
end
