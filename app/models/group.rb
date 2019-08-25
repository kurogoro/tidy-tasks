class Group < ApplicationRecord
  validates :name, presence: true

  belongs_to :administrator, class_name: "Person", foreign_key: 'administrator_id'
  has_many :group_members, dependent: :delete_all
  has_many :members, class_name: "Person", through: :group_members, source: :member
  has_many :project_groups
  has_many :projects, through: :project_groups
end
