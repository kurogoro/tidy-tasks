class AddAdministratorIdToProjects < ActiveRecord::Migration[5.2]
  def change
    add_reference :projects, :administrator, foreign_key: { to_table: :people }
  end
end
