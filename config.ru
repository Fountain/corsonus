require 'rubygems'
require 'bundler'

Bundler.require

require './api/server'
run Sinatra::Application
