import axios from "axios";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

jest.mock('axios');

/*
Was having issues trying to test that the navigate worked, and by issues I mean consulted almost every
 stackoverflow page I could find and couldn't figure it out. From what I saw though, it seems to be an issue
  with react router v6 and RTL. BUT, what I can do, that is essentially the same thing, if not better, is test
   the actual app functionality without mocking much. So I made integration tests to compensate. If I was
    working on a team though, I would have asked for help when I hit a wall.
 */

// I'm not the best at FE tests, and couldn't figure out how to add this json to the Jest global values, so I just
// copied this over, it's awful, I know
const mockedUser =
    {
    "results": [
        {
            "gender": "male",
            "name": {
                "title": "Mr",
                "first": "Steven",
                "last": "Steeves "
            },
            "location": {
                "street": {
                    "number": 2763,
                    "name": "Wheeler Ridge Dr"
                },
                "city": "Worcester",
                "state": "West Virginia",
                "country": "United States",
                "postcode": 54589,
                "coordinates": {
                    "latitude": "85.8975",
                    "longitude": "-64.6374"
                },
                "timezone": {
                    "offset": "+6:00",
                    "description": "Almaty, Dhaka, Colombo"
                }
            },
            "email": "steven.steeves@example.com",
            "login": {
                "uuid": "edc4fff7-7853-414c-9d3f-eba26f1df06d",
                "username": "bluewolf916",
                "password": "summer99",
                "salt": "BFwmhqXM",
                "md5": "fd6873f664ac4df8927eeff31f37632b",
                "sha1": "8a8f17c434ab9ff7221a8e4fde9b46508f945843",
                "sha256": "0f0eeef76607d290687962def3093369e60e9a50af36aed6639229784127e5dc"
            },
            "dob": {
                "date": "1984-05-28T22:13:58.705Z",
                "age": 38
            },
            "registered": {
                "date": "2015-02-08T10:18:02.059Z",
                "age": 8
            },
            "phone": "(590) 890-3852",
            "cell": "(802) 313-4617",
            "id": 'testUserId2',
            "picture": {
                "large": "https://randomuser.me/api/portraits/men/14.jpg",
                "medium": "https://randomuser.me/api/portraits/med/men/14.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/men/14.jpg"
            },
            "nat": "US"
        }
    ],
    "info": {
        "seed": "075c4b6c86811bac",
        "results": 1,
        "page": 1,
        "version": "1.4"
    }
}

describe('Test full flows of the application', () => {
    beforeEach(() => {
        axios.get.mockImplementation(() => Promise.resolve({data: mockedUser}))
    })

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("tests navigating to previous candidates", async() => {
        render(<App />, {wrapper: BrowserRouter});
        const candidatesButton = screen.getByRole('button', {name: /Candidates/i});
        fireEvent.click(candidatesButton);
        const backButton = screen.getByRole('button', {name: /Back/i});
        await waitFor(() => {
            expect(backButton).toBeInTheDocument();
        })
        fireEvent.click(backButton);
    })

    it("tests clicking accept on a comment, types in an optional comment and submits", async() => {
        render(<App />, {wrapper: BrowserRouter});
        await waitFor(() => {
            expect(screen.getByText('Mr Steven Steeves')).toBeInTheDocument();
        });
        const acceptButton = screen.getByRole('button', {name: /View Previous Candidates/i});
        fireEvent.click(acceptButton);
        let backButton;
        await waitFor(() => {
            backButton = screen.getByRole('button', {name: /Back/i});
        })
        fireEvent.click(backButton);
        await waitFor(() => {
            expect(screen.getByText('Mr Steven Steeves')).toBeInTheDocument();
        });
    })
});