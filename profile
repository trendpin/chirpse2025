<!DOCTYPE html><html><head><title>Chirpse • Profile</title><link rel="stylesheet" href="styles.css"></head>
<body class="app"><header><h2>Chirpse</h2><nav><a href="feed.html">Feed</a><a href="profile.html">Profile</a><a href="messages.html">Messages</a><a href="settings.html">Settings</a></nav></header>
<div class="container profile-center">
  <img id="myPic" class="big-avatar" src="https://via.placeholder.com/200/666?text=You">
  <h2 id="myName"></h2>
  <input type="file" id="picInput" accept="image/*" hidden><button onclick="document.getElementById('picInput').click()">Change Photo</button>
  <h3>My Posts</h3><div id="myPosts"></div>
</div>
<script src="app.js"></script><script src="profile.js"></script></body></html>
