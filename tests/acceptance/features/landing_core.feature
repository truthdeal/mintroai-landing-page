@smoke
Feature: Landing page – core behaviour

  Background:
    Given I am an anonymous visitor
    And the application is running

  Scenario: Hero headline is visible
    When I navigate to "/"
    Then I should see the heading "Create Smart Contracts with Artificial Intelligence"

  Scenario: Navigation links work correctly
    When I navigate to "/"
    And I click the navigation link "Features"
    Then I should see the section "features"
    When I click the navigation link "How It Works"
    Then I should see the section "how-it-works"
    When I click the navigation link "Testimonials"
    Then I should see the section "testimonials"
    When I click the navigation link "FAQ"
    Then I should see the section "FAQ"

  Scenario: FAQ accordion works correctly
    When I navigate to "/"
    And I scroll to the FAQ section
    And I click the FAQ question "What is MintroAI?"
    Then I should see the FAQ answer containing "AI-powered platform"
    When I click the FAQ question "What is MintroAI?" again
    Then the FAQ answer should be hidden
