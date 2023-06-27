@api
Feature: Pokemon GET /pokemon/{pokemon_name or id}
    @smoke @test
    Scenario: Fetch data for a pokemon using API and verify it
        Given Execute Pokemon GET api for Pokemon "pikachu"
        Then Verify response status code is 200
        And Verify response details for Pokemon "pikachu"
    @smoke @test @negative
    Scenario: Fetch data for an invalid pokemon using API and verify it
        Given Execute Pokemon GET api for Pokemon "justin bieber"
        Then Verify response status code is 404
    @smoke @test @negative
    Scenario Outline: Fetch data for Pokemons from table
        Given Execute Pokemon GET api for Pokemon "<pokemon>"
        Then Verify response status code is <status code>
        Examples:
            | pokemon       | status code |
            | pikachu       | 200         |
            | graphql       | 404         |
