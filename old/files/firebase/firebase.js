document.addEventListener('DOMContentLoaded', function () {
  var loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(function () {
      loadingScreen.parentNode.removeChild(loadingScreen);
    }, 700);
  }
});

const firebaseConfig = {
  apiKey: "AIzaSyDFC2TYDhw7ILNi_HVB5TlF0ZW-g6CzJeY",
  authDomain: "krokyplus-90d21.firebaseapp.com",
  projectId: "krokyplus-90d21",
  storageBucket: "krokyplus-90d21.appspot.com",
  messagingSenderId: "747520605008",
  appId: "1:747520605008:web:5c72d0004e9a956a7bca55",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function saveUserInfo(name, username, email, password, g_token) {
  const db = firebase.firestore();
  db.collection("users")
    .doc(username)
    .set({
      name: name,
      username: username,
      password: password,
      token: g_token,
      email: email,
    })
    .then(() => {
      console.log("User information saved successfully!");
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function saveToken(token, username, name) {
  const db = firebase.firestore();
  db.collection("tokens")
    .doc(token)
    .set({
      name: name,
      username: username,
    })
    .then(() => {
      console.log("saved token");
    })
}

function createCookieWithFirestore(name) {
  return new Promise((resolve, reject) => {
    const usersRef = db.collection("users");
    const query = usersRef.where("name", "==", name).limit(1);

    query
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const firestoreCode = doc.get("token");
          setCookie("token", firestoreCode);
          resolve();
        } else {
          reject(new Error("User not found"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function setCookie(name, value) {
  var expires = "";
  var date = new Date();
  date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    const cookieName = decodeURIComponent(cookie[0]);
    const cookieValue = decodeURIComponent(cookie[1]);
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return "";
}


function register() {
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const g_token = generateToken();
    checkUsernameExists(name, username, email, password, g_token);
    setCookie("token", g_token)
  });
}

function generateToken() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";

  const allChars = uppercaseChars + lowercaseChars;
  let password = "";

  for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }
  return password;
}

function checkUsernameExists(name, username, email, password, g_token) {
  return new Promise((resolve, reject) => {
    const usersRef = db.collection("users");
    const query = usersRef.where("username", "==", username).limit(1);

    query
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          alert("Uporabnik že obstaja, prosimo pišite na mail za pomoč.")
          location.reload()
          resolve(true);
        } else {
          saveUserInfo(name, username, email, password, g_token);
          saveToken(g_token, username, name)
          setCookie("token", g_token)
          alert("Registracija je bila uspešna. Preusmerjam ...");
          window.location.href = "/user-area"
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function login() {
  document.getElementById("log-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    db.collection("users")
      .doc(username)
      .get()
      .then((doc) => {
        const name = doc.data().name;
        const password = doc.data().password;
        const token = doc.data().token;
        const input_password = document.getElementById("password").value;
        if (password !== input_password) {
          alert("Geslo ni pravilno, poskusi še enkrat.")
        } else {
          const cookienamevalue = getCookie("name");
          if (cookienamevalue === null) {
            setCookie("name", name);
            setCookie("username", username);
            setCookie("token", token);
            alert("Uspešno si bil vpisan.");
            pokažipodatke(username);
            window.location.href = "/profile";
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  })
}

function OnloadLogin() {
  const token = getCookie("token");
  if (token) {
    if (token === "") {
      return
    } else {
      db.collection("users")
        .doc()
        .get()
        .then((resolve, reject) => {
          const name = getCookie("name");
          const token = getCookie("token");
          const dokument = firebase.firestore().collection("users");
          const query = dokument.where("token", "==", token).limit(1);
          query.get().then((šara) => {
            if (!šara.empty) {
              const doc = šara.docs[0];
              const storedName = doc.data().name;
              if (name === storedName) {
                resolve;
              } else {
                reject;
              }
            } else {
              reject;
            }
          })
        })
    }
  }
}

function setContent_profile() {
  const name = getCookie("name");
  const token = getCookie("token");

  checkTrueToken(name, token).then(() => {
    document.getElementById("naslov2").innerHTML = "KrokyPlus | Profil";
    document.getElementById("register-form").style.display = "none";
    document.getElementById("profile-settings").style.display = "block";
    document.getElementById("navbar").style.display = "block";
    document.getElementById("navbar-old").style.display = "none";
  })
    .catch(() => {
      var palačinka = getCookie("name");
      if (palačinka === "") {
        return;
      } else if (palačinka !== "") {
        deleteCookie("name");
        deleteCookie("username");
        deleteCookie("token");
      }
    });
}

function spremeniP() {
  let podatki_spremeni = document.getElementById("sprememba-podatkov")
  if (podatki_spremeni.style.display === "none") {
    podatki_spremeni.style.display = "block";
    podatki_spremeni.classList.add = "vnos-spremembe";
  } else if (podatki_spremeni.style.display === "block") {
    podatki_spremeni.style.display = "none";
  }
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function logout() {
  deleteCookie("name");
  deleteCookie("token");
  deleteCookie("username");
  alert("Uspešno si bil odjavljen.");
  window.location.href = "/index";
}

function checkTrueToken(name, token) {
  return new Promise((resolve, reject) => {
    name = getCookie("name");
    const usersRef = firebase.firestore().collection("users");
    const query = usersRef.where("token", "==", token).limit(1);
    query
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const storedName = doc.data().name;
          if (name === storedName) {
            resolve(true);
          } else {
            reject(error);
          }
        } else {
          reject(error);
        }
      })
      .catch((error) => {
        reject(error);
      });
  })
}

function spremeninaslov_Register() {
  const name = getCookie("name");
  if (name === "") {
    return;
  } else {
    document.getElementById("spodnji-naslov-registracije").innerHTML = "Profil";
    if (window.location.href === "/profile" || window.location.href === "/profile.html") {
      document.title = "KrokyPlus | Profil";
      document.getElementById("u_okvir").style.display = "block";
    } else {
      return
    }
  }
}

function spremeniU_ovkir() {
  const name = getCookie("name");
  const token = getCookie("token");
  checkTrueToken(name, token).then(() => {
    const okvirček = document.getElementById("u_okvir");
    document.getElementById("u_okvir").style.display = "block";
    document.getElementById("user-name").innerHTML = name;
  }).catch((error) => {
    console.log(error);
  });
}

function pokažipodatke(username) {
  db.collection("users")
    .get()
    .doc(username)
    .then(() => {
      const geslo = doc.data().password;
      const email = doc.data().email;
      const username = doc.data().username;
      const name = doc.data().name;
      console.log(geslo, email, username, name);
      document.getElementById("password").innerHTML = geslo;
      document.getElementById("email").innerHTML = email;
      document.getElementById("username").innerHTML = username;
      document.getElementById("name").innerHTML = name;
    });
}

function spremeniPodatke() {
  if (document.getElementById("spremeni-podatke").style.display == "none") {
    document.getElementById("spremeni-podatke").style.display = "block";
  }
  else {
    document.getElementById("spremeni-podatke").style.display = "none";
  }
}