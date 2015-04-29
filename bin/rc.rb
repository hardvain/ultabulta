file = IO.readlines("../lib/assets/rc_passages")
passages=[]
current_passage={questions:[],passage:""}
file.each_with_index do |line,index|
  puts index
  if line != "\n"
    chars = line[0] << line[1]
    type = ""
    if chars == 'Q.'
      type = "Q"
    elsif chars == '**'
      type = "A"
    else
      type = "P"
    end

    if type == "P"
      passages << current_passage
      current_passage={questions:[],passage:""}
      current_passage[:passage] = line
    elsif type == "Q"
      current_passage[:questions] << {question:line}
    elsif type=="A"
      last_question = current_passage[:questions].last
      if last_question[:answers] == nil
        last_question[:answers]=[]
      end

      last_question[:answers] << line
    end
  end

end

puts passages