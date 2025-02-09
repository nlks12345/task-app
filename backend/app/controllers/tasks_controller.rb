class TasksController < ApplicationController
  before_action  only: %i[ show update destroy ]

  # GET /tasks
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create

    create_params = {
      title: params[:title], # Convert title to uppercase
      description: params[:description] || "No description provided", # Default description
      completed: params[:completed] || false # Default completed to false
    }
    
    # render json: { received_params: create_params[:description] }, status: :ok

    @task = Task.new(create_params)

    if @task.save
      render json: @task, status: :created, location: "/tasks/#{@task.id}"
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/update
  def updateStatus

    @task = Task.find(params[:id])

    update_params = {
      title: params[:title] ,
      description: params[:description],
      completed: params[:completed] || false # Default completed to false
    }
    
    if @task
      if @task.update(update_params)
        render json: @task
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Task not found" }, status: :not_found
    end
  end

  # DELETE /tasks/delete
  def delete
    @task = Task.find(params[:id])

    if @task
      @task.destroy!
      render status: :ok , json: {message: "Deleted #{@task.title}"}
    else
      render json: { error: "Task not found" }, status: :not_found
    end

  end

  private
    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :completed)
    end
end
