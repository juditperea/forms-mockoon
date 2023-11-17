import React from 'react'
import { render, screen } from '@testing-library/react'
import { HelloWorld } from '../../components/HelloWorld.jsx'
export const helloWorldSteps = ({
given: Given,
and: And,
when: When,
then: Then
}) => {
Given(/^Hello World$/, () => {
render(<HelloWorld />)
})
Then(/^I should see "([^"]*)"$/, (text) => {
const helloWorld = screen.getByTestId('helloWorldSteps')
expect(helloWorld.textContent).toBe("Hello World!")
})
}
export default helloWorldSteps
