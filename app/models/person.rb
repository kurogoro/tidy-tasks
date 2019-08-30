class Person < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, :email, :password, presence: true
  validates :password, length: { minimum: 6 }

  has_many :administrator_projects, class_name: 'Project', foreign_key: 'administrator_id'
  has_many :administrating_groups, class_name: 'Group', foreign_key: 'administrator_id'
  has_many :group_members, foreign_key: 'member_id'
  has_many :belonged_groups, class_name: 'Group', through: :group_members, source: :group
  has_many :project_members, foreign_key: 'member_id'
  has_many :belonged_projects, class_name: 'Project', through: :project_members, source: :project
  has_many :task_people
  has_many :tasks, through: :task_people

  def email_required?
    false
  end
  def email_changed?
    false
  end
end
