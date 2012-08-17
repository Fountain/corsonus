require 'sinatra'
require 'json'

@twilio = Twilio::REST::Client.new(
  TWILIO_SID = ENV['CORSONUS_TWILIO_SID'] || raise("please set CORSONUS_TWILIO_SID"),
  TWILIO_TOKEN = ENV['CORSONUS_TWILIO_TOKEN'] || raise("please set CORSONUS_TWILIO_TOKEN")
)

TRACKS = JSON.parse File.read(File.join(File.dirname(__FILE__), 'tracks.json'))

set :start_time, nil
set :tracks_by_sid, {}

before '/twilio/*' do
  @sid = params[:CallSid]
  options.tracks_by_sid[@sid] ||= nil
end

get '/twilio/call' do
  response = Twilio::TwiML::Response.new do |r|
    r.Say "Welcome to Corsonus. This application has been designed to accompany a live theatrical performance.  You can always visit corsonus.com for more details."
    
    r.Gather action: '/twilio/choose_song', numDigits: 1 do |g|
      g.Say "Please select an audio performance."
      
      TRACKS.each_with_index do |track, i|
        g.Say "Press #{i + 1} for #{track['name']}."
      end
    end
  end
  response.text
end

# registered as the Status Callback URL
# see https://www.twilio.com/docs/api/twiml/twilio_request#asynchronous
post '/twilio/hangup' do
  options.tracks_by_sid.delete @sid
end

post '/twilio/choose_song' do
  response = Twilio::TwiML::Response.new do |r|
    track = TRACKS[params[:Digits].to_i - 1]

    if track
      r.Say "You have chosen #{track['name']}.  Please wait."
    else
      track = TRACKS.sample
      r.Say "You failed the first test.  We have chosen for you.  You will be listening to #{track['name']}.  Hope you like it."
    end

    options.tracks_by_sid[@sid] = track

    r.Redirect '/twilio/listen', method: 'GET'
  end
  response.text
end

get '/twilio/listen' do
  response = Twilio::TwiML::Response.new do |r|
    start = options.start_time
    if start
      remaining = Time.now - start
      if remaining <= 1
        # start!
        track = options.tracks_by_sid[@sid]
        if track.nil?
          logger.info "track not set for caller #{@sid}"
          track = TRACKS.shuffle
        end

        r.Play track['audio_url']
      else
        # wait until the start time
        wait = remaining.to_i
        logger.info "waiting #{wait} seconds"
        r.Pause wait
      end
    else
      logger.info "no start time - waiting"
      r.Pause length: 3
      r.Redirect '/twilio/listen', method: 'GET'
    end
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
