const GITHUB_USER = "Mahendra5329-star";
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`;

const fallbackProjects = [
  {
    name: "Games",
    description: "A simple browser-based games project published from GitHub.",
    language: "HTML",
    html_url: "https://github.com/Mahendra5329-star/Games",
    homepage: "https://games-one-flax.vercel.app/",
    updated_at: ""
  }
];

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
const scrollProgress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");
const projectsGrid = document.getElementById("projectsGrid");
const projectStatus = document.getElementById("projectStatus");
const repoCount = document.getElementById("repoCount");
const profileAvatar = document.getElementById("profileAvatar");
const profileInitials = document.getElementById("profileInitials");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const open = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll("#primaryNav a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  scrollProgress.style.width = `${progress}%`;
  backTop.classList.toggle("show", window.scrollY > 500);
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

profileAvatar.addEventListener("error", () => {
  profileAvatar.style.display = "none";
  profileInitials.style.display = "grid";
});

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(dateString) {
  if (!dateString) return "GitHub project";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "GitHub project";
  return `Updated ${new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date)}`;
}

function renderProjectCard(repo, index) {
  const name = escapeHTML(repo.name || "Untitled project");
  const description = escapeHTML(repo.description || "A project from my GitHub portfolio.");
  const language = escapeHTML(repo.language || "Web");
  const codeURL = repo.html_url || `https://github.com/${GITHUB_USER}`;
  const liveURL = repo.homepage ? repo.homepage : "";
  const liveLink = liveURL
    ? `<a class="project-link" href="${escapeHTML(liveURL)}" target="_blank" rel="noopener noreferrer">Live ↗</a>`
    : "";

  return `
    <article class="project-card">
      <div class="project-top">
        <span class="project-index">PROJECT ${String(index + 1).padStart(2, "0")}</span>
        <span class="project-lang">${language}</span>
      </div>
      <h3>${name}</h3>
      <p>${description}</p>
      <div class="project-bottom">
        <span class="project-date">${formatDate(repo.updated_at)}</span>
        <div class="project-actions">
          <a class="project-link" href="${escapeHTML(codeURL)}" target="_blank" rel="noopener noreferrer">Code ↗</a>
          ${liveLink}
        </div>
      </div>
    </article>
  `;
}

async function loadGitHubProfile() {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}`, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error("Profile request failed");
    const user = await response.json();
    profileName.textContent = user.name || "Mahendra LB";
    profileBio.textContent = user.bio || "Developer & BCA student";
    repoCount.textContent = String(user.public_repos ?? "—");
  } catch (error) {
    // The page still works with the static profile values.
  }
}

async function loadGitHubProjects() {
  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error("Projects request failed");

    const repos = await response.json();
    const visibleRepos = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    repoCount.textContent = String(visibleRepos.length);
    projectStatus.textContent = `${visibleRepos.length} public project${visibleRepos.length === 1 ? "" : "s"} loaded from GitHub.`;

    projectsGrid.innerHTML = visibleRepos.length
      ? visibleRepos.map(renderProjectCard).join("")
      : fallbackProjects.map(renderProjectCard).join("");
  } catch (error) {
    projectStatus.textContent = "GitHub could not be reached in the browser, so the featured project is shown instead.";
    projectsGrid.innerHTML = fallbackProjects.map(renderProjectCard).join("");
  }
}

loadGitHubProfile();
loadGitHubProjects();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));
