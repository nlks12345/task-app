class ModifyTaskTableColumn < ActiveRecord::Migration[8.0]
  def change
    # Ensure the title is required (NOT NULL constraint)
    change_column :tasks, :title, :string, null: false
    
    # Set default value for completed to false
    change_column_default :tasks, :completed, false
  end
end