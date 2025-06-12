const articles = [
  {
    name: "js-async-await",
    title: "Mastering JavaScript Async/Await",
    content: [
      "Async/Await simplifies working with promises, making asynchronous code easier to read and write.",
      "Example:\nasync function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
      "Always handle errors with try/catch to avoid unhandled promise rejections.",
      "Async functions always return a promise, even if you explicitly return a value.",
    ],
  },
  {
    name: "css-grid-layout",
    title: "A Beginner’s Guide to CSS Grid Layout",
    content: [
      "CSS Grid is a powerful 2D layout system for creating web layouts.",
      "You define rows and columns, then place items in grid cells or areas.",
      "Example:\n.container {\n  display: grid;\n  grid-template-columns: 100px 1fr 100px;\n  grid-gap: 10px;\n}",
      "Grid helps build responsive designs with minimal code.",
    ],
  },
  {
    name: "nodejs-event-loop",
    title: "Understanding the Node.js Event Loop",
    content: [
      "The event loop allows Node.js to perform non-blocking I/O operations.",
      "It continuously checks the call stack and the callback queue to process asynchronous events.",
      "Phases include timers, I/O callbacks, idle, poll, check, and close callbacks.",
      "Understanding it helps you write efficient asynchronous code in Node.js.",
    ],
  },
  {
    name: "docker-container-basics",
    title: "Getting Started with Docker Containers",
    content: [
      "Docker containers package your application with all dependencies for consistent environments.",
      "Use Dockerfile to define how your container image is built.",
      "Commands like docker run, docker build, and docker-compose simplify container management.",
      "Containers are lightweight and faster than virtual machines.",
    ],
  },
  {
    name: "python-data-classes",
    title: "Simplify Python Classes with Data Classes",
    content: [
      "Data classes reduce boilerplate code for classes storing data.",
      "Use @dataclass decorator to auto-generate __init__, __repr__, and comparison methods.",
      "Example:\nfrom dataclasses import dataclass\n@dataclass\nclass Point:\n  x: int\n  y: int",
      "They improve code readability and maintainability.",
    ],
  },
];

export default articles;
