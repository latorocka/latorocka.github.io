const BasePage = require('../base/BasePage');

class HomePage extends BasePage {
  constructor() {
    super();
  }

  // Selectors
  get appTitle() {
    return $('//android.widget.TextView[@text="API Demos"]');
  }

  get accessibilityOption() {
    return $('//android.widget.TextView[@text="Accessibility"]');
  }

  get animationOption() {
    return $('//android.widget.TextView[@text="Animation"]');
  }

  get appOption() {
    return $('//android.widget.TextView[@text="App"]');
  }

  get contentOption() {
    return $('//android.widget.TextView[@text="Content"]');
  }

  get graphicsOption() {
    return $('//android.widget.TextView[@text="Graphics"]');
  }

  get mediaOption() {
    return $('//android.widget.TextView[@text="Media"]');
  }

  get nfcOption() {
    return $('//android.widget.TextView[@text="NFC"]');
  }

  get osOption() {
    return $('//android.widget.TextView[@text="OS"]');
  }

  get preferenceOption() {
    return $('//android.widget.TextView[@text="Preference"]');
  }

  get textOption() {
    return $('//android.widget.TextView[@text="Text"]');
  }

  get viewsOption() {
    return $('//android.widget.TextView[@text="Views"]');
  }

  get searchField() {
    return $('//android.widget.EditText[@resource-id="android:id/search_src_text"]');
  }

  get searchButton() {
    return $('//android.widget.ImageView[@resource-id="android:id/search_button"]');
  }

  // Actions
  waitForHomePageToLoad() {
    this.waitForDisplayed(this.appTitle, 30000);
    return this;
  }

  isHomePageDisplayed() {
    return this.appTitle.isDisplayed();
  }

  selectAccessibility() {
    this.safeClick(this.accessibilityOption);
    return this;
  }

  selectAnimation() {
    this.safeClick(this.animationOption);
    return this;
  }

  selectApp() {
    this.safeClick(this.appOption);
    return this;
  }

  selectContent() {
    this.safeClick(this.contentOption);
    return this;
  }

  selectGraphics() {
    this.safeClick(this.graphicsOption);
    return this;
  }

  selectMedia() {
    this.safeClick(this.mediaOption);
    return this;
  }

  selectNFC() {
    this.safeClick(this.nfcOption);
    return this;
  }

  selectOS() {
    this.safeClick(this.osOption);
    return this;
  }

  selectPreference() {
    this.safeClick(this.preferenceOption);
    return this;
  }

  selectText() {
    this.safeClick(this.textOption);
    return this;
  }

  selectViews() {
    this.safeClick(this.viewsOption);
    return this;
  }

  searchForOption(searchTerm) {
    this.safeClick(this.searchButton);
    this.safeSetValue(this.searchField, searchTerm);
    return this;
  }

  getAvailableOptions() {
    const options = $$('//android.widget.TextView[contains(@resource-id, "text1")]');
    return options.map(option => option.getText());
  }

  scrollToOption(optionText) {
    const option = $(`//android.widget.TextView[@text="${optionText}"]`);
    if (!option.isDisplayed()) {
      this.scrollDown();
      return this.scrollToOption(optionText);
    }
    return option;
  }

  selectOptionByText(optionText) {
    const option = this.scrollToOption(optionText);
    this.safeClick(option);
    return this;
  }

  getAppTitle() {
    return this.getElementText(this.appTitle);
  }

  verifyHomePageElements() {
    const elements = [
      this.accessibilityOption,
      this.animationOption,
      this.appOption,
      this.contentOption,
      this.graphicsOption,
      this.mediaOption,
      this.osOption,
      this.textOption,
      this.viewsOption
    ];

    return elements.every(element => {
      try {
        return element.isDisplayed();
      } catch (error) {
        return false;
      }
    });
  }
}

module.exports = new HomePage();