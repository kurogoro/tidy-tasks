class ProjectsController < ApplicationController
  def new
    @project = Project.new
  end
  def create
    if project_save
      redirect_to root_path, notice: 'プロジェクトを作成しました'
    else
      render :new
    end
  end

  private
  def create_project_params
    params.require(:project).permit(:name, :detail, :deadline, :public_access_id).merge(administrator_id: current_person.id)
  end
  def create_group_params
    params.require(:project).permit({ group_ids: [] })
  end
  def project_save
    Project.transaction do
      @project = Project.create!(create_project_params)
      @project.groups << Group.where(id: create_group_params[:group_ids])
      @project.save!
    end
  end
end
