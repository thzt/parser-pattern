class SyntaxTree {
    constructor(type, value, children) {
        const tree = this;
        tree.type = type;
        tree.children = children;
        tree.value = value
    }

    addSubTree(child) {
        const tree = this;
        const { children } = tree;

        children.push(child);
        return tree;
    }

    _toJSON() {
        const tree = this;
        const { type, value, children } = tree;

        const json = {
            type
        };

        value != null && (json.value = value);
        children != null && (json.children = children.map(child => tree._toJSON.call(child)));
        return json;
    }

    toString() {
        const tree = this;
        const json = tree._toJSON();
        return JSON.stringify(json, null, 4);
    }
}

export default SyntaxTree;