json.id @passage.id
json.content @passage.content
json.passage_type @passage.passage_type
json.questions @passage.questions do |question|
  json.content question.content
  json.answer question.answer
  json.answers question.answers do |ans|
    json.content ans.content
  end
end
