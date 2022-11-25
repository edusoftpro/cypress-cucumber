@api
Feature: Pokemon GET /pokemon/{pokemon_name or id}
    @smoke @test
    Scenario: Fetch data for a pokemon using API and verify it
        Given Execute Pokemon GET api for Pokemon "pikachu"
        Then Verify response status code is 200
        And Verify response details for Pokemon "pikachu"