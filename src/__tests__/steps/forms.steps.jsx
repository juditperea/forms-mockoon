import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import FormApp from "../../components/FormApp";
global.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({}) }));
let fetchedUsers; 
export const FormProjectSteps = ({ given: Given, when: When, then: Then }) => {
  Given("the user opens the app", async () => {

    render(<FormApp />)
   
  //    Fetch the actual data from your app
  // const response = await fetch('http://localhost:4090/api/v1/account/');
  
  // const actualData = await response.json();

  // // Ensure that the response is an array and has at least 10 elements
  // expect(Array.isArray(actualData)).toBe(true);
  // expect(actualData.length).toBeGreaterThanOrEqual(10);

  // // Use the actual data fetched from the app
  // fetchedUsers = actualData;
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

  Then(/^success-message should show the "text": "(.*)"$/, async (arg1) => {
    await waitFor(() => {
      const actualText = screen.getByTestId("success-message").textContent.trim();
      expect(actualText).toBe(arg1);
    });
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

  Then('the app fetches data from the Mockoon API', async () => {
    // Mock the API response for testing purposes
    global.fetch = jest.fn().mockImplementation({
      json: jest.fn().mockInstance(() => Promise.resolve({ json: () => Promise.resolve({}) }))
    });
    render(<FormApp />);
    
    // Wait for data to be fetched (adjust timeout as needed)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  

  Then('the app displays 10 fetched mock users', async () => {
    console.log("**************************");
  // 
    await waitFor(() => {
      const userElements = screen.getAllByTestId("userElement");
      expect(userElements.length).toBe(10);
  
    })
    // Verify that the form fields match the expected mock user's data
    // fetchedUsers.forEach((expectedUser, index) => {
    //   const userElement = screen.getAllByRole('listitem')[index];
    //   const usernameElement = within(userElement).getByTestId('mocked-username');
    //   expect(usernameElement).toHaveTextContent(expectedUser.username);
    // });
  });
  


  When('the user clicks on the mocked user username', async () => {
    // Mock handle click 
    const handleUserClick = jest.fn();

    // Wait for elements
    await waitFor(() => {
      const userElements = screen.queryAllByTestId('mocked-username');
      userElements.forEach((element) => {
        fireEvent.click(element);
        expect(handleUserClick).toHaveBeenCalledWith(element.textContent);
      });
    });
  });

Then(/^the "(.*)" field should show the clicked user's (.*)$/, (field, value) => {
  const fieldElement = screen.getByTestId(field);
  const clickedUser = fetchedUsers[0]; 
  const expectedValue = value.includes('personal_data.')
    ? clickedUser[value.replace('personal_data.', '')]
    : clickedUser[value];
  expect(fieldElement).toHaveValue(expectedValue);
});
}

export default FormProjectSteps;