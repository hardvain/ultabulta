class CreatePassages < ActiveRecord::Migration
  def change
    create_table :passages do |t|
      t.text :content
      t.string :passage_type
      t.timestamps null: false
    end
  end
end
