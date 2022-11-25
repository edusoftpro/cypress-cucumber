Feature: Navigate to Google.com and verify the title
    @smoke @test
    Scenario: Verify title of web page
        Given I open Google homepage
        Then Title of web page is 'Google'