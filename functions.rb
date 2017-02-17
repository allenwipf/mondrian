# saves the colors for the canvas in string format
def saveCanvas(canvas_colors)
	info = File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "a") # a to append
	info.print "\n"
	info.print "\n"
	info.print "#{Time.now.to_i},"
	info.print canvas_colors

	info.close
end


# loops through each saved canvas and gets the one where the date equals the one requested.
# What is return is a string of colors
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

#  gets the titles of each saved canvas and saves as a string session variable
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
	titles = beautifyTitles(titles)
	session[:canvasTitles] = titles
end


# turns the inique ids for each saved canvas title, which is a string represting Epoch time,
# into a more readable format to be displayed on a modal window when uses requets list of 
# saved canvasas.
def beautifyTitles(data)

	titleString = ''
	data.each do |id| 

		allen = Time.at(id.to_i)
		allen = allen.strftime('%a, %b %d %Y %H:%M')
	
		titleString += "<button style='margin: 5px' onclick='getPastCanvas(#{id});'>#{allen}</button>"
 	end
 	return titleString
end

