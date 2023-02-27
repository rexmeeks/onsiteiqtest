import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import axios from "axios";
import {UserInfo} from "../UserInfo";


/*
Was having issues trying to test that the navigate worked, and by issues I mean consulted almost every
 stackoverflow page I could find and couldn't figure it out. From what I saw though, it seems to be an issue
  with react router v6 and RTL. BUT, what I can do, that is essentially the same thing, if not better, is test
   the actual app functionality without mocking much. So I made integration tests to compensate. If I was
    working on a team though, I would have asked for help when I hit a wall.
 */

jest.mock('axios');

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

const mockedAxiosResponse =
    {
    "results": [
        {
            "gender": "female",
            "name": {
                "title": "Mrs",
                "first": "Eleanor",
                "last": "Williamson"
            },
            "location": {
                "street": {
                    "number": 1974,
                    "name": "Ormond Quay"
                },
                "city": "Donabate",
                "state": "Longford",
                "country": "Ireland",
                "postcode": 50323,
                "coordinates": {
                    "latitude": "-1.0838",
                    "longitude": "71.4687"
                },
                "timezone": {
                    "offset": "+4:00",
                    "description": "Abu Dhabi, Muscat, Baku, Tbilisi"
                }
            },
            "email": "eleanor.williamson@example.com",
            "login": {
                "uuid": "4f8a3948-7664-40c2-90b5-057e464dffb6",
                "username": "goldenbird384",
                "password": "puffer",
                "salt": "yztbVl2d",
                "md5": "0e245a2edc44f878a34a606d566096cd",
                "sha1": "fc9461051cbdd57c22b95c653401f7d235484f83",
                "sha256": "27ca051118ae4e86f1a7c12dd00abfa771d565646c3fedcdbb96b5b0fda436c2"
            },
            "dob": {
                "date": "1972-12-04T00:56:18.500Z",
                "age": 50
            },
            "registered": {
                "date": "2020-07-22T05:36:02.229Z",
                "age": 2
            },
            "phone": "041-289-9747",
            "cell": "081-671-7081",
            "id": 'testUserId',
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/28.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/28.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/28.jpg"
            },
            "nat": "IE"
        }
    ],
    "info": {
        "seed": "62f16807fb42933d",
        "results": 1,
        "page": 1,
        "version": "1.4"
    }
}

describe('Test optional comments modal', () => {

    beforeEach(() => {
        axios.get.mockImplementationOnce(() => Promise.resolve({data: mockedUser}))
        axios.get.mockImplementationOnce(() => Promise.resolve({data: mockedAxiosResponse}))
    })

    it('renders modal and inputs text', (() => {
        // rendering the modal alone was causing for some weird behavior, and besides this is more the real flow
        render(<UserInfo />, {wrapper: BrowserRouter});
        const acceptButton = screen.getByRole('button', {name: /Accept/i});
        fireEvent.click(acceptButton);
        const textField = screen.getByPlaceholderText('Enter any comments about the candidate (optional)');
        fireEvent.change(textField, {target: {value: 'test comment'}});
        expect(textField.value).toBe('test comment');
        const submitButton = screen.getByRole('button', {name: /Submit/i});
        fireEvent.click(submitButton);
        expect(screen.getByText('Name:')).toBeInTheDocument();
    }))

});