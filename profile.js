document.getElementById("myPic").src = myPic;
document.getElementById("myName").textContent = myName;

document.getElementById("picInput").onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const ref = storage.ref("profiles/" + me.uid);
  ref.put(file).then(snap => snap.ref.getDownloadURL())
    .then(url => {
      db.collection("users").doc(me.uid).update({ photoURL: url });
      document.getElementById("myPic").src = url;
    });
};

function loadMyPosts() {
  const container = document.getElementById("myPosts");
  container.innerHTML = "<p>Loading your posts...</p>";
  db.collection("posts").where("uid", "==", me.uid).orderBy("ts", "desc").onSnapshot(snap => {
    container.innerHTML = snap.empty ? "<p>No posts yet</p>" : "";
    snap.forEach(doc => {
      const p = doc.data();
      const div = document.createElement("div");
      div.className = "post";
      div.innerHTML = `${p.text || ""}${p.photo ? `<img src="${p.photo}">` : ""}<br><small>${new Date(p.ts).toLocaleString()}</small>`;
      container.appendChild(div);
    });
  });
}
