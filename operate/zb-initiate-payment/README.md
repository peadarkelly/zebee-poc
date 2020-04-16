# street-manager-data

## Key components

### Migrations

Migrations for Street Manager's `work` database are defined using [Knex](https://knexjs.org/) and are stored in the `src/db-migrations/` directory.

Knex is a SQL query builder to help write SQL queries. It avoids the need to write raw sql and its syntax translates down to match a number of different database types (e.g. Postgres and MySql).

It provides code-first migrations which allows us to build our database in code and commit it to version control.

Useful `knex` commands:
* First, `cd src/db-migrations/`
* `npx knex migrate:make my_migration_name` to create a migration
* `npx knex migrate:latest --env migrations` to apply migration using the migrations environment variables
* `npx knex migrate:rollback --env migrations` to rollback migration using the migrations environment variables

### Data models

The TypeScript definitions for Street Manager's `work` database can be found in the `src/data-models/` directory.

## Release process

### Migrations

A DB Migrations Docker container will be prepared and released to the Dev AWS ECR on each commit and merge to Master.

This container can be pulled and ran be any neccessary Street Manager service.

When a tag is pushed, the container will be promoted to the PreProd and Prod AWS ECRs.

### Data models

Data models must be published, similar to the API Client repositories in order to be utilised by another Street Manager service.

After making data model changes, run `npm run build` to publish the data model changes to the `dist/` directory, commit and push this.

Use the commit hash and updated the relevant Street Manager services' `street-manager-data` reference in their respective `package.json`.
