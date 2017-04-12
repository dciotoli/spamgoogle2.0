class StaticPagesController < ApplicationController
	def index
		@key = ENV['GMAPS_DIRECTIONS']
	end
	def twilio
		@toNumber = params['to']
		@body = params['body']

		twilio_number = "+12034091660"

		@client = Twilio::REST::Client.new "ACde161992ff23df09902eaa52c1f526b5", "7524a522cfbaa606ee6ee629d5f14c47"

		@client.account.messages.create({
  			:from => twilio_number,
  			:to => @toNumber, 
  			:body => @body
		})
	end
	def update
	end
	def access
		if params['key'] == 'supersecretpasswordgoeshere'
			render plain: '11100100', status: 202 and return
		else
			render plain: 'INVALID', status: 400 and return
		end
	end
end
