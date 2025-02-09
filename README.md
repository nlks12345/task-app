#### Frontend ########
Setup using NextJs

npx react-native init TaskListApp
cd task-list-app
npm install react@18 react-dom@18
npm install axios react-query  

npm install react-icons

change package.json to run in port 3002 avoid conflict
"scripts": {
    "dev": "next dev -p 3002",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },


##### Backend ########
Setup using Ruby on Rails with posgreSQL

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

