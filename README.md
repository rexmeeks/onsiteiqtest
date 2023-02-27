# Getting Started with (Insert buzzword filled catchy title that is not <i>Create React App</i> and really gets the people going)

<h5>Going through the app:</h5>
1. run it (reference below)
2. you will be presented with some person
3. judge them based off their general information (psh. rude)
4. accept them to work for us or send them to debtors prison (or, Canada, idk, that's not our department)
5. realize you're an awful person for some of the previous decisions you made (in the app)
   * accept that that's life
   * click previous candidates
   * find the poor soul you previously passed judgement upon, notice the color of their card reflects your decision and you can read
   the comments you made in case you forgot them already
   * click on them, this will take you back to the judgement page where you may decide to change your mind, or reject the candidate twice
     * <small>this will just overwrite your previous decision so while we respect your strive to be as evil as possible, we'll only ever note it down once</small>
6. do this forever until we go bankrupt or you fall into a pit and can't get out

<h5>Going through the app <sup><small>seriously</small></sup></h5>
1. npm start</br>
2. it'll open a page, if it doesn't navigate to localhost as said below</br>
3. You'll be presented with a candidate where you can either accept or reject them, or view previous candidates recently processed</br>
   1. accept => enter some additional comments, submit or close</br>
   2. reject => same as accept</br>
   3. view previous candidates => goes to page where you can view previously decided upon candidates in a card colored to
   reflect the decision that was made as well as showing comments that were made.</br>
      1. if you press the back button from this page either on the page or in the browser, it'll persist the user that you were on</br>

## Notes
* Used MUI because it's really nice with responsive design and it's one of the libraries I'm more familiar with and it makes
the page look nice quickly

* During testing I was having issues trying to test that the navigate worked, and by issues I mean consulted almost every
stackoverflow page I could find and couldn't figure it out. From what I saw though, it seems to be an issue
with react router v6 and RTL. BUT, what I can do, that is essentially the same thing, if not better, is test
the actual app functionality without mocking much. So I made integration tests to compensate. If I was
working on a team though, I would have asked for help when I hit a wall.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.