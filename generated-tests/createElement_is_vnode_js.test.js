describe("../evaluationProjects/virtual-dom/vnode/is-vnode.js:5:1:7:1", () => {
  test("invoc-loc:22:17:22:30-test:0", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:5:1:5:45
    var isVNode = require("../vnode/is-vnode.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:6:1:6:45
    var isVText = require("../vnode/is-vtext.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/update-widget.js:1:1:1:47
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:18:5:27:5
    if (isWidget(vnode)) {
            return vnode.init()
        } else if (isVText(vnode)) {
            return doc.createTextNode(vnode.text)
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode)
            }
            return null
        }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:20:12:27:5
    if (isVText(vnode)) {
            return doc.createTextNode(vnode.text)
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode)
            }
            return null
        }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isVNode(arg0);
    var expectedResult = true;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:22:17:22:30-test:1", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:2:1:2:37
    var VNode = require("../vnode/vnode.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:37
    var VText = require("../vnode/vtext.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:5:1:5:45
    var isVNode = require("../vnode/is-vnode.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:6:1:6:45
    var isVText = require("../vnode/is-vtext.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
    var render = require("../vdom/create-element.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/update-widget.js:1:1:1:47
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:18:5:27:5
    if (isWidget(vnode)) {
            return vnode.init()
        } else if (isVText(vnode)) {
            return doc.createTextNode(vnode.text)
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode)
            }
            return null
        }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:20:12:27:5
    if (isVText(vnode)) {
            return doc.createTextNode(vnode.text)
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode)
            }
            return null
        }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:37:5:52:6
    var leftNode = new VNode("div", {
            className: "parent-node"
        }, [
            new VNode("div"),
            new VText("test"),
            {
                type: "Thunk",
                render: function () {
                    return new VNode("div", {
                        className:"test"
                    }, [new VText("Left")])
                }
            },
            new VNode("div"),
            new VText("test")
        ]);
    var createElement = render;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:71:5:71:38
    var root = createElement(leftNode);
    var vnode = leftNode;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isVNode(arg0);
    var expectedResult = true;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:22:17:22:30-test:2", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:5:1:5:45
    var isVNode = require("../vnode/is-vnode.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:6:1:6:45
    var isVText = require("../vnode/is-vtext.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
    var render = require("../vdom/create-element.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/update-widget.js:1:1:1:47
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:18:5:27:5
    if (isWidget(vnode)) {
            return vnode.init()
        } else if (isVText(vnode)) {
            return doc.createTextNode(vnode.text)
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode)
            }
            return null
        }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:20:12:27:5
    if (isVText(vnode)) {
            return doc.createTextNode(vnode.text)
        } else if (!isVNode(vnode)) {
            if (warn) {
                warn("Item is not a valid virtual dom node", vnode)
            }
            return null
        }var opts = null;
    var createElement = render;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children, undefined);
    var vnode = children;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isVNode(arg0);
    var expectedResult = true;
    expect(expectedResult).toBe(actualResult);
  });
});

