class HelloWorldController < ApplicationController

  before_action :require_user, only: [:index, :show]

  def index
    @user_props = { user: @current_user}
  end
end
