// 1. Dark/Light Theme Toggle
var r = document.documentElement,
    b = document.getElementById("t");

if (b) {
  b.onclick = function () {
    var d = getComputedStyle(r).colorScheme === "dark";
    r.setAttribute("data-theme", d ? "light" : "dark");
    b.textContent = d ? "☀" : "☾";
  };
}

// 2. SPA Navigation View Toggling
var V = ["work", "about", "play", "notes", "contact"];

function show(v) {
  if (V.indexOf(v) < 0) v = "work";
  
  // Toggle the visibility class 'on' for sections
  V.forEach(function (n) {
    var section = document.getElementById("v-" + n);
    if (section) {
      section.classList.toggle("on", n === v);
    }
  });
  
  // Toggle the active state class 'on' for nav links
  document.querySelectorAll("nav a").forEach(function (a) {
    a.classList.toggle("on", a.dataset.v === v);
  });
  
  window.scrollTo(0, 0);
}

// Add click listeners to navigation links
document.querySelectorAll("nav a").forEach(function (a) {
  a.addEventListener("click", function (e) {
    e.preventDefault();
    var viewName = a.dataset.v || a.getAttribute("href").replace("#", "");
    show(viewName);
    location.hash = viewName; // Keeps the browser URL matching the view
  });
});

// Initialize view based on URL hash or default to work
show((location.hash || "").slice(1));

window.addEventListener("hashchange", function () {
  show(location.hash.slice(1));
});

// 3. Palette Color Shuffler (For the /play section)
function hex() {
  return (
    "#" +
    ("000000" + Math.floor(Math.random() * 16777216).toString(16)).slice(-6)
  );
}

function shuffle() {
  document.querySelectorAll(".sw").forEach(function (s) {
    var c = hex();
    s.style.background = c;
    s.textContent = c;
  });
}

var shuffleBtn = document.getElementById("sh");
if (shuffleBtn) {
  shuffleBtn.onclick = shuffle;
  shuffle();
}

// 4. Copy Real Email to Clipboard
var copyBtn = document.getElementById("cp");
if (copyBtn) {
  copyBtn.onclick = function () {
    var btn = this;
    var realEmail = "arnobvawalraj@gmail.com"; // Updated to your portfolio email
    try {
      navigator.clipboard.writeText(realEmail).then(
        function () {
          btn.textContent = "Copied!";
          setTimeout(function() { btn.textContent = "Copy email"; }, 2000); // Reset text after 2s
        },
        function () {
          btn.textContent = realEmail;
        }
      );
    } catch (e) {
      btn.textContent = realEmail;
    }
  };
}
;
