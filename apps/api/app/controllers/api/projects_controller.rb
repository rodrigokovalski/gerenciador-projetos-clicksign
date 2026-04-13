class Api::ProjectsController < ApplicationController
    before_action :set_project, only: [:show, :update, :destroy]
  
    def index
      projects = Project.order(created_at: :desc)
      render json: serialize(projects)
    end
  
    def show
      render json: serialize(@project)
    end
  
    def create
      project = Project.new(project_params)
  
      if project.save
        render json: serialize(project), status: :created
      else
        render json: { errors: project.errors }, status: :unprocessable_entity
      end
    end
  
    def update
      if @project.update(project_params)
        render json: serialize(@project)
      else
        render json: { errors: @project.errors }, status: :unprocessable_entity
      end
    end
  
    def destroy
      @project.destroy
      head :no_content
    end
  
    private
  
    def set_project
      @project = Project.find(params[:id])
    end
  
    def project_params
      params.require(:project).permit(
        :name,
        :client,
        :start_date,
        :end_date,
        :favorite,
        :image
      )
    end
  
    # serializer simples (depois a gente melhora)
    def serialize(resource)
      if resource.respond_to?(:map)
        resource.map { |p| serialize_one(p) }
      else
        serialize_one(resource)
      end
    end
  
    def serialize_one(project)
      {
        id: project.id,
        name: project.name,
        client: project.client,
        start_date: project.start_date,
        end_date: project.end_date,
        favorite: project.favorite,
        image_url: project.image.attached? ? url_for(project.image) : nil
      }
    end
  end