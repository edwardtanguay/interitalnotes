require_relative '../qtools/qdev'
require_relative '../developer/learn'

ARGV.each do |arg|
  method_name = "ex_#{arg}"
  if Learn.new.respond_to?(method_name)
    Learn.new.send(method_name)
  else
    QDev.debug("Method #{method_name} not found") 
  end
end