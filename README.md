# :department_store: TimeShop

[LIVE DEMO](https://chappuis-halder.github.io/timeshop/app/shop)

## :computer: System Requirements

- [NodeJS version 12+](https://nodejs.org/)

### :wrench: Installing requirements

```
cd /path/to/project/directory
npm install -g @ionic/cli@5.4.16
npm install
```

## :electric_plug: Running the application

```
cd /path/to/project/directory
ionic serve
```

This will open the application on [http://localhost:8100/](http://localhost:8100/)

## :bookmark_tabs: Code Style

This project uses [Perttier](https://prettier.io/) to automatically format all documents.

Run prettier either by installing the Prettier plugin for your IDE or execute the following command:

```
cd /path/to/project/directory
npm run prettier
```

## :fire: Publishing to GitHub Pages

- Install angular-cli-ghpages globally

```
npm install -g angular-cli-ghpages
```

- Build the application using the repository name as `base-href` option.
- `base-href` option should be in the format `/repo-name/`
- The `--repo` parameter should refer to the `HTTPS` url of the git repository
- Example of build

```
cd /path/to/project/directory
ng build --prod --base-href /timeshop/
ngh --message="Release v. 1.0.0" --repo=https://github.com/Chappuis-Halder/timeshop.git
```

- This will push the current build to the branch named `gh-pages`
