# Amex - School Management System - Frontend

A frontend application for the School Management System project, built with React and Ant Design.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Code Structure](#code-structure)
  - [Client](#client)
  - [Components](#components)
  - [Notification](#notification)
- [Local Development Setup](#local-development-setup)
- [Tech Stack](#tech-stack)

## Introduction

This frontend application provides a user interface for managing students in the school management system. It allows users to add, update, and delete student records.

## Features

- Add new student
- Update existing student
- Delete student
- View list of students

## Code Structure

### Client

The `client.js` file contains functions to make API requests to the backend server using the `fetch` API.

### Components

The main component is `App.js`, which is responsible for rendering the application layout and managing state. It utilizes other components such as `StudentDrawerForm` for adding and editing students, and `Notification` for displaying notifications.

### Notification

The `Notification.js` file contains functions for displaying success, error, info, and warning notifications using Ant Design's notification component.

## Local Development Setup

To set up the frontend application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/knitinjaideep/AmexProjectFrontEnd.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Access the application at `http://localhost:3000`.

## Tech Stack

- React
- Javascript
- Ant Design
- Unfetch

