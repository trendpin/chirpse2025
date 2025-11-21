const firebaseConfig = {
  apiKey: "AIzaSyDniXwAIq7jCu3RkZBUnt76tgW5uC1Ld8",
  authDomain: "chirpse-2025.firebaseapp.com",
  projectId: "chirpse-2025",
  storageBucket: "chirpse-2025.appspot.com",
  messagingSenderId: "895121502746",
  appId: "1:895121502746:web:d4cdad596888f7bd7197a3",
  measurementId: "G-M8DE8H44S1"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

let me = null;
let myName = "";
let myPic = "";

auth.onAuthStateChanged(async user => {
  if (user) {
    me = user;
    const snap = await db.collection("users").doc(user.uid).get();
    const data = snap.data() || {};
    myName = data.username || "User";
    myPic = data.photoURL || "https://via.placeholder.com/120/666?text=You";
    document.body.classList.add("logged-in");

    if (location.pathname.includes("feed")) loadFeed();
    if (location.pathname.includes("profile")) loadMyPosts();
  } else if (!location.pathname.includes("index.html")) {
    location.href = "index.html";
  }
});
function signup() {
  const email = document.getElementById("email")?.value.trim();
  const pass = document.getElementById("pass")?.value;
  const username = document.getElementById("username")?.value.trim();
  if (!email || !pass || !username) return alert("Please fill all fields");
  auth.createUserWithEmailAndPassword(email, pass)
    .then(cred => {
      db.collection("users").doc(cred.user.uid).set({ username, photoURL: "" });
      location.href = "feed.html";
    })
    .catch(e => alert(e.message));
}

function login() {
  const email = document.getElementById("email")?.value.trim();
  const pass = document.getElementById("pass")?.value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(() => location.href = "feed.html")
    .catch(e => alert(e.message));
}
