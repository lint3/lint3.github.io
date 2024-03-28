class QuerySubstring {
    constructor() {
        this._s = '';
        this._depth = 0;
    }
    get result() {
        return this._s;
    }
    
    addLine(line) {
        this._s += "\n" + ('    '.repeat(this._depth)) + line;
    }
    
    addLineIndent(line) {
        this.increaseDepth();
        this.addLine(line);
        this.decreaseDepth();
    }
    
    increaseDepth() {
        this._depth += 1;
    }
    
    decreaseDepth() {
        this._depth -= 1;
    }
    
    clear() {
        this._depth = 0;
        this._s = '';
    }
}
    



function parseStructureToQueryString(group, q) {
    
    // Bases: Requirements
    if (group.classList.contains('requirement-tag')) {
        q.addLine(parseRequirementTag(group));
    } else if (group.classList.contains('requirement-some-other-example')) {
        // pass
    }
    
    // Recurse: Group
    if (group.classList.contains('group-logical')) {
        q.addLine('(');
        q.increaseDepth();
        for (child of group.children) {
            parseStructureToQueryString(child, q);
        }
        q.decreaseDepth();
        q.addLine(');');
    } else if (group.classList.contains('group-some-other-example')) {
        // pass
    }
}

function parseRequirementTag(group) {
    var result = "";
    // TODO: nwr
    result += 'nwr["' + group.querySelector('input[name="key"]').value + '"';
    // TODO: Equality type
    result += '=';
    result += '"' + group.querySelector('input[name="value"]').value + '"' + ']';
    
    return result;
}