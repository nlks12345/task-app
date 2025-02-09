require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  let!(:task) { Task.create!(title: 'Test Task', description: 'Test description') }

  describe 'GET #index' do
    it 'returns a list of tasks' do
      get :index
      expect(response).to have_http_status(:success)
      expect(assigns(:tasks)).to eq([task])
    end
  end

  describe 'POST #create' do
    it 'creates a new task' do
      expect {
        post :create, params: { title: 'New Task', description: 'New task description', completed: false }
      }.to change(Task, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end

  describe 'POST #updateStatus' do
    it 'updates an existing task' do
      post :updateStatus, params: { id: task.id, title: 'Updated Task', completed: true }
      
      task.reload
      expect(task.title).to eq('Updated Task')
      expect(task.completed).to be(true)
      expect(response).to have_http_status(:ok)
    end

    it 'returns 404 if task is not found' do
      post :updateStatus, params: { id: 999, title: 'Updated Task' }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'POST #delete' do
    it 'deletes an existing task' do
      expect {
        post :delete, params: { id: task.id }
      }.to change(Task, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end

    it 'returns 404 if task is not found' do
      post :delete, params: { id: 999 }
      expect(response).to have_http_status(:not_found)
    end
  end
end
