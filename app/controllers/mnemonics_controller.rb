class MnemonicsController < ApplicationController
  before_action :set_mnemonic, only: [:show, :edit, :update, :destroy]
  before_filter :load_word
  # GET /mnemonics
  # GET /mnemonics.json
  def index
    @mnemonics = @word.mnemonics.all
  end

  # GET /mnemonics/1
  # GET /mnemonics/1.json
  def show
  end

  # GET /mnemonics/new
  def new
    @mnemonic = Mnemonic.new
  end

  # GET /mnemonics/1/edit
  def edit
  end

  # POST /mnemonics
  # POST /mnemonics.json
  def create
    @mnemonic = Mnemonic.new(mnemonic_params)

    respond_to do |format|
      if @mnemonic.save
        format.html { redirect_to @mnemonic, notice: 'Mnemonic was successfully created.' }
        format.json { render :show, status: :created, location: @mnemonic }
      else
        format.html { render :new }
        format.json { render json: @mnemonic.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mnemonics/1
  # PATCH/PUT /mnemonics/1.json
  def update
    respond_to do |format|
      if @mnemonic.update(mnemonic_params)
        format.html { redirect_to @mnemonic, notice: 'Mnemonic was successfully updated.' }
        format.json { render :show, status: :ok, location: @mnemonic }
      else
        format.html { render :edit }
        format.json { render json: @mnemonic.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mnemonics/1
  # DELETE /mnemonics/1.json
  def destroy
    @mnemonic.destroy
    respond_to do |format|
      format.html { redirect_to mnemonics_url, notice: 'Mnemonic was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mnemonic
      @mnemonic = Mnemonic.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def mnemonic_params
      params.require(:mnemonic).permit(:content)
    end

  def load_word
    @word = Word.find(params[:word_id])
  end
end
