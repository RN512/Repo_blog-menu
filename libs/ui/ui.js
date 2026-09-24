function loadScript(src) {
  return new Promise((resolve, reject) => {
   const script = document.createElement("script");

    script.src = src;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

loadScript("./libs/ui/UiParser.js")
    .then(() => loadScript("./libs/ui/UiUl.js"))
    .then(() => loadScript("./libs/ui/UiDl.js"))
    .then(() => loadScript("./libs/ui/UiImg.js"))
    .catch(console.error);
