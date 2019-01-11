const templateEngine = function (template, data = {}) {
    let placeHolderRegex = /{{(.+?)}}/g;
    let syntaxRegex = /^\s*(if|else|while|for|switch|case|break|{|})(.*)?/;
    let match;
    let starter = 0;
    let scripts = ['let template = [];\n'];
    let scriptsEnd = 'return template.join("");';
    let keys = Object.keys(data);
    let inLoop = false;
    while (match = placeHolderRegex.exec(template)) {
        let [whole, content] = match;
        let index = match.index;
        let tpl = template.slice(starter, index).replace(/[\t\s\n]+/g, '').replace(/('|")/g, '\\$1');
        tpl !== '' && scripts.push(`template.push('${tpl}');\n`);
        if (syntaxRegex.test(content)) {
            let sentence = content.trim();
            for (let key of keys) {
                if (sentence.includes(key)) {
                    sentence = sentence.replace(new RegExp(`(\\b${key}\\b)`), 'this.$1');
                }
            }
            if (sentence.includes('for') || sentence.includes('while')) inLoop = true;
            if (sentence.includes('}')) inLoop = false;
            scripts.push(`${sentence}\n `);
        } else {
            content = content.trim();
            scripts.push(`template.push(${ inLoop ? `${content}`: `this.${content}` });\n `);
        }
        starter = index + whole.length;
    }
    scripts.push(scriptsEnd);
    // console.log(scripts.join(''));
    return new Function(scripts.join('')).call(data);
};

let res = templateEngine(`
    <div>
        'hello world!'
        <p> {{ name }} </p>
        <p> {{ test.val.v }} </p>
        <ul>
            {{ for (let skill of skills) { }}
            <li>{{ skill }}</li>
            {{ } }}
        </ul>
        {{ if (show) { }}
        <div> hi! </div>
        {{ } else { }}
        <div> bye! </div>
        {{ } }}
    </div>
`, {
    name: 'zhangxiang',
    test: {
        val: {
            v: 1
        }
    },
    skills: ['frontend', 'backend', 'more'],
    show: false
});

console.log(res);