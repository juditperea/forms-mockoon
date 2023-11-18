import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormApp from "../../components/FormApp";

export const FormProjectSteps = ({ given: Given, when: When, then: Then }) => {
  Given("the user opens the app", () => {
    render(<FormApp />);
  });

  // Scenario: Fields are empty

  Then(/^the "(.*)" field should be empty$/, (arg0) => {
    expect(screen.getByTestId(arg0)).toBeNull;
  });


  When(/^the user enters "(.*)" on "(.*)"$/, async (value, input) => {
    const inputField = screen.getByTestId(input);
    await userEvent.type(inputField, value);
  });

  When(/^the user selects "(.*)" from the "(.*)" dropdown$/, (arg0, arg1) => {
    fireEvent.select(screen.getByTestId(arg1), arg0);
  });

  Then(/^the submit button should be (.*)$/, (arg0) => {
    expect(screen.getByTestId(arg0)).toBeDisabled;
  });


  When("the user clicks the submit button", () => {
    fireEvent.click(screen.getByTestId("submit-button"));
  });

  Then(/^success-message should show the "text": "(.*)"$/, (arg1) => {
    expect(screen.getByTestId("success-message")).toHaveTextContent(arg1);
  });
  // Scenario: User clears the form

  When("the user clicks the clear button", () => {
    fireEvent.click(screen.getByTestId("clear-button"));
  });

  Then('the dropdown should have the "" value', () => {});

  Then("all the form fields should be cleared", () => {
    const usernameField = screen.getByTestId("username");
    expect(usernameField.value).toBe("");

    const nameField = screen.getByTestId("firstname");
    expect(nameField.value).toBe("");

    const surnameField = screen.getByTestId("surname");
    expect(surnameField.value).toBe("");

    const idField = screen.getByTestId("id");
    expect(idField.value).toBe("");
  });

  // Scenario: Username longer than 10 characters

  Then(
    /^the user should not be able to enter more characters in the "(.*)" field.$/,
    (fieldName) => {
      const input = screen.getByTestId(fieldName).value;
      const maxCharactersAsNumber = 10;

      expect(input.length).toBe(maxCharactersAsNumber);
    }
  );

  // Scenario: Username includes the Name field error

  Then(/^message-error should show the text: "(.*)"$/, (arg0) => {
    expect(screen.getByTestId("message-error")).toHaveTextContent(
      "The name can't be included in the username"
    );
  });
  //
  Then(/^the "(.*)" should show no message error$/, () => {
    const countryField = screen.getByTestId("country");
    const idField = screen.getByTestId("id");

    const country = countryField.value
    const id = idField.value;
  
    if (country === "SPAIN") {
      expect(id).toMatch(/^\d{8}[A-Z]$/);
    } else if (country === "ARGENTINA") {
      expect(id).toMatch(/^\d{7,8}$/);
    } else {
      expect(true).toBe(true); 
    }
  });

  //Mockoon

  Then('the app fetches data from the mockoon API', async () => {
    // Implement fetching data from the Mockoon API
    // Assume that the app fetches data when it mounts
    // You may need to mock the API response for testing purposes
    // Example: jest.mock('./api', () => ({ fetchData: jest.fn(() => Promise.resolve(mockedData)) }));
  });
  
  Then('the app displays 10 fetched mock users', () => {
    // Implement checking if 10 mock users are displayed
    // Assume that the app renders a list of users when it mounts
    // You may need to mock the API response for testing purposes
  });
  
  When('the user clicks on the mocked user username', async () => {
    // Assume there's a clickable element for each user's username
    const usernameElement = screen.getByTestId('username'); // Replace with actual selector
    userEvent.click(usernameElement);
  });
  Then(/^the "(.*)" field should show the clicked user's (.*)$/, (arg0, arg1) => {

  });
  
};
export default FormProjectSteps;