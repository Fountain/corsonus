require 'sinatra'
require 'json'

@tracks_by_sid = {}

@twilio = Twilio::REST::Client.new(
  TWILIO_SID = ENV['CORSONUS_TWILIO_SID'] || raise("please set CORSONUS_TWILIO_SID"),
  TWILIO_TOKEN = ENV['CORSONUS_TWILIO_TOKEN'] || raise("please set CORSONUS_TWILIO_TOKEN")
)

TRACKS = JSON.parse File.read(File.join(File.dirname(__FILE__), 'tracks.json'))

get '/twilio/call' do
  response = Twilio::TwiML::Response.new do |r|
    r.Say "Welcome to Corsonus. This application has been designed to accompany a live theatrical performance.  You can always visit corsonus.com for more details.  Please choose a song."
    
    r.Gather action: '/twilio/choose_song', numDigits: 1 do |g|
      g.Say "Please select an audio performance."
      
      TRACKS.each_with_index do |track, i|
        g.Say "Press #{i + 1} for #{track['name']}."
      end
    end
  end
  response.text
end

post '/twilio/choose_song' do
  puts params.inspect
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
