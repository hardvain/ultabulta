class CreateMeanings < ActiveRecord::Migration
  def change
    create_table :meanings do |t|
      t.text :content
      t.belongs_to :word, index: true
      t.timestamps null: false
    end
  end
end
