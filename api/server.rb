require 'sinatra'
require 'json'

get '/start.json' do
  content_type :json
  time = Time.now + 10
  { start_time: time.to_s }.to_json
end
