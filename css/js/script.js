/ ===== 1. Mobilni meni =====
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// ===== 2. Kucanje koda u hero sekciji =====
const codeText =
`const klub = {
  ime: "Coding Club",
  jezici: ["HTML", "CSS", "JS", "Python"],
  sastanak: "jednom sedmično"
};

function pridruziSe(ucenik) {
  klub.clanovi.push(ucenik);
  return "Dobrodošao/la!";
}`;
const codeEl = document.getElementById("typed-code");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  codeEl.textContent = codeText;
} else {
  let i = 0;
  const type = () => {
    codeEl.textContent = codeText.slice(0, ++i);
    if (i < codeText.length) setTimeout(type, 35);
  };
  type();
}

// ===== 3. Filter projekata =====
const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projects.forEach(p => {
      p.hidden = filter !== "svi" && p.dataset.category !== filter;
    });
  });
});
// ===== 4. Validacija forme =====
const form = document.getElementById("signup-form");
const success = document.getElementById("form-success");

function setError(id, message) {
  const field = document.getElementById(id);
  document.getElementById(id + "-error").textContent = message;
  field.classList.toggle("invalid", message !== "");
  return message === "";
}

function validate() {
  const ime = form.ime.value.trim();
  const email = form.email.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const results = [
    setError("ime", ime.split(/\s+/).length >= 2 ? "" : "Upiši ime i prezime."),
    setError("email", emailOk ? "" : "Upiši ispravnu email adresu, npr. ime@skola.ba."),
    setError("razred", form.razred.value ? "" : "Izaberi razred."),
    setError("poruka", form.poruka.value.trim().length >= 10 ? "" : "Napiši barem 10 znakova."),
  ];
  return results.every(Boolean);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  success.textContent = "";
  if (validate()) {
    success.textContent = "Prijava je poslana. Javit ćemo ti se uskoro.";
    form.reset();
  }
});