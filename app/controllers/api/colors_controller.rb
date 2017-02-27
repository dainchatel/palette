module Api
  class ColorsController < ApplicationController
    def index
      colors = Color.all
      render json: colors.to_json
    end

    def create
      @color = Color.new(color_params)

      @color.save
      render json: @color.to_json
    end

    def show
      color = Color.where(project_id: params[:id])
      render json: color.to_json
    end

    def color_params
      params.require(:color).permit(
        :project_id, :code
      )
    end
  end
end
