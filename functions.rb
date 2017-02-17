# saves the colors for the game pieces in string format
def save_game(game_colors)
	info = File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "a") # a to append
	info.print "\n"
	info.print "\n"
	info.print "#{Time.now.to_i},"
	info.print game_colors

	info.close
end



def getPastCanvas(date)

	File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "r") do |data|

		data.each_line do |eachLine|
		    eachLine.delete!("\n")

			eachLine = eachLine.split(",rgb")

			if eachLine[0] == date
				requestedLine = eachLine[1..17]
				
				 requestedLine = requestedLine.join(",")
				 session[:requestedDay] = requestedLine

			end 
		end
	end
end

def getCanvasTitles()
	titles = []
	File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "r") do |data|

		
		
			data.each_line do |eachLine|

				if eachLine.length > 1
			
					eachLine = eachLine.split(",rgb")

					titles.push(eachLine[0])
				end
			end
		
	end
	# titles = titles.join(",")
	titles = beautifyTitles(titles)
	session[:canvasTitles] = titles

end


# Takes the array of top 10 scores and adds "Seconds!" and new line character 
# to each score for display purposes
def beautifyTitles(data)

	titleString = ''
	data.each do |id| 

		allen = Time.at(id.to_i)
		allen = allen.strftime('%a, %b %d %Y %H:%M')
	
		titleString += "<button onclick='getPastGames(#{id});'>#{allen}</button>"
 	end

 	return titleString

end

