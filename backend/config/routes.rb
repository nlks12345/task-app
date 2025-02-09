# Rails.application.routes.draw do
#   resources :tasks
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
#   # Can be used by load balancers and uptime monitors to verify that the app is live.
#   get "up" => "rails/health#show", as: :rails_health_check

#   # Defines the root path route ("/")
#   # root "posts#index"
# end


Rails.application.routes.draw do
  get "/tasks", to: "tasks#index"        # List all tasks
  get "/tasks/:id", to: "tasks#show"     # Show a specific task
  post "/tasks/create", to: "tasks#create"      # Create a new task
  post "/tasks/update", to: "tasks#updateStatus"   # Update a task
  post "/tasks/delete", to: "tasks#delete" # Delete a task
end