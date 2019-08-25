class PeopleController < ApplicationController
  def index
  end
  def search
    @people = Person.where.not(id: search_params[:member_ids]).where('nickname LIKE(?)', "#{search_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def search_params
    params.permit(:keyword, { member_ids: [] })
  end
end
