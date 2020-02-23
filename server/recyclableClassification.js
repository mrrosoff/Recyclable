const recycle_data = [
    {displayName: 'cheezeit', actualName: 'Cheez-It Wrapper', recyclable: false},
    {displayName: 'goldfish', actualName: 'Goldfish Wrapper', recyclable: false},
    {displayName: 'lays', actualName: 'Lays Wrapper', recyclable: false},
    {displayName: 'coke', actualName: 'Coca-Cola Can', recyclable: true},
    {displayName: 'dietcoke', actualName: 'Diet Coca-Cola Can', recyclable: true},
    {displayName: 'sprite', actualName: 'Sprite Can', recyclable: true},
    {displayName: 'arizonatea', actualName: 'Arizona Ice Tea Can', recyclable: true},
    {displayName: 'drpepper', actualName: 'Dr. Pepper Can', recyclable: true},
    {displayName: 'gatorade', actualName: 'Gatorade Bottle', recyclable: true},
    {displayName: 'redbull', actualName: 'Red Bull Can', recyclable: true},
    {displayName: 'welch', actualName: 'Welch\'s Wrapper', recyclable: false},
    {displayName: 'mnms', actualName: 'M&M\'s Wrapper', recyclable: false}
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
