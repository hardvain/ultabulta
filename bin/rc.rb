file = IO.readlines("../lib/assets/rc_passages")
passages=[]
current_passage=[]
file.each_with_index do |line,index|
  puts index
  chars = line[0] << line[1]
  type = ""
  if chars == '17'  || chars == '18' ||chars == '19' ||chars == '20' ||
      chars == '21' || chars == '22' ||chars == '23' ||chars == '24' ||
      chars == '25' || chars == '26' ||chars == '27' ||
      chars == '(A' || chars == '(B' ||chars == '(C' ||chars == '(D' ||
      chars == '(E' || chars[0] == 'I.' || chars[0] == 'II.' || chars[0] == 'III.'
    type = "QA"
  else
    type = "P"
  end

  if type == "P"
    passages << {index: (passages.count +1), passage: current_passage}
    current_passage=[]
  end
  current_passage << line

end

puts passages