class Task < ApplicationRecord
  validates :name, presence: true

  belongs_to :project
  belongs_to :work_process
  has_many :task_people
  has_many :people, through: :task_people
end
