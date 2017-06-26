module.exports = {
    "asset-type": {
        "severity": "warning"
    },
    "attr-lowercase": {
        "severity": "error" //属性小写
    },
    "attr-no-duplication": {
        "severity": "error"
    },
    "attr-value-double-quotes": {
        "severity": "error" //属性重复
    },
    "bool-attribute-value": {
        "severity": "warning"
    },
    "button-name": {
        "severity": "warning"
    },
    "button-type": {
        "severity": "error" //设置按钮类型
    },
    "charset": {
        "severity": "warning"
    },
    "css-in-head": {
        "severity": "warning"
    },
    "doctype": {
        "severity": "warning"
    },
    "html-lang": {
        "severity": "warning"
    },
    "ie-edge": {
        "severity": "warning"
    },
    "img-alt": {
        "severity": "warning"
    },
    "img-src": {
        "severity": "error"//禁止 img 的 src 取值为空。延迟加载的图片也要增加默认的 src。
    },
    "img-title": {
        "severity": "warning"
    },
    "img-width-height": {
        "severity": "warning"
    },
    "indent-char": {
        "severity": "error"//缩进
    },
    "lowercase-class-with-hyphen": {
        "severity": "warning"
    },
    "lowercase-id-with-hyphen": {
        "severity": "warning"
    },
    "nest": {
        "severity": "warning"
    },
    "rel-stylesheet": {
        "severity": "error"// true: Attribute "rel" of imported css (<link>) should be set as 
    },
    "script-content": {
        "severity": "warning"
    },
    "script-in-tail": {
        "severity": "error" // true: Js contents (script:not([type]), script[type="text/javascript"])
    },
    "self-close": {
        "severity": "error" // "no-close": Void tags should not close themeselves  with "/"对 HTML5 中规定可以省略的闭合标签，不允许省略闭合标签。对代码体积要求非常严苛的场景，可以例外。
    },
    "spec-char-escape": {
        "severity": "warning"
    },
    "style-content": {
        "severity": "warning"
    },
    "style-disabled": {
        "severity": "warning"
    },
    "tag-pair": {
        "severity": "warning"
    },
    "tagname-lowercase": {
        "severity": "error"//标签小写
    },
    "title-required": {
        "severity": "warning"
    },
    "unique-id": {
        "severity": "error"//id保持唯一
    },
    "no-duplication-id-and-name": {
        "severity": "error"//不能有重复的id和name
    },
    "viewport": {
        "severity": "warning"
    },
    "label-for-input": {
        "severity": "warning"
    },
    "no-meta-css": {
        "severity": "warning"
    }
};