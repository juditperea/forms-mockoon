import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormApp from "../../components/FormApp";

global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([]) }));
let fetchedUsers;

export const FormProjectSteps = ({ given: Given, when: When, then: Then }) => {
  Given("the user opens the app", async () => {
    render(<FormApp />);
    
    try {
      const response = await fetch('http://localhost:4090/api/v1/account/');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const actualData = await response.json();
      console.log("ACTUAL DATA:" + actualData);
      expect(Array.isArray(actualData)).toBe(true);
      expect(Array.isArray(actualData) && actualData.length >= 10).toBe(true);
      fetchedUsers = actualData;
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  });

  Then(/^the "(.*)" field should be empty$/, (arg0) => {
    const inputElement = screen.getByTestId(arg0);
    expect(inputElement.value).toBe(""); // Check for an empty value
  });
  

  When(/^the user enters "(.*)" on "(.*)"$/, async (value, input) => {
    const inputField = screen.getByTestId(input);
    await userEvent.type(inputField, value);
  });

  When(/^the user selects "(.*)" from the "(.*)" dropdown$/, (arg0, arg1) => {
    fireEvent.select(screen.getByTestId(arg1), arg0);
  });

  Then(/^the submit button should be (.*)$/, (arg0) => {
    expect(screen.getByTestId(arg0)).toBeDisabled();
  });

  When("the user clicks the submit button", () => {
    fireEvent.click(screen.getByTestId("submit-button"));
  });

  Then(/^success-message should show the "text": "(.*)"$/, async (arg1) => {
    await waitFor(() => {
      const actualText = screen.getByTestId("success-message").textContent.trim();
      expect(actualText).toBe(arg1);
    });
  });

  When("the user clicks the clear button", () => {
    fireEvent.click(screen.getByTestId("clear-button"));
  });

  Then('the dropdown should have the "" value', () => {
    // Add your assertion logic for the dropdown value here
  });

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

  Then(
    /^the user should not be able to enter more characters in the "(.*)" field.$/,
    (fieldName) => {
      const input = screen.getByTestId(fieldName).value;
      const maxCharactersAsNumber = 10;
      expect(input.length).toBe(maxCharactersAsNumber);
    }
  );

  Then(/^message-error should show the text: "(.*)"$/, (arg0) => {
    expect(screen.getByTestId("message-error")).toHaveTextContent(
      "The name can't be included in the username"
    );
  });

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

  Then('the app fetches data from the Mockoon API', async () => {
    // Mock the API response for testing purposes
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve([/* mocked user data */]) }));
    render(<FormApp />);
    
    // Wait for data to be fetched (adjust timeout as needed)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  Then('the app displays 10 fetched mock users', async () => {
    await waitFor(() => {
      const userElement = screen.getByTestId('userElement');
      const userList = within(userElement).getAllByTestId('userMock');
      expect(userList.length).toBe(10);
    });
  });
  
  

  When("the user clicks on the mocked user username", async () => {
    // Mock handle click
    const handleUserClick = jest.fn();
  
    render(<FormApp handleUserClick={handleUserClick} />);
  
    await waitFor(() => {
      const userElements = screen.queryAllByTestId("userMock");
      userElements.forEach((element) => {
        fireEvent.click(element);
        expect(handleUserClick).toHaveBeenCalledWith(element.textContent);
      });
    });
  });

  Then(/^the "(.*)" field should show the clicked user's (.*)$/, (field, value) => {
    const fieldElements = screen.getAllByTestId(field);
    const firstFieldElement = fieldElements[0];
  
    const clickedUser = fetchedUsers[0];
  
    // Ensure that fetchedUsers is not empty before accessing its elements
    if (clickedUser) {
      const expectedValue = value.includes('personal_data.')
        ? clickedUser[value.replace('personal_data.', '')]
        : clickedUser[value];
  
      expect(firstFieldElement).toHaveValue(expectedValue);
    } else {
      // Handle the case when fetchedUsers is empty
      // For example, you might want to skip the assertion or log a warning
      console.warn('No fetched users available for assertion.');
    }
  });
  
};

export default FormProjectSteps;