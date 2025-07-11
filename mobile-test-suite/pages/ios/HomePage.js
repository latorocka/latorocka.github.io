const BasePage = require('../base/BasePage');

class HomePage extends BasePage {
  constructor() {
    super();
  }

  // Selectors
  get appTitle() {
    return $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
  }

  get activityIndicatorsOption() {
    return $('//XCUIElementTypeCell[@name="Activity Indicators"]');
  }

  get alertViewsOption() {
    return $('//XCUIElementTypeCell[@name="Alert Views"]');
  }

  get buttonsOption() {
    return $('//XCUIElementTypeCell[@name="Buttons"]');
  }

  get datePickerOption() {
    return $('//XCUIElementTypeCell[@name="Date Picker"]');
  }

  get imageViewOption() {
    return $('//XCUIElementTypeCell[@name="Image View"]');
  }

  get pageControlOption() {
    return $('//XCUIElementTypeCell[@name="Page Control"]');
  }

  get pickersOption() {
    return $('//XCUIElementTypeCell[@name="Pickers"]');
  }

  get progressViewOption() {
    return $('//XCUIElementTypeCell[@name="Progress Views"]');
  }

  get searchBarsOption() {
    return $('//XCUIElementTypeCell[@name="Search Bars"]');
  }

  get segmentedControlsOption() {
    return $('//XCUIElementTypeCell[@name="Segmented Controls"]');
  }

  get slidersOption() {
    return $('//XCUIElementTypeCell[@name="Sliders"]');
  }

  get stackViewsOption() {
    return $('//XCUIElementTypeCell[@name="Stack Views"]');
  }

  get steppersOption() {
    return $('//XCUIElementTypeCell[@name="Steppers"]');
  }

  get switchesOption() {
    return $('//XCUIElementTypeCell[@name="Switches"]');
  }

  get textFieldsOption() {
    return $('//XCUIElementTypeCell[@name="Text Fields"]');
  }

  get textViewOption() {
    return $('//XCUIElementTypeCell[@name="Text View"]');
  }

  get toolbarsOption() {
    return $('//XCUIElementTypeCell[@name="Toolbars"]');
  }

  get webViewOption() {
    return $('//XCUIElementTypeCell[@name="Web View"]');
  }

  get searchBar() {
    return $('//XCUIElementTypeSearchField');
  }

  // Actions
  waitForHomePageToLoad() {
    this.waitForDisplayed(this.appTitle, 30000);
    return this;
  }

  isHomePageDisplayed() {
    return this.appTitle.isDisplayed();
  }

  selectActivityIndicators() {
    this.safeClick(this.activityIndicatorsOption);
    return this;
  }

  selectAlertViews() {
    this.safeClick(this.alertViewsOption);
    return this;
  }

  selectButtons() {
    this.safeClick(this.buttonsOption);
    return this;
  }

  selectDatePicker() {
    this.safeClick(this.datePickerOption);
    return this;
  }

  selectImageView() {
    this.safeClick(this.imageViewOption);
    return this;
  }

  selectPageControl() {
    this.safeClick(this.pageControlOption);
    return this;
  }

  selectPickers() {
    this.safeClick(this.pickersOption);
    return this;
  }

  selectProgressViews() {
    this.safeClick(this.progressViewOption);
    return this;
  }

  selectSearchBars() {
    this.safeClick(this.searchBarsOption);
    return this;
  }

  selectSegmentedControls() {
    this.safeClick(this.segmentedControlsOption);
    return this;
  }

  selectSliders() {
    this.safeClick(this.slidersOption);
    return this;
  }

  selectStackViews() {
    this.safeClick(this.stackViewsOption);
    return this;
  }

  selectSteppers() {
    this.safeClick(this.steppersOption);
    return this;
  }

  selectSwitches() {
    this.safeClick(this.switchesOption);
    return this;
  }

  selectTextFields() {
    this.safeClick(this.textFieldsOption);
    return this;
  }

  selectTextView() {
    this.safeClick(this.textViewOption);
    return this;
  }

  selectToolbars() {
    this.safeClick(this.toolbarsOption);
    return this;
  }

  selectWebView() {
    this.safeClick(this.webViewOption);
    return this;
  }

  searchForOption(searchTerm) {
    this.safeSetValue(this.searchBar, searchTerm);
    return this;
  }

  getAvailableOptions() {
    const options = $$('//XCUIElementTypeCell//XCUIElementTypeStaticText');
    return options.map(option => option.getText());
  }

  scrollToOption(optionText) {
    const option = $(`//XCUIElementTypeCell[@name="${optionText}"]`);
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
      this.buttonsOption,
      this.textFieldsOption,
      this.searchBarsOption,
      this.segmentedControlsOption,
      this.slidersOption,
      this.switchesOption,
      this.alertViewsOption,
      this.activityIndicatorsOption
    ];

    return elements.every(element => {
      try {
        return element.isDisplayed();
      } catch (error) {
        return false;
      }
    });
  }

  goBackToHome() {
    const backButton = $('//XCUIElementTypeButton[@name="UICatalog"]');
    if (backButton.isDisplayed()) {
      this.safeClick(backButton);
    }
    return this;
  }
}

module.exports = new HomePage();