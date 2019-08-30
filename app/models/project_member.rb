class ProjectMember < ApplicationRecord
  belongs_to :project
  belongs_to :member, class_name: "Person", foreign_key: 'member_id'
end
