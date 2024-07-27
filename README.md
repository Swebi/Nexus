<h1 align="center" id="title">Nexus</h1>

<p id="description">Welcome to the Nexus Repository. Nexus is a powerful solution for visualizing and managing complex project structures. By providing a clear and interactive overview of project components and their relationships, this tool enhances transparency, communication, and decision-making, ultimately leading to more successful and efficient project execution.</p>

## Features

- [x] User can give their local folder path to get visualisations.
- [x] User can visualise their repositories by means of children and nodes.
- [x] Use of various colours to represent the hierarchy of the directories and the files
- [x] User can change the structure of the code to generate the JSON File.
- [x] The User can specify which all files or folders he wants to omit from the visualisation.
- [x] Use the JSON File thus generated to make flows for the code and for the user to edit accordingly.

<h2>🛠 Installation Steps:</h2>

> [!NOTE]  
Run the commands before starting the client and server

```
pnpm i
```

<h3>To run only the client</h3>

```
pnpm start:client
```

<h3>To run only the server</h3>

```
pnpm start:server
```

<h3>To run both client and server at the same time</h3>

```
pnpm dev
```

## Acknowledgements

This project makes use of the following libraries:

- [Biome](https://biomejs.dev/) - A formatter which is better used for linting and formatting purposes
- [React-Flow](https://reactflow.dev/) - A customizable React component for building node-based editors and interactive diagrams
