const classifyProduct = r => {
    console.log(r);
    let name = "unknown", recyclable = null;
    if (r.length && r[0].classification.score > 0.7) {
        name = r[0].displayName;
        if (name === 'cheezeit') {
            recyclable = false;
        }
        else if (name === 'coke') {
            recyclable = true;
        }
    }
    return {name: name, recyclable: recyclable, original: r};
};

module.exports = classifyProduct;
