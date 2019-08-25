class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :detail
      t.datetime :start_time
      t.datetime :completion_time
      t.float :estimate_hours
      t.references :project, foreign_key: true
      t.references :work_process, foreign_key: true
      t.timestamps
    end
  end
end
