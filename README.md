# FitnessPlus Backend

## Description
This is a backend system for managing gym memberships at Fitness+. It handles membership data, billing reminders, and sends email notifications for upcoming payments.

## Features
- Manage membership data
- Calculate and send billing reminders
- Differentiate between first month and subsequent months billing
- Send emails with membership and billing details

## Technologies
- Node.js
- Express
- Mongoose
- Nodemailer
- Node-cron
- Jest (for testing)

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the following variables:
    ```env
    MONGODB_URI
    SMTP_USE
    SMTP_PASS
    MONGOOSE_URI
    
## Test
1. Test membership `npx jest membership.test.js`
2. Test email service `npx jest emailService.test.js`