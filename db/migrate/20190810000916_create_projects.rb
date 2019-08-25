class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name, null: false, unique: true
      t.text :detail
      t.datetime :deadline
      t.integer :public_access_id, null: false
      t.timestamps
    end
  end
end
