# AI FE Task for junior, mid, and senior roles

## Before you begin

### Guide to Using AI for Assistance

In this assessment, you're encouraged to utilize ChatGPT, Cursor, V0 by Vercel and other AI tools to help you complete the task. Whether it’s brainstorming ideas, solving coding challenges, or understanding new concepts, AI can be a powerful tool. We’re interested not just in the end result but also in how you use AI to tackle challenges, **so please don’t forget to submit your full prompt as well!**

### How to Use AI in this Task

You can ask AI questions to help with:

- Understanding unfamiliar technologies, like WAGMI or blockchain concepts.
- Finding solutions for specific implementation challenges (e.g., drag-and-drop features, data visualization techniques).
- Generating code snippets or getting advice on best practices.
- Debugging or improving your code.

### Instructions for Using AI

1. **Document Your Prompts:** For each significant interaction with AI, copy the prompt(s) you used and include them in your submission.
2. **Use AI Wisely:** Think of AI as a collaborative tool. You’re encouraged to critically evaluate AI responses and adapt them as necessary to meet the task requirements.
3. **Include AI-Generated Suggestions in Your Code Comments:** If you directly use AI-generated code or ideas, leave comments in your code to indicate which parts were AI-assisted.

### Submission Requirements:

- **Your Repository**: The repository should include:
  - **Production-Ready Code**: Make sure the project is fully functional and optimized for production use.
  - **README File**: Provide a README file that explains your work, how to install and run the project, any architecture decisions you made, and how to run it.
  - **Best Practices**: Structure the repository with appropriate folder organization, linting configurations, and any other best practices for a professional project.
  - **Full AI Prompt Export:**
    - Please attach the full AI promo in a single text file (`ai_prompts.txt`) or Markdown file (`ai_prompts.md`).
    - Please provide a full video recording of the process.

_Note_: We encourage you to approach this as you would a real-world project task.

## Let’s go:

### Building a Dynamic AI-Powered Dashboard with Blockchain Data Integration

### Core Task (Junior Level): Build a Dynamic Dashboard Component

- **Objective:** Create a dashboard with cards displaying information like user details, a recent activity feed, and stats (e.g., site visits, and task completion).
- **Features:** Basic interactivity, such as expanding/collapsing cards, filtering the activity feed, and a form for updating user information.
- **Tools:** Use a JavaScript framework like React or Vue, along with HTML and CSS (or a styling framework like Tailwind CSS).
- **Assessment Focus:** Component structure, styling, responsiveness, and basic interactivity.

### Additional Task for Mid-Level: Add Data Visualization Component

- **Objective:** Integrate a chart library (e.g., Chart.js or D3.js) to visualize data, like site visits or task completion over time.
- **Features:**
  - Allow users to toggle between chart types (line, bar, pie) and filter data by date ranges.
  - Add ESLint and configure it with specific rules, demonstrating your commitment to code quality.
  - Implement light/dark mode for the dashboard.
- **Requirements:** Fetch data from a mock API or JSON file, and update charts dynamically.
- **Assessment Focus:** Asynchronous data handling, component reusability, state management, and data visualization principles

### Additional Task for Senior Level: WAGMI Integration Task - Display Blockchain Data

For this task, you'll use WAGMI—a React-based library for building dApps on Ethereum. You’ll add a new widget to the dashboard that displays blockchain data, such as the latest block number and some other useful information.

- **Introduction to WAGMI:** WAGMI stands for **Web3-Auth-Get-My-Info**, a library that simplifies interactions with the Ethereum blockchain. WAGMI provides hooks and utilities to connect wallets, fetch blockchain data, and monitor changes on the Ethereum network.
- **Features:** Integrate a blockchain widget that displays:
  - Current block number
  - Get the chain id
  - Gas prices
  - User’s Ethereum wallet balance, if connected
  - User’s account
  - Get a Token at a specific address (please make sure that this address exists and that there is a token deployed on it).
- **Considerations:**
  - Ensure the dashboard provides instructions for users to connect to Ethereum. If you're new to blockchain, refer to the WAGMI documentation on connecting to Ethereum networks.
  - Implement error handling for blockchain data fetching, as network calls may occasionally fail.
- **Assessment Focus:** Integrating third-party libraries, understanding Web3 concepts, and creating a functional and user-friendly interface for blockchain data.
