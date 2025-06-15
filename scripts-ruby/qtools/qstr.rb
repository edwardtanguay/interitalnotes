module QStr
	# Generates a 6-character unique identifier (suuid) consisting of random
	# upper and lower case letters and numbers.
	# Example: "nO57aL"
	def self.generate_suuid
		suuid = String.new
		characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456790"
		6.times do
			suuid << characters[rand(characters.length)]
		end
		suuid
	end

	def self.convert_multiple_spaces_to_one_space(term)
		r = term
		r = r.gsub(/\s+/, ' ')
		r = r.strip
		r
	end

	def self.put_one_space_before_every_capital_letter_except_first(term)
		r = term
		r = r.gsub(/([A-Z])/,' \1')
		r = r.strip
		r
	end

	def self.force_text_notation(term)
		r = term
		if !r.include?("-") && !r.include?("_")
			r = self.put_one_space_before_every_capital_letter_except_first(r)
		end
		r = r.gsub('-', ' ')
		r = r.gsub('_', ' ')
		r = r.downcase
		r = self.convert_multiple_spaces_to_one_space(r)
		r
	end

	def self.title_case_with_exceptions(str)
		small_words = %w[a an the and but or for nor on at to from by in of with over under]
		words = str.split(' ')
		return str if words.empty?

		words = words.map.with_index do |word, i|
			if i == 0 || i == words.length - 1
				word.capitalize
			elsif small_words.include?(word.downcase)
				word.downcase
			else
				word.capitalize
			end
		end
		words.join(' ')
	end

	def self.force_title_notation(term)
		r = term
		r = self.force_text_notation(r)
		r = self.title_case_with_exceptions(r)
		r
	end

	def self.force_pascal_notation(term)
		r = term
		r = self.force_text_notation(r)
		r = r.split.map(&:capitalize).join(' ')
		r = r.gsub(' ', '')
		r
	end

	def self.force_camel_notation(term)
		r = term
		r = self.force_pascal_notation(r)
		r[0] = r[0].downcase if r && r.length > 0
		r	
	end

	def self.force_snake_notation(term)
		r = term
		r = self.force_text_notation(r)
		r = r.gsub(' ', '-')
		r	
	end

	def self.force_kebab_notation(term)
		r = term
		r = self.force_text_notation(r)
		r = r.gsub(' ', '_')
		r	
	end

	def self.get_number_of_preceding_tabs(line)
		tabs = line[/\A\t*/].to_s.length
		tabs
	end

	def self.chop_left(main, chunk) 
		main.gsub(/^#{chunk}/, '')
	end

	def self.chop_right(main, chunk)
		main.gsub(/#{chunk}$/, '')
	end
end