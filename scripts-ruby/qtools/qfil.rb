require_relative './qcli'
require_relative './qdev'
require_relative './qstr'

module QFil

	def self.get_lines_from_file(pathAndFileName)
		relativePathAndFileName = self.convert_path_and_file_name_to_relative(pathAndFileName)
		begin
			file_content = File.read(relativePathAndFileName)
			file_content.split(/\r?\n/)
		rescue => error
			QCli.message("Error reading file at #{relativePathAndFileName}: #{error.message}", "error")
			[]
		end
	end

	def self.write_text_block_to_file(pathAndFileName, text)
		relativePathAndFileName = self.convert_path_and_file_name_to_relative(pathAndFileName)
		File.write(relativePathAndFileName, text)
	end

	def self.write_lines_to_file(pathAndFileName, lines)
		relativePathAndFileName = self.convert_path_and_file_name_to_relative(pathAndFileName)
		begin
			File.open(relativePathAndFileName, 'w') do |file|
				lines.each { |line| file.puts(line) }
			end
		rescue => error
			QCli.message("Error writing to file at #{relativePathAndFileName}: #{error.message}", "error")
		end
	end

	def self.convert_path_and_file_name_to_relative(pathAndFileName)
		if pathAndFileName.start_with?('scripts/')
			pathAndFileName.gsub('scripts/', '../')
		else
			"../../#{pathAndFileName}"
		end	
	end

	# deletes a file at the specified path
	def self.delete_file(pathAndFileName)
		relativePathAndFileName = self.convert_path_and_file_name_to_relative(pathAndFileName)
		begin
			File.delete(relativePathAndFileName)
		rescue => error
			QCli.message("Error deleting file at #{relativePathAndFileName}: #{error.message}", "error")
		end
	end

	# checks if a file exists at the specified path
	def self.file_exists?(pathAndFileName)
		relativePathAndFileName = self.rebase_to_root(pathAndFileName)
		File.exist?(relativePathAndFileName)
	end	

end