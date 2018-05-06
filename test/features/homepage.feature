Feature: Application landing page loads and displays the correct content

  Scenario: Users should see the "todos" header
    When I select the ".todoapp .header h1" element
    Then I should see text equal to "todos"

  Scenario: Users should see the todo input field
    When I select the ".todoapp input.new-todo" element
    Then I should see placeholder text equal to "What needs to be done?"
    And the ".todoapp input.new-todo" input should be empty

  Scenario: Users should see the application footer info
    When I select the "footer.info p:nth-child(1)" element
    Then I should see text equal to "Double-click to edit a todo"
    When I select the "footer.info p:nth-child(2)" element
    Then I should see text equal to "Created by Remo H. Jansen"
    When I select the "footer.info p:nth-child(3)" element
    Then I should see text equal to "Part of TodoMVC"