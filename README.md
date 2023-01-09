# Writing Space

## Table of Contents

- [Purpose](#purpose)
- [Installation](#installation)
- [Improvements](#improvements)

## Purpose

This project is personal practice for my Node.js skills. It is a simple application that allows the creation of an account for the composing and editing of pieces of writing. I have found an application that helps me write the way I'd like, so I decided to take a crack at it myself.

The application is built to accomodate poetry more than prose, but that may change in the future; see the [improvements](#improvements) section for more details.


## Installation

Clone this repository:

```
git@github.com:thejohnrt/writing-space.git
```

Run `npm i` to install the following dependencies:
- bcrypt
- connect-session-sequelize
- dotenv
- express
- express-handlebars
- express-session
- mysql2
- sequelize

Ensure that you've a created a database for the project. Then, create a `.env` file in the root directory and add values for the following keys:
- DB_NAME
- DB_USER
- DB_PASSWORD
- SECRET

## Improvements

I would like to do the following in the future:
- Polish the UI
- Tweak styles (colors and typography)
- Add functionality to pull from the scratchpad more quickly (fewer keypresses or clicks)
- Perform an accessibility audit
- Add the ability to create collections of pieces
