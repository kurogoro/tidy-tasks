class RenameTaskPeopleToTaskMembers < ActiveRecord::Migration[5.2]
  def change
    rename_table :task_people, :task_members
  end
end
