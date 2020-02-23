const recycle_data = [
    {displayName: 'cheezeit', actualName: 'Cheez-It Wrapper', recyclable: false, type: false},
    {displayName: 'goldfish', actualName: 'Goldfish Wrapper', recyclable: false, type: false},
    {displayName: 'lays', actualName: 'Lays Wrapper', recyclable: false, type: false},
    {displayName: 'coke', actualName: 'Coca-Cola Can', recyclable: true, type: false},
    {displayName: 'dietcoke', actualName: 'Diet Coca-Cola Can', recyclable: true, type: false},
    {displayName: 'sprite', actualName: 'Sprite Can', recyclable: true, type: false},
    {displayName: 'arizonatea', actualName: 'Arizona Ice Tea Can', recyclable: true, type: false},
    {displayName: 'drpepper', actualName: 'Dr. Pepper Can', recyclable: true, type: false},
    {displayName: 'gatorade', actualName: 'Gatorade Bottle', recyclable: true, type: false},
    {displayName: 'redbull', actualName: 'Red Bull Can', recyclable: true, type: false},
    {displayName: 'welch', actualName: 'Welch\'s Wrapper', recyclable: false, type: false},
    {displayName: 'mnms', actualName: 'M&M\'s Wrapper', recyclable: false, type: false}
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
