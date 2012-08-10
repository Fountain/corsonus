require 'sinatra'
require 'json'

get '/start.json' do
  content_type :json
  time = Time.now.utc
  # round up to the next minute
  time = Time.utc time.year, time.mon, time.day, time.hour, (time.min + 1)
  # in milliseconds
  { start_time: (time.to_f * 1000).to_i }.to_json
end
