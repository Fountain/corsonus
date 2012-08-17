require 'sinatra'
require 'json'

@users_by_sid = {}
@start_time = nil

@twilio = Twilio::REST::Client.new(
  TWILIO_SID = ENV['CORSONUS_TWILIO_SID'] || raise("please set CORSONUS_TWILIO_SID"),
  TWILIO_TOKEN = ENV['CORSONUS_TWILIO_TOKEN'] || raise("please set CORSONUS_TWILIO_TOKEN")
)

get '/call_start' do
  response = Twilio::TwiML::Response.new do |r|
    r.Say "Hello, and welcome to Corsonus."
  end
  response.text
end

post '/trigger' do
  # interrupt all calls
end


# the iOS api
get '/start.json' do
  content_type :json
  time = Time.now.utc
  # round up to the next minute
  time = Time.utc time.year, time.mon, time.day, time.hour, (time.min + 1)
  # in milliseconds
  { start_time: (time.to_f * 1000).to_i }.to_json
end
