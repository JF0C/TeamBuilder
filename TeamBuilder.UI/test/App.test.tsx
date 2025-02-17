import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest'
import { Provider } from 'react-redux';
import App from '../src/App'
import { setupStore } from '../src/store/store';
import { MainMenu } from '../src/components/home/MainMenu';
import { initialTestState } from './store/initialTestState';
import { initialAuthState } from '../src/store/authReducer';
import { Roles } from '../src/constants/Roles';
import { BrowserRouter } from 'react-router-dom';

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

    it('shows the admin button if logged in as admin', () => {
        const store = setupStore({
            ...initialTestState,
            auth: {
                ...initialAuthState,
                user: {
                    accessToken: 'token',
                    scope: '',
                    email: 'test@email.com',
                    playerId: '1',
                    playerName: 'name',
                    roles: [Roles.Admin]
                }
            }
        })
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <MainMenu />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.getByText('Admin')).toBeInTheDocument()
    })

    it('does not how the Admin button if no user is logged in', () => {
        render(
            <BrowserRouter>
                <Provider store={setupStore(initialTestState)}>
                    <MainMenu />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByText('Admin')).toBeFalsy()
    })
})