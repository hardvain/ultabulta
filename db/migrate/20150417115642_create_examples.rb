class CreateExamples < ActiveRecord::Migration
  def change
    create_table :examples do |t|
      t.text :content
      t.belongs_to :word, index: true
      t.timestamps null: false
    end
  end
end
