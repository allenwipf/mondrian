require "sinatra"
require_relative './functions.rb'
require "pry"
require "csv"
require 'json'
enable :sessions



def save_game(game_colors)
	info = File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "a") # a to append
	info.print "\n"
	info.print game_colors

	info.close
end


get ("/"){

	erb :index
}

post ("/"){

	saveGameData = (params["game"])
 
	save_game(saveGameData)


	# return session["found"]

}






















# def save_scores(time_data)
# 	info = File.open("/Users/Wipf/Code/projects/waldo/views/data.erb", "a") # a to append
# 	info.print "\n"
# 	info.print time_data + " Seconds"
# 	info.close
# end
