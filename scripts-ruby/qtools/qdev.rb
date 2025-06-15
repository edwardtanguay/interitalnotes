module QDev
  # Prints a debug line with timestamp
  #
  # Example output:
  # 2025-04-14 18:18:06 ### was here ##############
  def self.debug(obj)
    timestamp = Time.now.strftime('%Y-%m-%d %H:%M:%S')

    if obj.is_a?(String)
      puts "⚒️  #{timestamp} - #{obj}"
    else
      p obj
    end
  end

end