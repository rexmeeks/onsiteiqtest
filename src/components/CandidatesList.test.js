import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {CandidatesList} from "./CandidatesList";

const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
};

/*
Was having issues trying to test that the navigate worked, and by issues I mean consulted almost every
 stackoverflow page I could find and couldn't figure it out. From what I saw though, it seems to be an issue
  with react router v6 and RTL. BUT, what I can do, that is essentially the same thing, if not better, is test
   the actual app functionality without mocking much. So I made integration tests to compensate. If I was
    working on a team though, I would have asked for help when I hit a wall.
 */

// had to define this everywhere, because using it globally messed up some of the tests
const localStorageMock = (function () {
    let store = {};

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value;
        },

        clear() {
            store = {};
        },

        removeItem(key) {
            delete store[key];
        },

        getAll() {
            return store;
        },
    };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockedUser =
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
        "id": 'testUserId',
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/14.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/14.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/14.jpg"
        },
        "nat": "US"
    };

describe('Test that user info landing page works as expected', () => {

    beforeEach(() => {
        setLocalStorage('persons', [mockedUser]);
    })

    afterEach(() => {
        jest.clearAllMocks();
        window.localStorage.removeItem('persons')
    });

    it('renders page and checks for user card', (() => {
        render(<CandidatesList />, {wrapper: BrowserRouter});
        expect(screen.getByText('Steven Steeves')).toBeInTheDocument();
    }))

    it('renders page and clicks on user', (() => {
        render(<CandidatesList />, {wrapper: BrowserRouter});
        const candidateLink = screen.getByTestId('candidate-link');
        expect(candidateLink.href).toBe('http://localhost/testUserId');
    }))
});