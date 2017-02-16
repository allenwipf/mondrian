# saves the colors for the game pieces in string format
def save_game(game_colors)
	info = File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "a") # a to append
	info.print "\n"
	# info.print "#{Time.now.to_f},"
	info.print "1,"
	info.print game_colors

	info.close
end



def getPastCanvas(date)

	File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "r") do |data|

		data.each_line do |eachLine|
		
			eachLine = eachLine.split(",rgb")
			
			if eachLine[0] == date
				requestedLine = eachLine[1..17]
				
				 requestedLine = requestedLine.join(",")
				 session[:requestedDay] = requestedLine

			end 
		end
	end

end




	# 	data.each_line do |time|	
	# 		time = time[/\d+\S\d/].to_f   # regular expressions. Rebular.com
	# 		timesArray.push(time)
	# 	end	
	# end

	# timesArray = timesArray.sort
	# timesArray = timesArray[0..9]

	# records = beautifyHighScores(timesArray)
	# session["highScores"] = records
