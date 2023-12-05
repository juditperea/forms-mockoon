Feature: Creating a form app for user interaction with React

  Background: 
    Given the user opens the app

  Scenario: The app fetches data from the mockoon API
    Then the app fetches data from the mockoon API

  Scenario: The app displays mock users
    Then the app displays fetched mock users

  Scenario: The mocked data is shown in correct fields
    When the user clicks on the mocked user username
    Then the "username" field should show the clicked user's "<username>"
    And the "firstname" field should show the clicked user's "<firstname>"
    And the "surname" field should show the clicked user's "<surname>"
    And the "country" field should show the clicked user's "<country>"
    And the "city" field should show the clicked user's "<city>"
    And the "street" field should show the clicked user's "<street>"
    And the "id" field should show the clicked user's "<id>"

  Scenario: Fields are empty
    Then the "username" field should be empty
    And the "firstname" field should be empty
    And the "surname" field should be empty
    And the "country" field should be empty
    And the "city" field should be empty
    And the "street" field should be empty
    And the "id" field should be empty

  @Skip
  Scenario Outline: Success message is shown
    When the user enters "<username>" on "username"
    And the user enters "<name>" on "firstname"
    And the user enters "<surname>" on "surname"
    And the user selects "<country>" from the "country" dropdown
    And the user enters "<city>" on "city"
    And the user enters "<street>" on "street"
    And the user enters "<id>" on "id"
    And the user clicks the submit button
    Then success-message should show the "text": "<text>"

    Examples: 
      | username | firstname | surname | country | city    | street        | id        | text                      |
      | JDOE     | JOHN      | DOE     | SPAIN   | SEVILLA | OXFORD ST.,14 | 49220078D | User created successfully |

  Scenario Outline: Success message is not shown
    When the user enters "<username>" on "username"
    And the user enters "<name>" on "firstname"
    And the user enters "<surname>" on "surname"
    And the user selects "<country>" from the "country" dropdown
    And the user enters "<city>" on "city"
    And the user enters "<street>" on "street"
    And the user enters "<id>" on "id"
    And the user clicks the submit button
    Then success-message should show the "text": "<text>"

    Examples: 
      | username | firstname | surname | country | city    | street        | id    | text |
      | JDOE     | JOHN      | DOE     | SPAIN   | SEVILLA | OXFORD ST.,14 | 12345 |      |

  Scenario: User clears the form
    When the user clicks the clear button
    Then all the form fields should be cleared
    And the dropdown should have the "" value

  Scenario: Username longer than 10 characters
    When the user enters "JOHN123456" on "username"
    Then the user should not be able to enter more characters in the "username" field.

  Scenario: Username includes the Name field error
    When the user enters "JOHN123" on "username"
    And the user enters "JOHN" on "firstname"
    And the user enters "DOE" on "surname"
    Then message-error should show the text: "The name can't be included in the username"

  Scenario Outline: ID validation
    When the user enters "<country>" on "country"
    And the user enters "<id>" on "id"
    Then the "<id>" should show no message error

    Examples: 
      | country   | id        |
      | SPAIN     | 49220078D |
      | ARGENTINA |  12345678 |
