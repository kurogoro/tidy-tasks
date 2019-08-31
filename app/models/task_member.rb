class TaskMember < ApplicationRecord
  belongs_to :task
  belongs_to :member, class_name: "Person", foreign_key: 'member_id'
end
