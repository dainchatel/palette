module Api
  class ProjectsController < ApplicationController
    def index
      projects = Project.all
      render json: projects.to_json
    end

    def create
      @project = Project.new(project_params)

      @project.save
      render json: @project.to_json
    end

    def show
      projects = Project.where(user_id: params[:id])
      render json: projects.to_json
    end

    def destroy
      Project.destroy(params[:id])
    end

    def project_params
      params.require(:project).permit(
        :name, :user_id
      )
    end
  end
end
