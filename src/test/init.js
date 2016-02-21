/**
 * Function for init test application
 */
function init(idDiv, urlResources) {
    var testApp = new app.TestApp(idDiv, urlResources);

    var checkboxShowHTMLUIShowModel = rock.util.DOMUtils.getElementById('checkboxShowHTMLUIShowModel');
    rock.util.DOMUtils.addEventListener(checkboxShowHTMLUIShowModel, "change",onChangeCheckboxShowHTMLUIShowModel);

    var checkboxShowHTMLUIShowScene = rock.util.DOMUtils.getElementById('checkboxShowHTMLUIShowScene');
    rock.util.DOMUtils.addEventListener(checkboxShowHTMLUIShowScene, "change",onChangeCheckboxShowHTMLUIShowScene);
}

function onChangeCheckboxShowHTMLUIShowModel() {
    var checkboxShowHTMLUIShowModel = rock.util.DOMUtils.getElementById('checkboxShowHTMLUIShowModel');
    var divUIShowModel = rock.util.DOMUtils.getElementById('divUIShowModel');

    if (checkboxShowHTMLUIShowModel.checked) {
        divUIShowModel.className = 'visible';
    } else {
        divUIShowModel.className = 'hidden';
    }
}

function onChangeCheckboxShowHTMLUIShowScene() {
    var checkboxShowHTMLUIShowScene = rock.util.DOMUtils.getElementById('checkboxShowHTMLUIShowScene');
    var divUIShowScene = rock.util.DOMUtils.getElementById('divUIShowScene');

    if (checkboxShowHTMLUIShowScene.checked) {
        divUIShowScene.className = 'visible';
    } else {
        divUIShowScene.className = 'hidden';
    }
}