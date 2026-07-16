(function () {
  "use strict";

  var toggle = document.querySelector(".language-toggle");
  var languageNodes = document.querySelectorAll("[data-lang]");
  var storageKey = "yushuai-site-language";

  if (!toggle) {
    return;
  }

  function savedLanguage() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // Continue without persistence when storage is unavailable.
    }
  }

  function setLanguage(language) {
    var activeLanguage = language === "zh" ? "zh" : "en";
    var chinese = activeLanguage === "zh";

    languageNodes.forEach(function (node) {
      node.hidden = node.getAttribute("data-lang") !== activeLanguage;
    });

    document.documentElement.lang = chinese ? "zh-CN" : "en";
    document.body.setAttribute("data-language", activeLanguage);
    toggle.textContent = chinese ? "English" : "中文";
    toggle.setAttribute("aria-label", chinese ? "Switch to English" : "切换到中文");
    toggle.setAttribute("title", chinese ? "Switch to English" : "切换到中文");
    saveLanguage(activeLanguage);
  }

  setLanguage(savedLanguage() || "en");
  toggle.addEventListener("click", function () {
    var nextLanguage = document.body.getAttribute("data-language") === "zh" ? "en" : "zh";
    setLanguage(nextLanguage);
  });
}());
