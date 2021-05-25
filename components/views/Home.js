import html from "html-literal";

export default () => html`
  <section id="jumbotron">
    <h2>Savvy Coders Jan. 2020 Cohort</h2>
    <a href="">"Call to Action" "Button"</a>
  </section>
`;

// const kelvinToFahrenheit = (kelvinTemp) =>
//   Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

/* <h3>
Weather in ${st.Home.weather.name}
${kelvinToFahrenheit(st.Home.weather.temp)}F, feels like
${kelvinToFahrenheit(st.Home.weather.feelsLike)}F
</h3> */
