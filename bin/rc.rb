file = IO.readlines("../lib/assets/rc_passages")
passages=[]
current_passage = {questions:[]}
previous_type=""
is_next_passage_new = false
file.each_with_index do |line,index|
  puts index
  chars = line[0] << line[1]
  type = ""
  if chars == '17' || chars == '18' ||chars == '19' ||chars == '20' ||chars == '21' ||chars == '22' ||chars == '23' ||chars == '24' ||chars == '25' ||chars == '26' ||chars == '27'
    is_next_passage_new = true
    type = "Q"
  elsif chars == '(A' || chars == '(B' ||chars == '(C' ||chars == '(D' ||chars == '(E'
    type = "A"
  elsif chars[0] == 'I.' || chars[0] == 'II.' || chars[0] == 'III.'
    type = "QA"
  else
    if is_next_passage_new
      passages << current_passage
      current_passage = {questions:[]}
    end
    type = "P"
  end
  if previous_type == "P" && type == "P"
    current_passage[:passage] = current_passage[:passage] << line
  elsif type == "P"
    current_passage[:passage] = line
    is_next_passage_new = false

  elsif type == "Q"
    is_question = false

    current_passage[:questions] << {question: line}
  elsif type == "QA"
    current_passage[:questions].last << line

  elsif type == "A"
    last_question = current_passage[:questions].last
    answers = last_question[:answers]
    if answers != nil
      answers << line
    else
      last_question[:answers] = [line]
    end
  end
  previous_type = type
end