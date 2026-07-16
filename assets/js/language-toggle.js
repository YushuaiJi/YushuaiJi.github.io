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
    var profilePhoto = document.querySelector("[data-profile-photo]");
    var baseTitle = document.documentElement.getAttribute("data-base-title") || document.title;

    languageNodes.forEach(function (node) {
      node.hidden = node.getAttribute("data-lang") !== activeLanguage;
    });

    document.documentElement.lang = chinese ? "zh-CN" : "en";
    document.documentElement.setAttribute("data-base-title", baseTitle);
    document.body.setAttribute("data-language", activeLanguage);
    toggle.textContent = chinese ? "English" : "中文";
    toggle.setAttribute("aria-label", chinese ? "Switch to English" : "切换到中文");
    toggle.setAttribute("title", chinese ? "Switch to English" : "切换到中文");
    document.title = chinese ? baseTitle.replace("Publications", "发表论文").replace("CV", "个人简历").replace("Yushuai Ji", "纪宇帅") : baseTitle;
    if (profilePhoto) {
      profilePhoto.setAttribute("alt", chinese ? "纪宇帅" : "Yushuai Ji");
    }
    saveLanguage(activeLanguage);
  }

  setLanguage(savedLanguage() || "en");
  toggle.addEventListener("click", function () {
    var nextLanguage = document.body.getAttribute("data-language") === "zh" ? "en" : "zh";
    setLanguage(nextLanguage);
  });
}());
