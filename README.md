#### Frontend ########
Setup using NextJs
running in port 3002


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


  cd frontend/task-list-app
  npm run dev


##### Backend ########
Setup using Ruby on Rails with posgreSQL
running in port 3001

go to config/database.yml change your local db env
rails db:create

add these line in GemFile

gem "pg"
gem "rack-cors"
group :development, :test do
  gem 'rspec-rails'
end

bundle install

cd backend/

rails server -p 3001   


For RSpec :
rails generate rspec:install

mkdir -p test/controllers
touch test/controllers/tasks_controller_test.rb
copy paste the code 
and 
bundle exec rspec

End for RSpec

