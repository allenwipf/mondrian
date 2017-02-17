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
	saveCanvas(saveGameData)

}

get ("/data"){

	date = (params["gameId"])
	getPastCanvas(date)

	return session[:requestedDay]
}

get ("/titles"){

	getCanvasTitles
	return session[:canvasTitles]
}
