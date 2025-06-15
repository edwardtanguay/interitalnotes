require_relative '../qtools/qcli'
require_relative '../classes/page_manager'

if ARGV.length < 1
  QCli.message("Usage for DELETE PAGE command:", "info")
  QCli.message("npm run dp \"More Info\"", "check")
  exit
else
	page_title = ARGV[0];
	pm = PageManager.new(page_title)
	pm.delete_page
end
