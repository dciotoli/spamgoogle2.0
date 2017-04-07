class StaticPagesController < ApplicationController
	def index
		@key = ENV['GMAPS_DIRECTIONS']
	end
end
