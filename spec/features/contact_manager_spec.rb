require 'rails_helper'

feature 'The one-page contact manager app', js: true do

  before do
    load "#{Rails.root}/db/seeds.rb"
  end

  scenario 'The homepage loads' do
    visit '/'
    expect(page).to have_title("Contact Manager")
    expect(page).to have_content("Joe Example")
    expect(page).to have_content("Edna Example")
  end

  scenario 'User can add a person and a div class dispaying person shows up' do
    visit '/'
    fill_in 'first_name', :with => 'hello'
    fill_in 'last_name', :with => 'yoyo'
    fill_in 'address', :with => '1234 street'
    click_on 'Create'
    expect(page).to have_content 'hello yoyo'
    expect(page).to have_content '1234 street'
    within 'form' do
      expect(page).to_not have_content 'hello'
    end
  end

  scenario 'User can update a person by clicking edit next to their name' do
    visit '/'
    within '.person:first-child' do
      click_on 'Edit'
    end
    within '[data-container=people]' do
      fill_in 'first_name', :with => 'hello'
      fill_in 'last_name', :with => 'yoyo'
      fill_in 'address', :with => '1234 street'
      click_on 'Update'
      expect(page).to have_content 'hello yoyo'
      expect(page).to have_content '1234 street'
      expect(page).to_not have_content 'Joe Example'
    end
  end

  scenario 'a user can cancel editing a person' do
    visit '/'
    within '.person:first-child' do
      click_on 'Edit'
    end
    click_on 'Cancel'
    expect(page).to have_content 'Joe Example'
  end

  scenario 'a user can delete a person' do
    visit '/'
    within '.person:first-child' do
      click_on 'Edit'
    end
    click_on 'Delete'
    expect(page).to_not have_content 'Joe Example'
  end

end