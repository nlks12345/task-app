# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

go to config/database.yml change your local db env
rails db:create

add these line in GemFile

gem "pg"
gem "rack-cors"
group :development, :test do
  gem 'rspec-rails'
end

bundle install


For RSpec :
rails generate rspec:install

mkdir -p test/controllers
touch test/controllers/tasks_controller_test.rb
copy paste the code 
and 
bundle exec rspec

End for RSpec
