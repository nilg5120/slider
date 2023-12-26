window.onload = function() {
    updatePercentageTextOnly();
};

function addSlider() {
    var sliderContainer = document.createElement('div');
    var sliderLabel = document.createElement('label');
    var slider = document.createElement('input');
    var probabilityValue = document.createElement('span');
    var percentageText = document.createElement('span');

    slider.type = 'range';
    slider.name = 'probability';
    slider.min = '0';
    slider.max = '100';
    slider.value = '50';

    slider.oninput = function() {
        probabilityValue.textContent = this.value + '%';
        updatePercentageTextOnly();
    };

    sliderLabel.textContent = 'Probability: ';
    probabilityValue.textContent = slider.value + '%';

    percentageText.textContent = ` (${slider.value}% of total)`;

    sliderLabel.appendChild(probabilityValue);
    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(percentageText);
    document.getElementById('sliders').appendChild(sliderContainer);

    updatePercentageTextOnly();
}

function updatePercentageTextOnly() {
    var sliders = document.getElementsByName('probability');
    var totalValue = 0;

    for (var i = 0; i < sliders.length; i++) {
        totalValue += parseInt(sliders[i].value, 10);
    }

    for (var i = 0; i < sliders.length; i++) {
        var slider = sliders[i];
        var value = parseInt(slider.value, 10);
        var percentageOfTotal = (value / totalValue) * 100;

        var percentageTextElement = slider.nextSibling;
        while (percentageTextElement && percentageTextElement.nodeType !== 1) {
            percentageTextElement = percentageTextElement.nextSibling;
        }
        
        if (percentageTextElement) {
            percentageTextElement.textContent = ` (${percentageOfTotal.toFixed(2)}% of total)`;
        } else {
            console.error('Cannot find the element to update the percentage text.');
        }
    }
}
