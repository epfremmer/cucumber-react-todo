Feature: Users should be able to add a new todo to their todo list

  Scenario: Users should be able to create todos by filling out the todo form
    When I fill out the "input.new-todo" field with "Do a thing"
    And I press enter
    And I select the ".todo-list li:nth-child(1)" element
    Then I should see text equal to "Do a thing"
    And the "input.new-todo" input should be empty

  Scenario: Users should be able to create multiple todos at once
    When I fill out the "input.new-todo" field with "Do a thing"
    And I press enter
    Then I fill out the "input.new-todo" field with "Do another thing"
    And I press enter
    Then I select the ".todo-list li:nth-child(1)" element
    And I should see text equal to "Do a thing"
    And I select the ".todo-list li:nth-child(2)" element
    And I should see text equal to "Do another thing"
