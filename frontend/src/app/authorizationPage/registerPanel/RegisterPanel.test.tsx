import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {AuthorizationPageService} from '../AuthorizationPage.service';
import {toast} from 'react-toastify';
import React from 'react';
import {RegisterPanel} from "../registerPanel/RegisterPanel.component";
import {MemoryRouter} from "react-router-dom";

jest.mock('../AuthorizationPage.service');
jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
    ToastContainer: () => <div>Toast Container</div>,
}));

describe('RegisterPanel', () => {
    let setUserEmail: jest.Mock;
    let setUserPassword: jest.Mock;
    let onChangePanelClickHandler: jest.Mock;

    beforeEach(() => {
        setUserEmail = jest.fn();
        setUserPassword = jest.fn();
        onChangePanelClickHandler = jest.fn();
    });

    it('should render the registration form correctly', () => {
        render(
            <MemoryRouter>
                <RegisterPanel
                    userEmail=""
                    setUserEmail={setUserEmail}
                    userPassword=""
                    setUserPassword={setUserPassword}
                    onChangePanelClickHandler={onChangePanelClickHandler}
                />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText("Wpisz swój email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Wpisz swoje hasło")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Powtórz swoje hasło")).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /ZAREJESTRUJ SIĘ/i})).toBeInTheDocument();
    });

    it('should display error toast if passwords do not match', async () => {
        render(
            <MemoryRouter>
                <RegisterPanel
                    userEmail="test@example.com"
                    setUserEmail={setUserEmail}
                    userPassword="password123"
                    setUserPassword={setUserPassword}
                    onChangePanelClickHandler={onChangePanelClickHandler}
                />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Powtórz swoje hasło"), {
            target: {value: 'differentPassword'},
        });

        fireEvent.click(screen.getByRole("button", {name: /ZAREJESTRUJ SIĘ/i}));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Validation failed');
        });
    });

    it('should display success toast on successful registration', async () => {
        const mockResponse = {success: true, message: ''};
        AuthorizationPageService.registerUserRest = jest.fn().mockResolvedValue(mockResponse);

        render(
            <MemoryRouter>
                <RegisterPanel
                    userEmail="test@example.com"
                    setUserEmail={setUserEmail}
                    userPassword="password123"
                    setUserPassword={setUserPassword}
                    onChangePanelClickHandler={onChangePanelClickHandler}
                />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Powtórz swoje hasło"), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByRole("button", {name: /ZAREJESTRUJ SIĘ/i}));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Registration successful!');
        });
    });

    it('should display error toast if registration fails', async () => {
        const mockResponse = {success: false, message: 'Error occurred'};
        AuthorizationPageService.registerUserRest = jest.fn().mockResolvedValue(mockResponse);

        render(
            <MemoryRouter>
                <RegisterPanel
                    userEmail="test@example.com"
                    setUserEmail={setUserEmail}
                    userPassword="password123"
                    setUserPassword={setUserPassword}
                    onChangePanelClickHandler={onChangePanelClickHandler}
                />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Powtórz swoje hasło"), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByRole("button", {name: /ZAREJESTRUJ SIĘ/i}));

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Error occurred');
        });
    });

    it('should switch to login panel on successful registration', async () => {
        const mockResponse = {success: true, message: 'Registration successful!'};
        AuthorizationPageService.registerUserRest = jest.fn().mockResolvedValue(mockResponse);

        render(
            <MemoryRouter>
                <RegisterPanel
                    userEmail="test@example.com"
                    setUserEmail={setUserEmail}
                    userPassword="password123"
                    setUserPassword={setUserPassword}
                    onChangePanelClickHandler={onChangePanelClickHandler}
                />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("Powtórz swoje hasło"), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByRole("button", {name: /ZAREJESTRUJ SIĘ/i}));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Registration successful!');
        });

        expect(onChangePanelClickHandler).toHaveBeenCalled();
    });

    describe("API request tests", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("sends a request and receives the correct status code", async () => {
            const mockFetch = jest.fn().mockResolvedValue({
                ok: true,
                status: 201,
                json: jest.fn().mockResolvedValue({success: true}),
            });
            global.fetch = mockFetch;

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: "test@example.com", password: "password123"}),
            });

            expect(mockFetch).toHaveBeenCalledWith("/api/register", expect.any(Object));
            expect(response.status).toBe(201);
        });

        it("handles a failed request and checks the status code", async () => {
            const mockFetch = jest.fn().mockResolvedValue({
                ok: false,
                status: 400,
                json: jest.fn().mockResolvedValue({
                    success: false,
                    message: "Bad Request",
                }),
            });
            global.fetch = mockFetch;

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: "test@example.com", password: "password123"}),
            });

            expect(mockFetch).toHaveBeenCalledWith("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: "test@example.com", password: "password123"}),
            });

            expect(response.status).toBe(400);

            const jsonResponse = await response.json();
            expect(jsonResponse).toEqual({
                success: false,
                message: "Bad Request",
            });
        });
    });
});
