Feature: Users should be able to clear completed todos from their todo list

  Background: User has created and completed a todo
    Given I create a todo with text "Do a thing"
    And I create a todo with text "Do another thing"
    And I check the ".todo-list li:nth-child(1) input.toggle" checkbox

  Scenario: Users with completed todos see a Clear Todos button
    Then the "button.clear-completed" element is present
    And I see 2 ".todo-list li" elements

  Scenario: Users with completed todos should see a reduced remaining todos count
    When I select the "footer .todo-count" element
    Then I should see text equal to "1 item left"

  Scenario: Users should be able to clear all completed todos
    Given the "button.clear-completed" element is present
    When I click the "button.clear-completed" element
    Then the ".todo-list li.completed" element is not present
    And I see 1 ".todo-list li" element