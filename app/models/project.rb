class Project < ApplicationRecord
  validates :name, :public_access_id, presence: true

  belongs_to :administrator, class_name: "Person", foreign_key: 'administrator_id'
  has_many :project_groups, dependent: :delete_all
  has_many :groups, through: :project_groups
  has_many :project_members, dependent: :delete_all
  has_many :members, class_name: "Person", through: :project_members, source: :member
  has_many :tasks
  belongs_to_active_hash :public_access
end
