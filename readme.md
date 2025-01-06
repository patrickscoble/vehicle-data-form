# Vehicle Data Form
## Purpose
This application provides a user interface for selecting a vehicle by **Make**, **Model**, and **Badge**. Users can also optionally upload a logbook file for the selected vehicle. Preset vehicle buttons are available for convenience. The submitted information is sent to the backend API, and the user is redirected to a results page to view the submission details.

## Prerequisites
* Node.js

## Instructions to run
1. Clone the repository
2. Open Command Prompt
3. Navigate to \vehicle-data-form\src\VehicleDataForm\vehicledataform
4. Run the 'npm i' command
5. Run the 'npm run start:server' command to run the back-end server
6. Open a second Command Prompt
7. Navigate to \vehicle-data-form\src\VehicleDataForm\vehicledataform
8. Run the 'npm run dev' command to run the application
9. Open 'http://localhost:5173/' in the browser
10. Open a third Command Prompt
11. Navigate to \vehicle-data-form\src\VehicleDataForm\vehicledataform
12. Run the 'npm run test' command to run the unit tests

## Application Design Overview

### Architecture and Technologies
1. Frontend
    - Built with **React** and **TypeScript** to ensure a modular, type-safe, and efficient development experience.
    - Includes routing managed by **React Router** for seamless page transitions.
    - UI components (Dropdowns, Presets, and Form) emphasize reusability and separation of concerns.

2. State Management
    - Utilizes React’s useState hooks to manage component-level states for form inputs.
    - The useNavigate hook from React Router allows programmatic navigation to the results page upon successful submission.
3. Styling
    - CSS modules for specific components and general styles:
        - Dropdown.css for dropdown styling.
        - App.css for application-wide styles.
        - index.css for global styles and resets.
4. API Integration
    - Uses Fetch API to submit form data to a backend endpoint.
    - Handles responses with structured parsing (using a ServerResponse type from the types module).

### Component Design
1. Form Component
    - Allows dynamic selection of Make, Model, and Badge.
    - Includes a file upload feature for the logbook.
    - Validates form inputs and notifies users of incomplete forms or submission errors.
2. Dropdown Component
    - Reusable dropdown with customizable labels and options.
    - Dynamically updates based on user selections in the form.
3. Preset Component
    - Pre-fills the form with predefined vehicle configurations for quick access.
4. Results Component
    - Displays the submitted vehicle details in a clear, accessible format.

### Unit Testing
- Built with **Jest** and **React Testing Library**.
- Tests are written for individual components such as Dropdown, Preset, and Results.
- Integration tests ensure proper state handling, user interactions, and successful form submission workflows.

### Future Improvements
- Add explicit labels to dropdowns for improved accessibility and unit testability.