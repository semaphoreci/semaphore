# Contributing

We love your input! We want to make contributing to Semaphore documentation as easy and transparent as possible.

This guide outlines the process for making changes to the documentation, whether you are an internal or external contributor.


## Table of Content

<!-- toc -->

- [Contributing](#contributing)
  - [Table of Content](#table-of-content)
  - [Ways to Contribute](#ways-to-contribute)
    - [Provide Feedback](#provide-feedback)
    - [Update Documentation Content](#update-documentation-content)
  - [Prerequisites](#prerequisites)
  - [Step 1: Set Up Your Local Environment](#step-1-set-up-your-local-environment)
  - [Step 2: Set Up Your Working Branch](#step-2-set-up-your-working-branch)
  - [Step 3: Test Your Changes Locally](#step-3-test-your-changes-locally)
    - [Run Linter](#run-linter)
    - [Review Changes in Browser](#review-changes-in-browser)
  - [Step 4: Create a Pull Request](#step-4-create-a-pull-request)
    - [Pull Request Etiquette](#pull-request-etiquette)
    - [Internal Contributors](#internal-contributors)
    - [External Contributors](#external-contributors)
  - [Next Steps](#next-steps)

<!-- tocstop -->

## Ways to Contribute

### Provide Feedback

We consider any feedback a valuable contribution. Before opening a new [issue](https://github.com/semaphoreci/semaphore/issues) or [discussion](https://github.com/semaphoreci/semaphore/discussions), please check and review the existing ones to avoid duplication.

If you want to contribute by providing feedback, you can:

1. Propose new topic, report an inaccuracy, lack of clarity, or missing information: [new issue template](https://github.com/semaphoreci/semaphore/issues/new?assignees=TomFern%2CAleksandarCole&labels=documentation&projects=semaphoreci%2F2&template=DOCS_ISSUE.yml&title=%5BDocs%5D%3A+)
2. Discuss the current state of the content or ask for clarification on any topic: [new discussion](https://github.com/semaphoreci/semaphore/discussions/new/choose)

### Update Documentation Content

If you are interested in updating the documentation content, here are a few paths to consider:

1. Read through the rest of this guide to learn how to contribute through PRs.
2. Pick the right topic:
   1. Browse our list of [help wanted](https://github.com/orgs/semaphoreci/projects/2/views/7) issues and pick one.
   2. Already have an improvement in mind? Feel free to move to the next step.
3. Create your first pull request by following this guide.

## Prerequisites

Before you begin, ensure that your environment meets the following prerequisites:

- You have a code editor, a GitHub account, and experience using command-line programs, including `git` commands.
- You have Node.js, version 18.x or newer, installed. 
   Run `node --version` to check if Node is installed.
   If you need to install or update Node, see 
   [Installing Node.js](https://nodejs.org/en/download/package-manager) 
   for instructions on how to download and install Node.js using a package manager.

## Step 1: Set Up Your Local Environment

To set up a local environment for contributing to Semaphore documentation:

1. Open a terminal shell on your computer.

2. Clone the [semaphoreci/semaphore](https://github.com/semaphoreci/semaphore) repository by running the following command:
  
   ```bash
   git clone https://github.com/semaphoreci/semaphore 
   ```

3. Navigate to the `docs` directory:
   
   ```bash
   cd docs
   ```

4. Update the documentation to the latest version from the `main` branch:

   ```bash
   git pull
   ```

5. Install dependencies:
   
   ```bash
   npm install
   ```

## Step 2: Set Up Your Working Branch

Create and switch to a new branch using the `git checkout -b` command:

```bash
git checkout -b <new_branch_name>
```

Follow this naming convention for your branch: `{group-token}/{issue number}/{concise-description}`

1. Use lowercase characters and `/` and `-` as separators for better readability.

   Example: `fix/592/jobs-page-link-fix`

2. Use group tokens at the beginning of the branch name to define the type of update. The tokens we use are:

   ```text
   fix       A change that fixes formatting, rendering issues, broken links, etc.
   lang      A change that improves language and readability without adding new content.
   update    Extending the content of existing pages or updating existing information.
   new       Adding new documentation pages or sections.
   dev       Updating the docs engine, CI/CD pipelines, or configuration.
   ```

3. Add a GitHub issue number. Use `no-ref` if there's no issue or `multi` if the change affects multiple issues.

   Examples: `new/521/pipelines-page`, `fix/no-ref/missing-screenshot`, `lang/multi/readability-update`

4. Use a descriptive and concise name that reflects the work done on the branch. Avoid long branch names.

## Step 3: Test Your Changes Locally

When making changes, ensure you follow the [Style Guide](./STYLE_GUIDE.md) and [UI Reference](UI-REFERENCE.md).

As you update the documentation, it's a good idea to test your changes locally before committing. 

### Run Linter

Make sure your changes follow proper Markdown syntax and there are no broken links. 
Push your changes only when the next two commands pass.

1. Run the linter to validate Markdown syntax
   ```bash
   npm run lint
   ```
2. Build a local bundle to detect broken links
   ```bash
   npm run build
   ```

### Review Changes in Browser

As you make changes to the content in your local branch, it's helpful to see how the changes will be rendered when the documentation is published.

To test changes in your local environment:

1. Change to the top-level docs directory in your local copy of the `https://github.com/semaphoreci/semaphore` repository.

2. Start the development server by running the following command:

   ```bash
   npm start
   ```

3. Open a web browser and navigate to the documentation using the URL `localhost:3000`. Most changes are reflected live without having to restart the server.

## Step 4: Create a Pull Request

### Pull Request Etiquette

To ensure a smooth review process, please follow these best practices for your pull requests (PRs):

1. **Clear PR Title:** Use a concise and descriptive title for your PR that summarizes the changes (e.g., `Fix typo in Jobs Page`, `Updated Screenshot for Test Reports`).

2. **Detailed Description:** Provide a clear and detailed description of what your PR does. Include:
   - **What:** A summary of the changes made.
   - **Why:** The reason for the changes and any relevant background.
   - **How:** A brief explanation of how the changes were made, if not immediately obvious.

3. **Link to Issues:** If your PR addresses an existing issue, include a reference to it in the description (e.g., `Closes #123`).

4. **Checklist:** Ensure your PR meets all the contribution guidelines. Use a checklist to confirm:
   - [ ] The branch is up-to-date with the main branch.
   - [ ] Update follows the docs style guide.
   - [ ] Changes have been tested locally.

5. **Keep it Focused:** Limit your PR to a single purpose or issue. Multiple, unrelated changes should be divided into separate PRs.

6. **Be Ready for Feedback:** Be open to feedback and willing to make necessary changes. Engage in discussions constructively.

### Internal Contributors

If you're an internal contributor with permission to access the [semaphoreci/semaphore](https://github.com/semaphoreci/semaphore) repository, you can commit changes and push branches directly to the repository.

1. Add files and commit changes to your local branch periodically with commands similar to the following:

   ```bash
   git add <new-file-name>                      # Add a specific new file to be committed
   git add -A                                   # Add all changed files to the list of files to be committed
   git commit -am "Fix or feature description"  # Add and commit changes with a comment
   git commit -m "Fix or feature description"   # Commit changes already added
   ```

2. Push your branch to the [semaphoreci/semaphore](./) repository with a command similar to the following:
   
   ```bash
   git push origin my-branch
   ```

3. Open the Semaphore repository, select your branch as the branch to merge into `main`, then click **New pull request**.
   Reviewers are automatically assigned based on the `CODEOWNERS` file and branch protection rules. 

4. Click the `preview` tab in the PR description form, select `Documentation` template and create the pull request after filling in the description.

5. Wait for the minimum required approvals, then merge your pull request as soon as possible.

### External Contributors

If you are an external contributor, you must commit your changes to your branch and push your branch to a fork of the [semaphoreci/semaphore](https://github.com/semaphoreci/semaphore) repository.

To push changes as an external contributor:

1. Verify that you have an SSH key pair and have stored your public key in GitHub.

2. Open the Semaphore repository, click **Fork**, then select **Create a new fork**.

3. Verify the owner and repository name.

4. Click **Create fork**.
   
   Alternatively, you can create a fork from the command-line by running a command similar to the following:

   ```bash
   git remote add fork ssh://git@github.com/my-user/teleport
   ```
   In this command, `my-user` represents your GitHub user name and `semaphore` is the name of your Semaphore repository fork.

5. Pull all of the changes from the remote repository into your local fork by running the following command:
   
   ```bash
   git fetch origin
   ```

6. Push changes from your local branch to the remote fork of the Semaphore repository by running a command similar to the following:
   
   ```bash
   git push --set-upstream fork my-branch
   ```

7. Open the [semaphoreci/semaphore](https://github.com/semaphoreci/semaphore) repository, select your branch as the branch to merge into `main`, then click **New pull request**.
   
   Reviewers are automatically assigned based on the branch protection rules and the `CODEOWNERS` file. To ensure that your pull request is merged, you should respond to reviewer feedback in a timely manner.

   The pull request has to pass all CI/CD checks and incorporate any reviewer feedback.

   If you don't respond to reviewer feedback, your pull request is likely to be deemed inactive and closed.

8. Click the `preview` tab in the PR description form, select `Documentation` template and create the pull request after filling in the description.

9. Wait for the minimum required approvals, then merge your pull request as soon as possible. 

## Next Steps

- Refer to the [style guide](STYLE_GUIDE.md) to maintain consistency across your documentation page with the rest of the documentation.
- Explore the [UI components reference guide](UI-REFERENCE.md) to discover suitable UI components for your requirements.