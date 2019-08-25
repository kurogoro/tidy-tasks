class TaskPerson < ApplicationRecord
  belongs_to :task
  belongs_to :person
end
