class Person < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :nickname, :email, :password, presence: true
  validates :password, length: { minimum: 6 }

  def email_required?
    false
  end
  def email_changed?
    false
  end
end
