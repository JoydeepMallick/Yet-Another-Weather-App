## How to

This is the server side version of the same project meant to understand the difference between server side and client side javascript programming for the sake of protecting data leaks such as API keys.

#### What we need

1. **Node js**
2. **Express js** as a dependency [Alternatively to run server we can also use http-server, read more [here](https://dev.to/burakboduroglu/building-a-nodejs-server-without-using-expressjs-3mc8)]

#### Why node.js is needed for server side development

As per FreeCodeCamp "Node. js is a powerful runtime environment for executing JavaScript code outside of a web browser. It brings the JavaScript language to the server-side, enabling developers to build scalable, high-performance, and event-driven applications."

The server-side execution of Javascript is made possible via `NodeJS`, a cross-platform, open-source Javascript runtime environment built on top of Google's V8 engine. Javascript code can run outside of the browser with the help of Node.js.

`Javascript` is a Scripting language. JS is the most common abbreviation. We can say that Javascript is an upgraded version of the ECMA script.

`V8` is the JavaScript execution engine which was initially built for Google Chrome. It was then open-sourced by Google in 2008. Written in C++, V8 compiles JavaScript source code to native machine code at runtime. As of 2016, it also includes Ignition, a bytecode interpreter.

`npm` is the pre-installed package manager for the Node.js server platform. It installs Node.js programs from the npm registry, organizing the installation and management of third-party Node.js programs. Packages in the npm registry can range from simple helper libraries such as Lodash to task runners such as Grunt.

### Step 1

We need to have a **package.json** file in our node project since The `package.json` file contains descriptive and functional metadata about a project, such as a name, version, and dependencies. The file provides the npm package manager with various information to help identify the project and handle dependencies.

We could have written it manually but we have a automated way of performing this via `npm init`.

```bash
npm init
```

### Step 2

We need expressJS which provides cool set of tools to organize our backend, also we have alternatives of express like http-server.
We install it via the command

```bash
npm install express
```

This causes the express module to get installed within `node_modules` folder which gets created along with few other files, the node_modules contains all the modules and dependencies which project requires and each modules in turn does have multiple dependencies leading to so many files😦

Now write the following in index.js file:-

```js
const express = require("express");
const app = express();
```

These lines mean the following :-

1. Importing Express: `const express = require('express');` imports the Express framework, a popular Node.js library for building web applications and APIs.

2. Creating an Express Application: `const app = express();` creates a new instance of an Express application and assigns it to the variable app. This app object serves as the central hub for configuring and managing your web application.

#### Concept of port

_What is a port number?_

It's a 16-bit number (0-65535) that acts as a virtual address or doorway for specific network services or applications running on a device.
It's like a house address (IP address) with different rooms (ports) for different activities.
Purpose in server-side development:

    1. Identifies and directs traffic: When a client (like a web browser) sends a request to a server, the port number specifies which service or application on the server should receive and handle the request.

    2. Multiple services: Allows a single server to run multiple services simultaneously, each listening on its own port.

Common port numbers in server-side development:

    80: HTTP (web traffic)
    443: HTTPS (secure web traffic)
    22: SSH (secure remote access)
    3306: MySQL (database)
    5432: PostgreSQL (database)
    6379: Redis (in-memory data store)

**Available Ports for Local Development:**

Generally, any port above 1024 is available for your applications.
Avoid ports below 1024 as they're reserved for system services (e.g., HTTP, HTTPS, SSH, FTP).
Checking for Available Ports:

**Tools to check port usage:**

1. Windows: `netstat -ano` in Command Prompt
2. macOS/Linux: `netstat -anp` in Terminal
3. Third-party tools: TCPView (Windows), lsof (macOS/Linux)

**Choosing Ports for Development:**

1. Commonly used ports for development: 3000, 3001, 8080, 8081, 5000
2. Check for conflicts: Ensure the port you choose isn't already in use.
3. Consider dynamic port allocation: Let the operating system assign a free port.

**Equal Number of Ports on PCs:**

Conceptually, yes: **All PCs have the same 65,535 theoretical port numbers.**

**Practical factors:**

1. Reserved ports: Some ports are reserved for specific services, reducing the pool available for custom applications.
2. Firewall restrictions: Some firewalls may block certain ports.

### Step 3

Now add this line :-

```js
app.listen(3000, () => console.log("Listening at port 3000"));
```

Enables the server to receive and respond to requests from web browsers or other clients.
What it does in detail:

1. Starts the server: Instructs the Node.js application to start listening for incoming requests.
2. Specifies port 3000: Sets the port number (3000) where the server will listen for connections.
3. Logs a message: Prints "Listening at port 3000" to the console, confirming successful server start.

#### cannot GET /

**Missing Routes**: The server has no instructions on how to handle requests to the root path (/). It's like a phone without a contact list—it can't direct calls without knowing where to send them.

We can add static pages in the following way:-

```js
app.use(express.static("public"));
```

Here's a concise explanation of why app.use(express.static('public')) removes the error:

1. Serving static files: This line tells your Express app to **serve static files (like HTML, CSS, JavaScript) directly from a designated folder**, in this case, the 'public' folder.

2. Routes requests to static files: When a browser requests a file from your server (e.g., **'index.html'**), this middleware intercepts the request and serves the file from the 'public' folder if it exists, eliminating the need for you to manually define a route for each static file.

3. Provides a default response for root path: If a request is made to the root path (/) and no specific route is defined, **this middleware automatically serves the 'index.html' file from the 'public' folder, acting as a default response and resolving the "/cannot get" error.**
   i.e. `localhost:3000` and `localhost:3000/index.html` are same.

4. Essential for frontend: **This line is crucial for serving frontend files and enabling the browser to render the website's content and structure.**

### To run

````bash
node index.js```

````

#### SOme alternatives

1.  Instead of axios we can use fetch inbult
2.  Instead of express we can use http inbuilt

