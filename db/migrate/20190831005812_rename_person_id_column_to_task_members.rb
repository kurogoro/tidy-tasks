class RenamePersonIdColumnToTaskMembers < ActiveRecord::Migration[5.2]
  def change
    rename_column :task_members, :person_id, :member_id
  end
end
