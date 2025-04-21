const langCodes = ['en','sp']
function detectBrowserNumericLanguage() {
    let lang = detectBrowserLanguage()
    let theCode = getLanguageCode(lang)
    return getNumericCode(theCode)
}
function detectBrowserLanguage() {
    if (navigator.languages && navigator.languages.length) {
      // Most reliable, if available
      return navigator.languages[0];
    } else if (navigator.userLanguage) {
      // Internet Explorer
      return navigator.userLanguage;
    } else if (navigator.language) {
      // Other browsers
      return navigator.language;
    } else {
      // Default to English if no language is detected
      return 'en-US';
    }
  }
  
  // Example usage:
//   const browserLanguage = detectBrowserLanguage();
//   console.log('Browser language:', browserLanguage);
  
  // Extract the language code (e.g., 'en' from 'en-US')
  function getNumericCode(theCode) {
    let result = 0
    for(let i=0;i<langCodes.length;i++){
        if(theCode.toLowerCase() == langCodes[i]){
            result = i
        }
    }
    return result
  }
  function getLanguageCode(locale) {
    if (!locale) {
      return 'en'; //default
    }
    const parts = locale.split('-');
    return parts[0];
  }
  
//   const languageCode = getLanguageCode(browserLanguage);
//   console.log('Language code:', languageCode);
  
  /*
  // Example to get the region code (e.g., 'US' from 'en-US')
  function getRegionCode(locale){
    if (!locale || locale.split('-').length < 2) {
      return null; // or handle as you wish
    }
    const parts = locale.split('-');
    return parts[1];
  }
  
  const regionCode = getRegionCode(browserLanguage);
  console.log("Region Code:", regionCode);
  */
  


function changeTheLang(infoLang) {
    lang = parseInt(infoLang.split('_')[1])
    let langContent = contents[lang]
    changeLang_commons(langContent)
    changeLang_density(langContent)
    changeLang_pressure(langContent)
    changeLang_pascal(langContent)
    changeLang_hydraulicPress(langContent)
    changeLang_archimedes(langContent)
  }
function changeLang_commons(langContent) {
  document.title = 'Tocapedia '+langContent.title
  document.getElementById('subjectTitle').innerHTML = langContent.title+'&nbsp;'
  document.getElementById('subjectConcept').innerHTML = langContent.concept
  document.getElementById('density-tab').innerHTML = langContent.menu[0]
  document.getElementById('pressure-tab').innerHTML = langContent.menu[1]
  document.getElementById('pascal-tab').innerHTML = langContent.menu[2]
  document.getElementById('hydraulicpress-tab').innerHTML = langContent.menu[3]
  document.getElementById('archimedes-tab').innerHTML = langContent.menu[4]
}
/*
function fillSomeLines(baseId,arrayLines) {
  for(let i=0;i<arrayLines.length;i++){
    document.getElementById(baseId+i).innerHTML = arrayLines[i]
  }
}
  */
function fillArray(baseId,infoArray) {
  for(let i=0;i<infoArray.length;i++){
      document.getElementById(baseId+i).innerHTML = infoArray[i]
  }
}
function changeLang_modal(baseId,content) {
  document.getElementById(baseId+'Title').innerHTML = content.title
  document.getElementById(baseId+'Info').innerHTML = content.info
}
function changeLang_density(langContent) {
  document.getElementById('density_info1').innerHTML = langContent.density.info1
  changeLang_modal('modal_intrinsic',langContent.density.modal1)
  // document.getElementById('modal_intrinsicLabel').innerHTML = langContent.density.modal1.title
  // document.getElementById('modal_intrinsicInfo').innerHTML = langContent.density.modal1.info
  fillArray('density_1_text1_tp',langContent.density.activity1.text1)
  
  fillArray('density_1_text2_tp',langContent.density.activity1.columns)
  fillArray('density_1_text3_tp',langContent.density.activity1.materials)
}
function changeLang_pressure(langContent) {
  document.getElementById('pressure_info1').innerHTML = langContent.pressure.info1
  fillArray('pressure_1_text1_tp',langContent.pressure.activity1.text1)
  fillArray('pressure_1_text2_tp',langContent.pressure.activity1.text2)

  fillArray('pressure_2_text1_tp',langContent.pressure.activity2.text1)
  fillArray('pressure_2_text2_tp',langContent.pressure.activity2.text2)
}
function changeLang_pascal(langContent) {
  document.getElementById('pascal_info1').innerHTML = langContent.pascal.info1
  fillArray('pascal_1_text1_tp',langContent.pascal.activity1.text1)
  fillArray('pascal_1_text2_tp',langContent.pascal.activity1.text2)

  // fillArray('pressure_2_text1_tp',langContent.pressure.activity2.text1)
  // fillArray('pressure_2_text2_tp',langContent.pressure.activity2.text2)
}
function changeLang_hydraulicPress(langContent) {
  document.getElementById('hydraulicPress_info1').innerHTML = langContent.hydraulicPress.info1
  fillArray('hydraulicPress_1_text1_tp',langContent.hydraulicPress.activity1.text1)
  fillArray('hydraulicPress_1_text2_tp',langContent.hydraulicPress.activity1.text2)
  fillArray('hydraulicPress_1_text3_tp',langContent.hydraulicPress.activity1.text3)
}
function changeLang_archimedes(langContent) {
  document.getElementById('archimedes_info1').innerHTML = langContent.archimedes.info1
  document.getElementById('archimedes_info2').innerHTML = langContent.archimedes.info2
  fillArray('archimedes_1_text1_tp',langContent.archimedes.activity1.text1)
  fillArray('archimedes_1_text2_tp',langContent.archimedes.activity1.text2)
  fillArray('archimedes_1_text3_tp',langContent.archimedes.activity1.text3)
  fillArray('archimedes_1_text4_tp',langContent.archimedes.activity1.text4)
  fillArray('archimedes1_tag_',langContent.archimedes.activity1.labels)
  fillArray('archimedes_2_text1_tp',langContent.archimedes.activity2.text1)
  fillArray('archimedes_3_text1_tp',langContent.archimedes.activity3.text1)
  fillArray('archimedes_3_text2_tp',langContent.archimedes.activity3.text2)
}