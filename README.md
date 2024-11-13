# Project README

## Overview

This project was built with a focus on creating a user-friendly and engaging platform, optimized for public release, to demonstrate my technical skills, UI/UX focus, and commitment to quality.
I implemented all task requirements along with additional features that would make this a viable candidate for a real public launch.

Please look at the video I provided, I go into detail about my decisions, though process and implementation/optimization details I would not like you to miss.

## Completed Tasks

- **All Task Requirements Met:** Completed every specified requirement across all levels.

- **Extra Features:**
  - Integrated NextAuth with SIWE (Sign in with Ethereum) using wallet signatures
  - Platform optimization and persistence with Zustand
  - Dynamic Token data fetching
  - Dynamic NFT data fetching
  - Quests and point system
  - Real activity based on platform interactions
  - Platform branding with a responsive and layout


### Project Goals

I approached this project as if it were a public-facing application that I would release for my own use. My goal was to maximize user experience, encourage platform adoption, and foster habit formation, while meeting all task requirements and going beyond with added features that elevate the platform. 

- **User Experience and Interaction:** Developed a point-based quest system to incentivize users and created an interactive and branded UI to make the platform both functional and visually engaging.
  

### Key Features and Enhancements

1. **Points System:** Users earn points through initial quests, creating a reward-based system that encourages platform exploration.
2. **Interactive and Branded UI:** An engaging, user-friendly interface that reflects consistent branding, providing a cohesive experience.

## Application Infrastructure - Technical Stack 

### Framework - Next.js

- **Why Next.js?**
  - **Custom API Endpoints:** Securely handle requests without exposing private keys.
  - **Personal Experience:** Built on my strong familiarity with Next.js for efficient, high-quality implementation.
  
### UI Tech Stack

- **ShadCDN & Tailwind CSS:** Fast, flexible styling with zero custom CSS.
- **Framer Motion:** Smooth animations and transitions.
- **Next Themes:** Integrated theming with ShadCDN, supporting light and dark modes.
- **Brand Colors:** Purple as a primary color to reinforce brand identity.

### Backend and State Management

- **Zustand for Global State Management and Persistence:** Maintains user data and platform state across sessions, reducing the need for repeated requests (optimizations).
- **Single Conditional Endpoint:** Simplifies the backend, reducing load times and enhancing navigation.
- **NextAuth and SIWE Authentication:** Provides secure wallet-based sign-in with Ethereum, setting up for potential future enhancements (e.g., username and email).

### Data Fetching

- **Web3 API Providers:**
  - **NFTScan:** For NFT data.
  - **Moralis and SimpleHash:** For token and transaction data.
- **Form Validation with Yup and Formik:** Ensures reliable form handling and validation.


## Issues and Limitations

1. **Single User/Wallet Sign-In Only:**
   - The current version does not support multiple users or wallets .
   - **TL;DR:** When a new wallet is connected, it inherits the previous session's data. Future updates would aim to support isolated profiles for multiple users and wallets.

2. **GitHub Commit Structure and Strategy:**
   - Due to time constraints, I focused on implementation details and did not follow a structured commit strategy. In a collaborative environment, I would implement a more systematic approach.

## Motivation for Limechain

From the beginning of my career, I aspired to work in the Web3 space, driven by a passion for decentralized technologies. I left my Web2 role at REWE (Billa) to transition into the NFT and blockchain sector, independently releasing applications and building a development team for Web3Me before its public release. This journey was motivated by a desire to create a portfolio strong enough to secure a role at Limechain or Nexo.

This role is not just another job for me; it represents the culmination of years of dedication to blockchain and decentralized technology. I believe that my experience, skills, and commitment to innovation make me an ideal candidate for Limechain, and I am excited to contribute to building incredible, innovative Web3 applications alongside the Limechain team.

---

Thank you for considering my work. I hope this project reflects the passion and commitment I will bring to Limechain.




--------------------------------------------------------------------------


# RUNNING THE PROJECT

1. Ensure that the `.env.local` file includes the necessary secret keys for:
   - Moralis
   - NFTScan
   - SimpleHash

2. Install dependencies by running `npm install`.

3. Start the development server by running `npx next dev`.

### Requirements

- Users must connect a wallet to authenticate. Supported wallets include:
  - Rainbow Kit Supported wallets