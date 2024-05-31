# To-Do List

## Introduction

**To-Do List** is a simple and responsive web application that helps you manage your tasks efficiently. You can add new tasks, edit or delete existing ones, mark tasks as completed, and sort tasks by date or priority. The application is built using HTML, CSS, JavaScript, and Flask.

## Features

- **Add Tasks**: Add new tasks with a due date and priority.
- **Edit Tasks**: Edit existing tasks to update their details.
- **Delete Tasks**: Remove tasks that are no longer needed.
- **Mark as Completed**: Mark tasks as completed to move them to the completed section.
- **Sort Tasks**: Sort tasks by date or priority.
- **Responsive Design**: The application is responsive and works well on all devices.

## Setup

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JonathanPeng0626/To-Do-List.git
   cd To-Do-List
   ```

2. **Create and Activate a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

5. **Open the Application**:
Open your browser and go to http://127.0.0.1:5000 to see the application in action.

## Usage

### Adding a Task

- Enter the task description in the input field.
- Select a due date for the task.
- Choose a priority (Low, Medium, High).
- Click the "Add" button to add the task to the pending tasks list.

### Editing a Task
- Click the "Edit" button next to the task you want to edit.
- Update the task details in the modal that appears.
- Click the "Save changes" button to update the task.

### Deleting a Task
- Click the "Delete" button next to the task you want to remove.

### Marking a Task as Completed
- Click the "Complete" button next to the task you want to mark as completed.
- The task will move to the completed tasks list.

### Sorting Tasks
- Use the "Sort by" dropdown menu to sort tasks by date or priority.

## Contributing
If you want to contribute to this project, please follow these steps:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature-name).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature/your-feature-name).
- Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
If you have any questions or feedback, please feel free to reach out to me. Your input is greatly appreciated.
