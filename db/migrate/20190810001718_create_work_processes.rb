class CreateWorkProcesses < ActiveRecord::Migration[5.2]
  def change
    create_table :work_processes do |t|
      t.string :name, null: false, unique: true
      t.text :detail
      t.timestamps
    end
  end
end
