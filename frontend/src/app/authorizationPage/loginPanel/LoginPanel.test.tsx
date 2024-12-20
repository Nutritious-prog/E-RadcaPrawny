import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import configureStore from "redux-mock-store";
import { LoginPanel } from "./LoginPanel.component";
import { AuthorizationPageService } from "../AuthorizationPage.service";
import { setUser } from "@/app/redux/userRole/userRole.slice";
import { UserRole } from "@/app/redux/userRole/UserRole.type";
import "@testing-library/jest-dom";
import {toast, ToastContainer} from "react-toastify";

jest.mock("../AuthorizationPage.service");
jest.mock("react-toastify", () => ({
    ToastContainer: () => <div data-testid="toast-container" />,
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

const mockStore = configureStore([]);

describe("LoginPanel integration tests", () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            userRole: { token: null, role: null },
        });

        jest.clearAllMocks();
    });

    it("Renders the main chat component after successful login", async () => {
        const mockResponse = {
            success: true,
            message: "Zalogowano pomyślnie",
            response: { role: UserRole.ROLE_USER, token: "mockToken" },
        };

        (AuthorizationPageService.createAuthenticationTokenRest as jest.Mock).mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <LoginPanel
                                    userEmail=""
                                    setUserEmail={() => {}}
                                    userPassword=""
                                    setUserPassword={() => {}}
                                    onChangePanelClickHandler={() => {}}
                                />
                            }
                        />
                        <Route path="/chat" element={<div>Chat Component</div>} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText("Wpisz swój email"), {
                target: { value: "testuser@example.com" },
            });
            fireEvent.change(screen.getByPlaceholderText("Wpisz swoje hasło"), {
                target: { value: "password123" },
            });
            fireEvent.click(screen.getByText("ZALOGUJ SIĘ"));
        });

        expect(await screen.findByText("Chat Component")).toBeInTheDocument();
    });

    it("Displays an error message for invalid credentials when email is invalid", async () => {
        const mockResponse = {
            success: false,
            message: "INVALID_CREDENTIALS",
        };

        (AuthorizationPageService.createAuthenticationTokenRest as jest.Mock).mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <ToastContainer />
                                    <LoginPanel
                                        userEmail=""
                                        setUserEmail={() => {}}
                                        userPassword=""
                                        setUserPassword={() => {}}
                                        onChangePanelClickHandler={() => {}}
                                    />
                                </>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText("Wpisz swój email"), {
                target: { value: "invalid-email" },
            });
            fireEvent.change(screen.getByPlaceholderText("Wpisz swoje hasło"), {
                target: { value: "12345678" },
            });
            fireEvent.click(screen.getByText("ZALOGUJ SIĘ"));
        });
        expect(toast.error).toHaveBeenCalledWith("INVALID_CREDENTIALS");
    });

    it("Displays an error message for invalid credentials when password is invalid", async () => {
        const mockResponse = {
            success: false,
            message: "INVALID_CREDENTIALS",
        };

        (AuthorizationPageService.createAuthenticationTokenRest as jest.Mock).mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <ToastContainer />
                                    <LoginPanel
                                        userEmail=""
                                        setUserEmail={() => {}}
                                        userPassword=""
                                        setUserPassword={() => {}}
                                        onChangePanelClickHandler={() => {}}
                                    />
                                </>
                            }
                        />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText("Wpisz swój email"), {
                target: { value: "admin@example.com" },
            });
            fireEvent.change(screen.getByPlaceholderText("Wpisz swoje hasło"), {
                target: { value: "wrongpassword" },
            });
            fireEvent.click(screen.getByText("ZALOGUJ SIĘ"));
        });

        expect(toast.error).toHaveBeenCalledWith("INVALID_CREDENTIALS");
    });

    it("Stores the authorization token in Redux after successful login", async () => {
        const mockResponse = {
            success: true,
            message: "Zalogowano pomyślnie",
            response: { role: UserRole.ROLE_USER, token: "mockToken" },
        };

        (AuthorizationPageService.createAuthenticationTokenRest as jest.Mock).mockResolvedValue(mockResponse);

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <LoginPanel
                        userEmail=""
                        setUserEmail={() => {}}
                        userPassword=""
                        setUserPassword={() => {}}
                        onChangePanelClickHandler={() => {}}
                    />
                </MemoryRouter>
            </Provider>
        );

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText("Wpisz swój email"), {
                target: { value: "admin@test.com" },
            });
            fireEvent.change(screen.getByPlaceholderText("Wpisz swoje hasło"), {
                target: { value: "12345678" },
            });
            fireEvent.click(screen.getByText("ZALOGUJ SIĘ"));
        });

        const actions = store.getActions();
        expect(actions).toContainEqual(
            setUser({ role: UserRole.ROLE_USER, token: "mockToken" })
        );
    });
});
