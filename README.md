# To-Do: Test Driven Development and Accessibility

## Purpose and Scope

This repository is the base for a workshop done for the [Geek Girls Conference 2026](https://conference.geekgirlsportugal.pt/) in April 2026, at Porto Business School.

Here is the summary for the workshop:

> When we talk about frontend development and particularly testing web interfaces, the question of "when should we test for accessibility (a11y) in your apps" often arises.
My answer to that is quite simple - we should do it right from the start!
How? By adopting Test Driven Development (TDD) and integrating your favorite testing framework with some a11y power-ups.
This workshop guides us through the creation of a "simple" ToDo app and the challenges faced during its development.

## Setup

The [frontend](/frontend/) is developed using React (and typescript) and bundled [Vite](https://vite.dev/). [The tests](/e2e/) have been created using [Playwright](https://playwright.dev/). The code is lint using [Biome](https://biomejs.dev/).

The IDE used in the development was [VS Code](https://code.visualstudio.com/) and its [settings](./vscode/) are available in the repository.

### Cloning the repository

In order to follow the workshop, it is recommended to clone this repository and use the `clean_slate` branch created from its first commit.

```bash
git clone https://github.com/ritamcastro/todo-tdd-and-a11y-geek-girls.git
git checkout -b clean_slate
```

### Running the project

1. Run the frontend on your local machine

```bash
cd frontend 
npm i
npm run dev
```

This should prompt you to open the [browser](http://localhost:5173/) with the To-Do application.

1. Run the tests on your local machine

```bash
cd tests 
npm i
npm run test
```

____
©️ ritamcastro 2026 💜
