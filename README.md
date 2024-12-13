# React + Vite

Hosted Link: https://taskmangerbyamitmishra.netlify.app/


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Requirements
1. Implement the code structure for the application.
2. Use tailwindcss to structure the CSS for this application as far as possible.
3. Implement layout of the application and board page
4. Sidebar should be collapsible.
5. Users should be able to add new tasks and delete them.
a. On adding a new task you can add random title and description, or hardcode
a list of tasks and select 1 randomly to add a new task.
6. The title of the board should be editable.
7. Tasks can be filtered using search bar, filtering criteria is: title or description contains
the search text.
8. Tasks should be grouped according to their status(backlog, in progress etc.)
9. Bonus: Users can drag and drop tasks to reorder them or update their statuses. Use
react-beautiful-dnd if building with react.
