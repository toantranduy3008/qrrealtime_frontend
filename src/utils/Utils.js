const arrayColor = [
    "blue", "red", "purple", "orange", "lime", "violet", "green", "chocolate",
        "blueviolet",
        "brown", "cadetblue", "chartreuse", "coral", "cornflowerblue", "crimson", "darkblue",
        "darkcyan", "darkgoldenrod", "darkgreen", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred",
        "darkslateblue", "darkslategray", "darkviolet", "deeppink", "forestgreen", "fuchsia", "goldenrod", "indianred",
        "indigo", "lightcoral", "limegreen", "magenta", "maroon", "mediumblue", "midnightblue", "navy", "olive",
        "olivedrab", "orangered", "orchid", "peru", "royalblue", "saddlebrown", "salmon", "sandybrown",
        "seagreen", "sienna", "steelblue", "teal", "tan", "tomato"
]

class Utils {
    numberWithCommas(x) {
        if(x === 0) {
            return 0;
        }

        if (typeof x == 'number') {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
            return x;
        }

    }

    stringNumberWithCommas(x) {
        return x.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    random_rgba() {
        var o = Math.round, r = Math.random, s = 60;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }

    // randomColorInArray() {
    //     return arrayColor[Math.floor(Math.random() * arrayColor.length)];
    // }

    getColorByIndex(index) {
        return arrayColor[index%arrayColor.length];
    }
}

export default new Utils();