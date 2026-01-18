const firebaseConfig = {
  // ⚠️ PASTE firebaseConfig PUNYA KAMU DI SINI
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function login() {
  const emailVal = email.value;
  const passwordVal = password.value;

  auth.signInWithEmailAndPassword(emailVal, passwordVal)
    .catch(() => {
      auth.createUserWithEmailAndPassword(emailVal, passwordVal);
    });
}

function sendMessage() {
  if (!auth.currentUser) return alert("Login dulu");

  db.collection("messages").add({
    user: auth.currentUser.email,
    text: message.value,
    time: firebase.firestore.FieldValue.serverTimestamp()
  });

  message.value = "";
}

db.collection("messages")
  .orderBy("time")
  .onSnapshot(snapshot => {
    chatBox.innerHTML = "";
    snapshot.forEach(doc => {
      chatBox.innerHTML += `<p><b>${doc.data().user}</b>: ${doc.data().text}</p>`;
    });
  });
