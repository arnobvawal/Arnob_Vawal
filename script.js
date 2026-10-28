var r = document.documentElement,
        b = document.getElementById("t");
      b.onclick = function () {
        var d = getComputedStyle(r).colorScheme === "dark";
        r.setAttribute("data-theme", d ? "light" : "dark");
        b.textContent = d ? "☀" : "☾";
      };
      var V = ["work", "about", "play", "notes", "contact"];
      function show(v) {
        if (V.indexOf(v) < 0) v = "work";
        V.forEach(function (n) {
          document.getElementById("v-" + n).classList.toggle("on", n === v);
        });
        document.querySelectorAll("nav a").forEach(function (a) {
          a.classList.toggle("on", a.dataset.v === v);
        });
        window.scrollTo(0, 0);
      }
      document.querySelectorAll("nav a").forEach(function (a) {
        a.addEventListener("click", function (e) {
          e.preventDefault();
          show(a.dataset.v);
        });
      });
      show((location.hash || "").slice(1));
      window.addEventListener("hashchange", function () {
        show(location.hash.slice(1));
      });
      function hex() {
        return (
          "#" +
          ("000000" + Math.floor(Math.random() * 16777216).toString(16)).slice(
            -6,
          )
        );
      }
      function shuffle() {
        document.querySelectorAll(".sw").forEach(function (s) {
          var c = hex();
          s.style.background = c;
          s.textContent = c;
        });
      }
      document.getElementById("sh").onclick = shuffle;
      shuffle();
      document.getElementById("cp").onclick = function () {
        var b = this;
        try {
          navigator.clipboard.writeText("arnob@example.com").then(
            function () {
              b.textContent = "Copied";
            },
            function () {
              b.textContent = "arnob@example.com";
            },
          );
        } catch (e) {
          b.textContent = "arnob@example.com";
        }
      };