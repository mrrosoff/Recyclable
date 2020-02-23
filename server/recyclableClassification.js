const recycle_data = [
    {displayName: 'cheezeit', actualName: 'Cheez-It wrapper', recyclable: false},
    {displayName: 'goldfish', actualName: 'Goldfish wrapper', recyclable: false},
    {displayName: 'lays', actualName: 'Lays wrapper', recyclable: false},
    {displayName: 'coke', actualName: 'Coca-Cola can', recyclable: true},
    {displayName: 'dietcoke', actualName: 'Diet Coca-Cola can', recyclable: true},
    {displayName: 'sprite', actualName: 'Sprite can', recyclable: true},
    {displayName: 'arizonatea', actualName: 'Arizona Tea can', recyclable: true},
    {displayName: 'drpepper', actualName: 'Dr Pepper can', recyclable: true},
    {displayName: 'gatorade', actualName: 'Gatorade can', recyclable: true},
    {displayName: 'redbull', actualName: 'Red Bull can', recyclable: true},
    {displayName: 'welch', actualName: 'Welch\'s wrapper', recyclable: false},
    {displayName: 'mnms', actualName: 'M&M\'s wrapper', recyclable: false}
];

const classifyProduct = r => {
    console.log(r);
    let name = "unknown", recyclable = null;
    if (r.length && r[0].classification.score > 0.7) {
        name = r[0].displayName;
        entry = recycle_data.filter(a => a.displayName === name);
        if (entry.length === 1) {
            name = entry[0].actualName;
            recyclable = entry[0].recyclable;
        }
    }
    return {name: name, recyclable: recyclable, original: r};
};

module.exports = classifyProduct;
