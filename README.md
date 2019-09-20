# Sprint Challenge: Authentication - Dad Jokes

## Description

In this challenge, you build a real wise-guy application. _Dad jokes_ are all the rage these days. Currently the application is trying to receive some `Dad Jokes`, however we are locked out.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Team Lead_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge `firstName-lastName` branch into `master` on your fork. **Please don't make Pull Requests against Lambda's repository**.
- [ ] Please don't merge your own pull request.
- [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
- [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [ ] What is the purpose of using _sessions_?
      Sessions act as a way for an application to remember who you are, and as a consequence, information about you and your actions that might be useful as you travel through an application (e.g. think checking out at an e-commerce site). Typically, because client requests to different resources are through HTTP and stateless, the server doesn’t have a way to know who you are and persist information about the client. Sessions fixes this issue, in which the server verifies the client’s credentials, creates a session for the client and then sends back a cookie for the client to store.

- [ ] What does bcrypt do to help us store passwords in a secure manner.
      Bcrypt is a module that hashes data multiple times. It does this by generating a random salt (another string) as an add on to a password, and then “hashes” that data. Bcrypt allows us to store passwords as this generated string rather than the original string.

- [ ] What does bcrypt do to slow down attackers?
      Bcrypt allows hashing of passwords multiple times so that attackers, who may be using rainbow tables to brute-force their way into converting the hashed passwords back to the original - may take a very long time.

- [ ] What are the three parts of the JSON Web Token?

  - Header - hashing algorithm used and type of token (JWT)
  - Payload - contains claims information, which are statements about the entity (usually, the user’s username/email, etc)
  - Signature - made up of hash of the header, payload, and secret. The secret is held by the server.

  All three parts are base64 encoded and put together to form the JSON Web Token.

## Minimum Viable Product

Implement an User Authentication System. Hash user's passwords before saving them to the database. Use `JSON Web Tokens` or `Sessions and Cookies` to persist authentication across requests.

- [ ] Implement the `register` and `login` functionality inside `/auth/auth-router.js`. A `user` has `username` and `password`. Both properties are required.
- [ ] Implement the `authenticate` middleware inside `/auth/authenticate-middleware.js`.
- [ ] Write a **minimum o 2 tests** per API endpoint. Write more tests if you have time.

**Note**: the database already has the users table, but if you run into issues, the migrations are available.

## Stretch Problem

Build a front end to show the jokes.

- [ ] Add a React client that connects to the API and has pages for `Sign Up`, `Sign In` and showing a list of `Jokes`.
- [ ] Once you have the functionality down, style it!
