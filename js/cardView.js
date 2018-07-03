
export class CardView {
    constructor(card) {
        this.card = card;

        this.uiElement = $(`
            <div class="col-4 vertical-divider">
                <div class="col-content">
                    <div class="flip-container">
                        <div class="card" id="card_${this.card.label}">
                            <div class="front">
                                <img class="label-icon img-fluid" src="images/${this.card.label}.png"/>
                                <h4 class="label-name">${this.card.displayName}</h4>
                            </div>
                            <div class="back">
                                <div class="header">
                                    <span><img class="label-icon img-fluid" src="images/${this.card.label}_small.png"/></span>
                                    <h4>${this.card.displayName}</h4>
                                </div>

                                <!-- Loader animation -->
                                <div class="loader">
                                    <div class="sk-cube-grid">
                                        <div class="sk-cube sk-cube1"></div>
                                        <div class="sk-cube sk-cube2"></div>
                                        <div class="sk-cube sk-cube3"></div>
                                        <div class="sk-cube sk-cube4"></div>
                                        <div class="sk-cube sk-cube5"></div>
                                        <div class="sk-cube sk-cube6"></div>
                                        <div class="sk-cube sk-cube7"></div>
                                        <div class="sk-cube sk-cube8"></div>
                                        <div class="sk-cube sk-cube9"></div>
                                    </div>
                                </div>

                                <!-- Subfeature bar chart will be generated here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        this.backSide = this.uiElement.find(`#card_${this.card.label} .back`);
        this.frontSide = this.uiElement.find(`#card_${this.card.label} .front`);
    }
    
    showError() {
        this.backSide.append('<div>unavailable</div>');
        this.backSide.addClass('unavailable');
        this.frontSide.addClass('unavailable');
    }

    showData(data) {
        let label = this.card.label;
        let labelData = data.nutrition[label];
        let mainScore = Math.round(labelData.main_score);

        if (labelData.status != 'ok') {
            this.showError();
        } else {
            this.backSide.append(this.createHBar(mainScore, mainScore + '%', 'Overall ' + mainScore + '%'));
            this.backSide.append('<div class="main-score-spacer"></div>');
            
            let first = true;
            labelData.subfeatures.forEach(subfeature => {
                if (!first) {
                    this.backSide.append('<div class="subfeature-spacer"></div>');
                }
                first = false;

                // ellipsis (...) if subfeature name is too long (11 characters max)
                let shortName = subfeature.name.length < 12
                    ? subfeature.name
                    : subfeature.name.substring(0, 10) + '..';
                this.backSide.append(this.createHBar(subfeature.percentage, shortName + ': ' + Math.round(subfeature.value), subfeature.name));
            });
        }
    }

    /**
     * Creates a horizontal bar for displaying a **subfeature**.
     * @param {*} percentage bar fill
     * @param {*} text text inside the bar
     * @param {*} tooltip text shown on hover
     */
    createHBar(percentage, text, tooltip) {
        let hbar = $(`
            <div class='hbar'
                 style='background: linear-gradient(to right, #3a4b8b ${percentage}% , #ccc ${percentage}%);'
                 title='${tooltip}'>
                ${text}
            </div>
        `);
        hbar.tooltip();
        return hbar;
    }

}