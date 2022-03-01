# Table of contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Testing](#testing)

# Requirements

1. MySQL should be up and running
2. Node and NPM is required

# Installation

Install and config database using the command below:

```sh
npm install
```

Edit `.env` file and set your db connection string in `DATABASE_URL` variable and then run:

```sh
npm run migrate-db
```

# Testing

Update `package.json` file and set database connection string on `DATABASE_URL` variable in `scripts.migrate-test-db` and `scripts.test` section.

Note that _`the test database should be different from the main database`_

Then run:

```sh
npm test
```
