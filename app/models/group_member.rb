class GroupMember < ApplicationRecord
  belongs_to :group
  belongs_to :member, class_name: "Person", foreign_key: 'member_id'
end
