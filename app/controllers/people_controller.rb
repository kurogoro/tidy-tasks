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

  def add_group
    @group_member = GroupMember.new(group_member_params)
    @group_member.save
    # respond_to do |format|
    #   format.html
    #   format.json
    # end
  end
  
  def remove_group
    @group_member = GroupMember.where(group_id: group_member_params[:group_id]).where(member_id: group_member_params[:member_id])
    @group_member.delete_all
    # respond_to do |format|
    #   format.html
    #   format.json
    # end
  end

  def add_project
    @project_member = ProjectMember.new(project_member_params)
    @project_member.save
    # respond_to do |format|
    #   format.html
    #   format.json
    # end
  end

  def remove_project
    @project_member = ProjectMember.where(project_id: project_member_params[:project_id]).where(member_id: project_member_params[:member_id])
    @project_member.delete_all
    # respond_to do |format|
    #   format.html
    #   format.json
    # end
  end

  private
  def search_params
    params.permit(:keyword, { member_ids: [] })
  end

  def group_member_params
    params.permit(:group_id).merge(member_id: current_person.id)
  end

  def project_member_params
    params.permit(:project_id).merge(member_id: current_person.id)
  end
end
