# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'json'

words = File.read("#{Rails.root}/lib/assets/words.json")
meanings =[], examples =[], mnemonics = []
JSON.parse(words).each do |word|
  if word['definitions']
    meanings = word['definitions'].map do |definition|
      Meaning.new(content:definition)
    end
  end

  if word['examples']
    examples = word['examples'].map do |example|
      Example.new(content:example)
    end
  end

  if word['mnemonics']
    mnemonics = word['mnemonics'].map do |mnemonic|
      Mnemonic.new(content:mnemonic)
    end
  end

  puts word['id']
  Word.create(name:word['word'],meanings:meanings,examples:examples,mnemonics:mnemonics)
end