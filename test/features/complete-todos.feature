Feature: Users should be able to complete a todo in their todo list

  Background: User has created a todo
    Given I create a todo with text "Do a thing"

  Scenario: Users should be able to complete todos
    When I check the ".todo-list li:nth-child(1) input.toggle" checkbox
    Then ".todo-list li:nth-child(1)" should have class "completed"

  Scenario: Users should be able to un-complete todos
    When I check the ".todo-list li:nth-child(1) input.toggle" checkbox
    And I uncheck the ".todo-list li:nth-child(1) input.toggle" checkbox
    Then ".todo-list li:nth-child(1)" should not have class "completed"