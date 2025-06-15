require_relative '../qtools/qstr'
require_relative './dynamic_file'
require_relative './file_builder'
require_relative './debug_manager'

# Creates and deletes a React page
class PageManager
	def initialize(page_title)
		@page_title = page_title
		@page_pascal = QStr.force_pascal_notation(page_title)
		@page_camel = QStr.force_camel_notation(page_title)
		@page_text = QStr.force_text_notation(page_title)
		@page_tsx_page_and_file_name = "src/pages/Page#{@page_pascal}.tsx"
		@main_tsx_import_line_marker = "importPage#{@page_pascal}"
		@main_tsx_router_block_marker = "routerEntry#{@page_pascal}"
		@nav_tsx_entry_block_marker = "navEntry#{@page_pascal}"
	end

	def create_page
		self.create_page_tsx
		self.add_code_to_main_tsx	
		self.add_code_to_nav_tsx	
	end

	def delete_page
		self.delete_page_tsx
		self.delete_code_from_main_tsx
		self.delete_code_from_nav_tsx
	end

	def delete_page_tsx
		QFil.delete_file(@page_tsx_page_and_file_name)
	end

	def delete_code_from_nav_tsx
		@dfMain = DynamicFile.new('src/components/Nav.tsx')
		@dfMain.delete_block_with_marker(@nav_tsx_entry_block_marker)
		@dfMain.rerender_to_file
	end

	def delete_code_from_main_tsx
		@dfMain = DynamicFile.new('src/main.tsx')
		@dfMain.delete_line_with_marker(@main_tsx_import_line_marker)
		@dfMain.delete_block_with_marker(@main_tsx_router_block_marker)
		@dfMain.rerender_to_file
	end

	def create_page_tsx
		@fbPage = FileBuilder.new("newPage", @page_tsx_page_and_file_name)
		@fbPage.add_variable('pagePascal', @page_pascal)
		@fbPage.add_variable('pageCamel', @page_camel)
		@fbPage.add_variable('pageText', @page_text)
		@fbPage.render_to_file
	end

	def add_code_to_main_tsx
		@dfMain = DynamicFile.new('src/main.tsx')
		@dfMain.add_variable('pageTitle', @page_title)
		@dfMain.add_variable('pagePascal', @page_pascal)
		@dfMain.add_variable('pageCamel', @page_camel)
		@dfMain.add_line_before_marker('importStatementArea', @main_tsx_import_line_marker, 'import { Page@@pagePascal } from "./pages/Page@@pagePascal.tsx";')
		@dfMain.add_block_before_marker('routerEntryArea', @main_tsx_router_block_marker, 'routerEntryBlock')
		@dfMain.rerender_to_file
	end

	def add_code_to_nav_tsx
		@dfMain = DynamicFile.new('src/components/Nav.tsx')
		@dfMain.add_variable('pageTitle', @page_title)
		@dfMain.add_variable('pagePascal', @page_pascal)
		@dfMain.add_variable('pageCamel', @page_camel)
		@dfMain.add_block_before_marker('navEntryArea', @nav_tsx_entry_block_marker, 'navEntryBlock')
		@dfMain.rerender_to_file
	end

	def debug(mode = "display")
		dm = DebugManager.new("PageBuilder")
		dm.add_line("Page Title: #{@page_title}")
		dm.add_line("Page Pascal: #{@page_pascal}")
		dm.add_line("Page Camel: #{@page_camel}")
		dm.add_line("Page Text: #{@page_text}")
		if(mode == "display")
			dm.render
		else 
			return dm.render("text")
		end
	end
end