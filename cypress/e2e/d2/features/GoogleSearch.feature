@ui
Feature: Navigate to Google.com and verify the title and match result keyword
    @smoke @test
    Scenario: Verify title of web page
        Given I open Google homepage
        Then Title of web page is 'Google'
        When I provide search query as "Pokemon"
        Then Verify first search result to match "Pokemon" keyword
