Feature: Users should be able to filter their todo list by completed todos

  Background: User has created and completed some todos
    Given I create a todo with text "Do a thing"
    And I create a todo with text "Do another thing"
    And I create a todo with text "Do a third thing"
    And I check the ".todo-list li:nth-child(2) input.toggle" checkbox

  Scenario: User can see only completed todos when clicking on the "completed" filter button
    When I click the ".filters li:nth-child(5) a" link
    Then I see 1 ".todo-list li" elements