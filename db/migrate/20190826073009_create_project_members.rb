class CreateProjectMembers < ActiveRecord::Migration[5.2]
  def change
    create_table :project_members do |t|
      t.references :project, foreign_key: true
      t.references :member, foreign_key: { to_table: :people }
      t.timestamps
    end
  end
end
