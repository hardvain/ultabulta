class AppController < ApplicationController
  after_filter  :authenticate_user!

  layout 'app'
  def index
  end
end
