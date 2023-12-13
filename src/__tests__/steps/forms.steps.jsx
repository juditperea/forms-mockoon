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


export const FormProjectSteps = ({ given: Given, when: When, then: Then }) => {

  Given("the user opens the app", async () => {
    render(<FormApp />);

      global.fetch = jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve({
            json: () =>
              Promise.resolve(['http://localhost:4090/api/v1/account/']),
          })
        );
        const response = await fetch('http://localhost:4090/api/v1/account/');
        
        const responseData = await response.json();
        console.log('responseData:', responseData);
    
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
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(['http://localhost:4090/api/v1/account/']) }));
    render(<FormApp />);
    
    // Wait for data to be fetched (adjust timeout as needed)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  Then('the app displays fetched mock users', async () => {
      await waitFor(() => {
        const userElements = screen.getAllByTestId("userMock");
        expect(userElements).toBeInTheDocument;
      });
    });
  
  
  When('the user clicks on the mocked user username', async () => {

    // Update the mock fetch implementation
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(['http://localhost:4090/api/v1/account/']) }));
        // Find a mock user element and click on it
  const mockUserElements = screen.getAllByTestId('userMock');
  const firstMockUserElement = mockUserElements[0];
  fireEvent.click(firstMockUserElement);
  
  });
   
  Then(/^the "(.*)" field should show the clicked user's (.*)$/, (field, value) => {
    const mockUserElements = screen.getAllByTestId('userMock');
    const firstMockUserElement = mockUserElements[0];

    
      // Define the expected structure
      const expectedStructure = {
        username: '',
        personal_data: {
          name: '',
          surname: '',
        },
        country: '',
        city: '',
        street: '',
        id: ''
      };
  expect(compareObjectStructure(firstMockUserElement, expectedStructure)).toBe(true);
  });
};

export default FormProjectSteps;