import { render, fireEvent, waitFor } from "@testing-library/react";
import { Dropdown } from "./Dropdown.component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "app/redux/userRole/userRole.slice";
import React from "react";  // Ensure React is imported
import { UserRole } from "app/redux/userRole/UserRole.type";  // Ensure correct import for UserRole

// Mock necessary dependencies
jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("app/redux/userRole/userRole.slice", () => ({
    setUser: jest.fn(),
}));

describe("Dropdown", () => {
    let dispatchMock: jest.Mock;
    let navigateMock: jest.Mock;

    beforeEach(() => {
        dispatchMock = jest.fn(); // Create the dispatchMock function
        navigateMock = jest.fn(); // Create the navigateMock function

        // Mock the useDispatch hook
        (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);

        // Mock useNavigate to return navigateMock
        (useNavigate as unknown as jest.Mock).mockReturnValue(navigateMock);
    });

    it("should dispatch setUser and navigate when 'Wyloguj się' is clicked", async () => {
        // Arrange: Render the component when the user is logged in
        const { getByText, container } = render(<Dropdown isLoggedIn={true} />);

        // Act: Click the dropdown trigger to show the dropdown menu
        const dropdownTrigger = container.querySelector(".ant-dropdown-link"); // Use querySelector
        fireEvent.click(dropdownTrigger!); // Use non-null assertion since querySelector might return null

        // Wait for the dropdown items to appear
        const menuItem = await waitFor(() => getByText("Wyloguj się"));

        // Act: Simulate a click on the menu item
        fireEvent.click(menuItem);

        // Assert: Verify the dispatch and navigate behavior
        expect(dispatchMock).toHaveBeenCalledWith(setUser({ role: UserRole.ROLE_USER, token: "" }));
        expect(navigateMock).toHaveBeenCalledWith("/");
    });

    it("should dispatch setUser and navigate when 'Zaloguj się' is clicked", async () => {
        // Arrange: Render the component when the user is logged in
        const { getByText, container } = render(<Dropdown isLoggedIn={false} />);

        // Act: Click the dropdown trigger to show the dropdown menu
        const dropdownTrigger = container.querySelector(".ant-dropdown-link"); // Use querySelector
        fireEvent.click(dropdownTrigger!); // Use non-null assertion since querySelector might return null

        // Wait for the dropdown items to appear
        const menuItem = await waitFor(() => getByText("Zaloguj się"));

        // Act: Simulate a click on the menu item
        fireEvent.click(menuItem);

        // Assert: Verify the dispatch and navigate behavior
        expect(dispatchMock).toHaveBeenCalledWith(setUser({ role: UserRole.ROLE_USER, token: "" }));
        expect(navigateMock).toHaveBeenCalledWith("/");
    });

    it("should show 'Zaloguj się' when not logged in", async () => {
        // Arrange: Render the component when the user is not logged in
        const { getByText, container } = render(<Dropdown isLoggedIn={false} />);

        // Act: Click the dropdown trigger to show the dropdown menu
        const dropdownTrigger = container.querySelector(".ant-dropdown-link"); // Again, using querySelector
        fireEvent.click(dropdownTrigger!); // Use non-null assertion since querySelector might return null

        // Wait for the dropdown items to appear
        const menuItem = await waitFor(() => getByText("Zaloguj się"));

        // Assert: Verify the 'Zaloguj się' option is rendered
        expect(menuItem).toBeInTheDocument();
    });

    it("should show 'Wyloguj się' when logged in", async () => {
        // Arrange: Render the component when the user is not logged in
        const { getByText, container } = render(<Dropdown isLoggedIn={true} />);

        // Act: Click the dropdown trigger to show the dropdown menu
        const dropdownTrigger = container.querySelector(".ant-dropdown-link"); // Again, using querySelector
        fireEvent.click(dropdownTrigger!); // Use non-null assertion since querySelector might return null

        // Wait for the dropdown items to appear
        const menuItem = await waitFor(() => getByText("Wyloguj się"));

        // Assert: Verify the 'Wyloguj się' option is rendered
        expect(menuItem).toBeInTheDocument();
    });
});
