require_relative '../qtools/qcli'
require_relative '../qtools/qdev'
require_relative '../classes/page_manager'

if ARGV.length < 1
  QCli.message("Usage: npm run cp \"More Info\"", "info")
  exit
else
	page_title = ARGV[0];
	pm = PageManager.new(page_title)
	pm.create_page	
end


