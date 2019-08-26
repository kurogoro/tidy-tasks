class GroupsController < ApplicationController
  def new
    @group = Group.new
    @group.members << current_person
  end
  def create
    if group_save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end
  def search
    @groups = Group.where.not(id: search_params[:group_ids]).where('name LIKE(?)', "#{search_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def create_group_params
    params.require(:group).permit(:name, :administrator_id)
  end
  def create_member_params
    params.require(:group).permit({ member_ids: [] })
  end
  def search_params
    params.permit(:keyword, { group_ids: [] })
  end
  def group_save
    Group.transaction do
      @group = Group.create!(create_group_params)
      @group.members << Person.where(id: create_member_params[:member_ids])
      @group.save!
    end
  end
end
