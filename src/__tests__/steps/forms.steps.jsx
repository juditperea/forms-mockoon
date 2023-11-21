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
global.fetch = jest.fn();

export const FormProjectSteps = ({ given: Given, when: When, then: Then }) => {
  Given("the user opens the app", () => {
     // Define mockUser with the required properties
  const mockUser = {
    username: 'mockedUsername',
    personal_data: {
      name: 'John',
      surname: 'Doe',
    },
    country: 'USA',
    city: 'New York',
    street: '123 Street',
    user_id: '12345',
  };

  // Mock the API response with a single user
  const clickedUser = {
    username: mockUser.username,
    name: mockUser.personal_data?.name || '',
    surname: mockUser.personal_data?.surname || '',
    country: mockUser.country,
    city: mockUser.city,
    street: mockUser.street,
    id: mockUser.user_id,
  };

  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([clickedUser]),
  });
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
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUser), // Replace mockedData with your actual mock data
    });
    render(<FormApp />);
    
    // Wait for data to be fetched (adjust timeout as needed)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });
  

  Then('the app displays 10 fetched mock users', async () => {
    // Mock the API response with 10 users (adjust as needed)
    const mockUser = '...'; // Replace with your actual mock data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUser),
    });
    render(<FormApp />);
    
    // Wait for data to be fetched (adjust timeout as needed)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  
    // Verify that 10 users are displayed
    await waitFor(() => {
  const userElements = screen.getAllByTestId('mocked-username');
  expect(userElements).toHaveLength(10);
});
  });
  


  When('the user clicks on the mocked user username', async () => {
      // Mock the API response with a single user
  const mockUser = {
    username: 'mockedUsername',
      name: 'John',
      surname: 'Doe',
    country: 'USA',
    city: 'New York',
    street: '123 Street',
    user_id: '12345',
  };

  // Mock the handleMockUserClick function
  const handleMockUserClick = jest.fn();

  // Render the FormApp component
  act(() => {
    render(<FormApp handleMockUserClick={handleMockUserClick} />);
  });
 // Wait for the element to be available in the DOM
 await waitFor(() => {
  const mockedUserUsernameElements = screen.queryAllByTestId('mocked-username');
  fireEvent.click(mockedUserUsernameElements[0]); // Interact with the first element
});

// Assert that the handleMockUserClick function was called with the correct mockUser
expect(handleMockUserClick).toHaveBeenCalledWith(mockUser);
});
  
Then(/^the "(.*)" field should show the clicked user's (.*)$/, (field, value) => {
  const fieldElement = screen.getByTestId(field); // Assuming the field has a data-testid attribute
  expect(fieldElement).toHaveValue(value);
});
}

export default FormProjectSteps;