Feature: Users should be able to filter their todo list by all todos

  Background: User has created and completed some todos
    Given I create a todo with text "Do a thing"
    And I create a todo with text "Do another thing"
    And I create a todo with text "Do a third thing"
    And I check the ".todo-list li:nth-child(2) input.toggle" checkbox

  Scenario: User can see all todos when clicking on the "all" filter button
    When I click the ".filters li:nth-child(1) a" link
    Then I see 3 ".todo-list li" elements