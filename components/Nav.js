import html from "html-literal";

export default links => html`
  <nav>
    <i class="fas fa-bars"></i>
    <ul class="hidden--mobile nav-links">
    ${links.reduce(
      (html, link) =>
        html + `<li><a href="#" title="${link.title}">${link.text}</a></li>`,
      ``
    )}
    </ul>
  </nav>
`;
