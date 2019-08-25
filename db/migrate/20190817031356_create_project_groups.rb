class CreateProjectGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :project_groups do |t|
      t.references :project, foreign_key: true
      t.references :group, foreign_key: true
      t.timestamps
    end
  end
end
