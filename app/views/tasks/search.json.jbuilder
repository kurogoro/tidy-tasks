json.array! @tasks do |task|
  json.id task.id
  json.name task.name
end
