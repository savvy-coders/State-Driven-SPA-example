import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import axios from "axios";
import Navigo from "navigo";
import { capitalize } from "lodash";

const router = new Navigo(window.location.origin);

function render(st = state.Home) {
  console.log("matsinet-st:", st);
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
`;
  router.updatePageLinks();
  addEventListeners();
  addPicOnFormSubmit(st);
}

function addEventListeners() {
  // add event listeners to Nav items for navigation
  document.querySelectorAll("nav a").forEach(navLink =>
    navLink.addEventListener("click", event => {
      event.preventDefault();
      render(state[event.target.title]);
    })
  );

  // add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden--mobile")
    );
}

function addPicOnFormSubmit(st) {
  if (st.view === "Form") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      // convert HTML elements to Array
      let inputList = Array.from(event.target.elements);
      // remove submit button from list
      inputList.pop();
      // construct new picture object
      let newPic = inputList.reduce((pictureObject, input) => {
        pictureObject[input.name] = input.value;
        return pictureObject;
      }, {});
      // add new picture to state.Gallery.pictures
      state.Gallery.pictures.push(newPic);
      render(state.Gallery);
    });
  }
}

router.hooks({
  before: (done, params) => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
      response.data.forEach(post => {
        state.Blog.posts.push(post);
      });
      // use our router Object to find the "current page"/last resolved route
      // const params = router.lastRouteResolved().params;
      // // this params key "page" is the same as our "variable" we specified in our router's on() method
      // render(state[params.page]);
      // console.log(state[params]);
    });

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?appid=fbb30b5d6cf8e164ed522e5082b49064&q=st.%20louis`
      )
      .then(response => {
        state.Home.weather = {};
        state.Home.weather.city = response.data.name;
        console.log(response.data.name);
        state.Home.weather.temp = response.data.main.temp;
        console.log(response.data.main.temp);
        state.Home.weather.feelsLike = response.data.main.feels_like;
        console.log(response.data.main.feels_like);
        state.Home.weather.description = response.data.weather[0].main;
        console.log(response.data.weather[0].main);
        done();
      })
      .catch(err => console.log(err));
  }
});

router
  .on({
    "/": () => render(state.Home),
    ":page": params => render(state[capitalize(params.page)])
  })
  .resolve();
