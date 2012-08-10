require 'sinatra'
require 'json'

get '/start.json' do
  content_type :json
  time = Time.now + 10
  # in milliseconds
  { start_time: (time.to_f * 1000).to_i }.to_json
end
