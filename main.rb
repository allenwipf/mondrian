require "sinatra"
require_relative './functions.rb'
require "pry"
require "csv"
require 'json'
enable :sessions


get ("/"){

	erb :index
}

post ("/"){

	saveGameData = (params["game"])
	save_game(saveGameData)

}

get ("/data"){

	date = "1"
	getPastCanvas(date)

	return session[:requestedDay]

}
