import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
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
        )
        
        const response = await fetch('http://localhost:4090/api/v1/account/')
        
        const responseData = await response.json()
        console.log('responseData:', responseData)
    
  })

  When('the app fetches data from the Mockoon API', async () => {

    global.fetch = 
    jest.fn().

    mockImplementation(() => 
      Promise.resolve({ 
       json: () => 
        Promise.resolve(['http://localhost:4090/api/v1/account/']) }))
    render(<FormApp />)
    
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    })
    
  })

  Then('the app displays fetched mock users', async () => {
      await waitFor(() => {
        const userElements = screen.getAllByTestId("userMock")
        expect(userElements).toBeInTheDocument
      })
    })
  
}

export default FormProjectSteps;