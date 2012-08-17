require 'sinatra'
require 'json'

@twilio = Twilio::REST::Client.new(
  TWILIO_SID = ENV['CORSONUS_TWILIO_SID'] || raise("please set CORSONUS_TWILIO_SID"),
  TWILIO_TOKEN = ENV['CORSONUS_TWILIO_TOKEN'] || raise("please set CORSONUS_TWILIO_TOKEN")
)

TRACKS = JSON.parse File.read(File.join(File.dirname(__FILE__), 'tracks.json'))

set :root, File.dirname(__FILE__)
enable :logging

set :start_time, nil
set :tracks_by_sid, {}

before '/twilio/*' do
  @sid = params[:CallSid]
  settings.tracks_by_sid[@sid] ||= nil
end

get '/twilio/call' do
  response = Twilio::TwiML::Response.new do |r|
    r.Gather action: '/twilio/choose_song', numDigits: 1 do |g|
      g.Say "Welcome to Corsonus. This application has been designed to accompany a live theatrical performance.  You can always visit corsonus.com for more details."
      g.Pause length: 1
      g.Say "Please select an audio performance."
      
      TRACKS.each_with_index do |track, i|
        g.Say "Press #{i + 1} for #{track['name']}."
        g.Pause length: 1
      end
    end
  end
  response.text
end

# registered as the Status Callback URL
# see https://www.twilio.com/docs/api/twiml/twilio_request#asynchronous
post '/twilio/hangup' do
  settings.tracks_by_sid.delete @sid
  "OK"
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

    settings.tracks_by_sid[@sid] = track

    r.Redirect '/twilio/listen', method: 'GET'
  end
  response.text
end

get '/twilio/listen' do
  response = Twilio::TwiML::Response.new do |r|
    start = settings.start_time
    if start
      track = settings.tracks_by_sid[@sid]
      if track.nil?
        logger.info "track not set for caller #{@sid}"
        track = TRACKS.shuffle
        settings.tracks_by_sid[@sid] = track
      end

      # wait until the start time, if necessary
      remaining = (Time.now - start).round
      r.Pause(remaining) if remaining >= 1

      r.Play track['audio_url']
    else
      logger.info "no start time - waiting"
      r.Pause length: 5
      r.Redirect '/twilio/listen', method: 'GET'
    end
  end
  response.text
end


get '/trigger' do
  if settings.start_time
    haml :countdown
  else
    haml :trigger
  end
end

post '/trigger' do
  set :start_time, Time.now + 10
  haml :countdown
end

post '/reset' do
  set :start_time, nil
  redirect to('/trigger')
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
