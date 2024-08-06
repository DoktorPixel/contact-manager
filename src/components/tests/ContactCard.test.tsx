import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactCard from "../common/ContactCard";
import { useDeleteContact } from "@/hooks/useContacts";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

jest.mock("@/hooks/useContacts", () => ({
  useDeleteContact: jest.fn(),
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...(actual || {}),
    useNavigate: jest.fn(),
  };
});

const mockedUseNavigate = jest.mocked(require("react-router-dom").useNavigate);

describe("ContactCard", () => {
  const mockContact = {
    id: "1",
    avatar_url: "https://example.com/avatar.jpg",
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    tags: [{ id: "1", tag: "friend" }],
  };

  const deleteContact = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDeleteContact as jest.Mock).mockReturnValue({ mutate: deleteContact });
  });

  test("renders contact information correctly", () => {
    render(
      <MemoryRouter>
        <ContactCard contact={mockContact} />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("friend")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );
  });

  test("navigates to contact details page on click", () => {
    render(
      <MemoryRouter>
        <ContactCard contact={mockContact} />
      </MemoryRouter>
    );

    const contactCard = screen.getByText("John Doe");
    fireEvent.click(contactCard);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/contact/1");
  });

  test("opens confirmation dialog on delete button click", () => {
    render(
      <MemoryRouter>
        <ContactCard contact={mockContact} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText(/delete contact\?/i)).toBeInTheDocument();
  });

  test("calls deleteContact function on confirm delete", () => {
    render(
      <MemoryRouter>
        <ContactCard contact={mockContact} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(deleteContact).toHaveBeenCalledWith("1");
  });
});
