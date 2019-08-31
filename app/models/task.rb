class Task < ApplicationRecord
  validates :name, presence: true

  belongs_to :project
  belongs_to :work_process
  has_many :task_members, dependent: :delete_all
  has_many :members, class_name: "Person", through: :task_members, source: :member
end
