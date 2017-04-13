class Code < ActiveRecord::Base
	validates :data, format: {with: /\A[0-1]{8}\z/, message: "Code can only consist of 1 or 0 and must be 8 digits"}
end
