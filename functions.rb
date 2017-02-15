# saves the colors for the game pieces in string format
def save_game(game_colors)
	info = File.open("/Users/Wipf/Code/projects/mondrian/views/data.erb", "a") # a to append
	info.print "\n"
	info.print game_colors

	info.close
end