# Project README

## Overview

This project was built with a focus on creating a user-friendly and engaging platform, focused on user experience and the creation of habits within the platform, awarding the user for interacting and using platform functionalities

I created a full end to end platform with user authentication and persistance as a project submission. while ensuring I complete all of the requirements provided

- **Watch at the video I provided, before starting the application**
I do an overview on the platform, while explaining optimizations and interesting things I have come across, a more interactive way than just looking at my code (can do both).

I also cover some implementation/optimization details I would not like you to miss.
have in mind my bulgarian is good but is my 4th language and I do make some mistakes while speaking
## link to the video -> https://www.youtube.com/watch?v=jGR9PeXVTq4


## Completed Tasks

- **All Task Requirements Met:** Completed all the requirements across all levels

- **Extra Features:**
  - Integrated NextAuth with SIWE (Sign in with Ethereum) using wallet signatures
  - Platform optimization and persistence with Zustand
  - Dynamic Token data fetching
  - Dynamic NFT data fetching
  - Quests and point system
  - Real activity based on platform interactions
  - Platform branding with a responsive and layout


### Project Goals

I approached this project as if it were a public-facing application that I would release for my own use. My goal was to maximize user experience, encourage platform adoption, and foster habit formation, while meeting all task requirements and going beyond with added features that make this a platform aimed for public release. 

- **User Experience and Interaction:** Developed a point-based quest system to incentivize users and created an interactive and branded UI to make the platform both functional and visually engaging.
  

### Key Features and Enhancements

1. **Points System:** Users earn points through initial quests, creating a reward-based system that encourages platform exploration.
2. **Interactive and Branded UI:** An engaging, user-friendly interface that reflects consistent branding, providing a cohesive experience.

## Application Infrastructure - Technical Stack 

### Framework - Next.js

- **Why Next.js?**
  - **Custom API Endpoints:** Securely handle requests without exposing private keys.
  - **Personal Experience:** Built on my strong familiarity with Next.js 
  
### UI Tech Stack

- **ShadCDN & Tailwind CSS:** Fast, flexible styling with zero custom CSS.
- **Framer Motion:** Smooth animations and transitions.
- **Next Themes:** Integrated theming with ShadCDN, supporting light and dark modes.
- **Brand Colors:** Purple as a primary color to reinforce brand identity.

### Backend and State Management

- **Zustand for Global State Management and Persistence:** Maintains user data and platform state across sessions, reducing the need for repeated requests (optimizations).
- **Single Conditional Endpoint:** Simplifies the backend, reducing load times and enhancing navigation.
- **NextAuth and SIWE Authentication:** Provides secure wallet-based sign-in with Ethereum (Rainbowkit), 

### Data Fetching

- **Web3 API Providers:**
  - **NFTScan:** For NFT data.
  - **Moralis and SimpleHash:** For token and transaction data.
- **Form Validation with Yup and Formik:** Ensures reliable form handling and validation.


## Issues and Limitations

2. **GitHub Commit Structure and Strategy:**
   - Due to time constraints, I focused on implementation details and did not follow a structured commit strategy. In a collaborative environment, I would implement a more systematic approach.

## AI USAGE

- I used cursor and V0 extensively for the development of this application, 
from integration and development to UI mockups and visual creations, while making changes and guiding it to proceed with correct implementation and optimizations I wanted to implement

I did not provide a TXT file as the AI usage was extensive.


## Motivation for Limechain

Being able to join a web3 company here in bulgaria, is something I have wanted since my journey in software development began, limechain and other bulgarian based web3 companies gave me the motivation to persue building something in the space by myself, to learn, create and release applications that will make and impact in the web3 space, and gained the needed knowledge to one day be become part of such company, hopefully this is the time

This role is not just another job for me; it represents the culmination of my dedication to blockchain and decentralized technology.
I am willing to show and with this application, I hope I have proven how much I would like to to be part of this company, to build Web3 applications alongside the Limechain team and continue to grow and learn as a software engineer.


Thank you for considering my work. I hope this project reflects the passion and commitment I am willing to bring to the table.




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