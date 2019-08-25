class CreateTaskPeople < ActiveRecord::Migration[5.2]
  def change
    create_table :task_people do |t|
      t.references :task, foreign_key: true
      t.references :person, foreign_key: true
      t.timestamps
    end
  end
end
