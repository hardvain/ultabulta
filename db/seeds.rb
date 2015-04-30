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


file = IO.readlines("#{Rails.root}/lib/assets/rc_passages")
passages=[]
current_passage={questions:[],passage:""}
file.each do |line|
  if line != "\n"
    chars = line[0] << line[1]
    if chars == 'Q.'
      current_passage[:questions] << {question:line.sub("Q.","").strip}

    elsif chars == '**'
      last_question = current_passage[:questions].last
      if last_question[:answers] == nil
        last_question[:answers]=[]
      end

      last_question[:answers] << line.sub("***","").strip
    else
      current_passage[:questions] = current_passage[:questions].reverse
      current_passage[:questions].each do |question|
        question[:answers] = question[:answers].reverse
      end
      passages << current_passage
      current_passage={questions:[],passage:""}
      current_passage[:passage] = line
    end
  end
end

passage_models = passages.drop(1).map do |passage|
  questions = passage[:questions].map do |question|
    answers = question[:answers].map do |answer|
      Answer.new(content: answer)
    end
    Question.new(content: question[:question], answers: answers)
  end

  Passage.new(content:passage[:passage], questions:questions)
end

passage_models.each(&:save)
