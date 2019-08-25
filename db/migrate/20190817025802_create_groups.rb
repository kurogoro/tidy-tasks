class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :name, unique: true, null: false
      t.references :administrator, foreign_key: { to_table: :people }
      t.timestamps
    end
  end
end
