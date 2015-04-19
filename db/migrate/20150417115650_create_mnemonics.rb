class CreateMnemonics < ActiveRecord::Migration
  def change
    create_table :mnemonics do |t|
      t.text :content
      t.belongs_to :word, index: true
      t.timestamps null: false
    end
  end
end
