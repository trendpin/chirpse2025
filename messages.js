db.collection("chat").orderBy("ts").onSnapshot(snap => {
  const chat = document.getElementById("chat");
  chat.innerHTML = "";
  snap.forEach(doc => {
    const m = doc.data();
    const div = document.createElement("div");
    div.className = "msg " + (m.uid === me.uid ? "me" : "other");
    div.textContent = m.text;
    chat.appendChild(div);
  });
  chat.scrollTop = chat.scrollHeight;
});

function sendMsg() {
  const input = document.getElementById("msgInput");
  const text = input.value.trim();
  if (!text) return;
  db.collection("chat").add({ text, uid: me.uid, name: myName, ts: Date.now() });
  input.value = "";
}
