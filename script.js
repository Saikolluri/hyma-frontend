const API = "https://hyma-backend.onrender.com/api/ideas";

// Load ideas when page loads
document.addEventListener("DOMContentLoaded", loadIdeas);

// POST IDEA
function postIdea() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Please enter a proper title and description");
    return;
  }

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, description })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      loadIdeas();
    })
    .catch(err => console.error(err));
}

// LOAD IDEAS
function loadIdeas() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("ideasContainer");
      container.innerHTML = "";

      data.forEach(idea => {
        const div = document.createElement("div");
        div.className = "idea-card";
        div.innerHTML = `
          <h3>${idea.title}</h3>
          <p>${idea.description}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}

// SCROLL HELPERS
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

