import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest'
import App from '../src/App'

describe('App', () => {
    it('renders the App component', () => {
        render(<App />)

        screen.debug(); // prints out the jsx in the App component unto the command line
    })

    it('shows the main menu', () => {
        render(<App />)

        const beginMatchButton = screen.getByText('Begin Match');
        expect(beginMatchButton).toBeInTheDocument();
    })
})