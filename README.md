# backend-microservice-url-shortener
<p>This is a simple URL shortener microservice built using **Node.js**, **Express.js**, and **DNS lookup**. It validates URLs, assigns a short number identifier to each, and redirects when accessed.</p>
<p>This repository contains the code and materials for the Back End Development and APIs course available on www.freecodecamp.org</p>

<h2>Feature</h2>
<ul>
  <li>Submit a URL and receive a short URL.</li>
  <li>Redirect to the original URL using the short version.</li>
  <li>DNS lookup ensures only valid domain names are accepted.</li>
  <li>In-memory storage (resets when the server restarts)</li>
</ul>

### Installation

1. Clone the repository:

```bash
git clone https://github.com/MeowPong/backend-microservice-url-shortener
cd backend-microservice-url-shortener
npm install
npm start
