describe("../evaluationProjects/virtual-dom/vnode/is-widget.js:3:1:5:1", () => {
  test("invoc-loc:18:9:18:23-test:0", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
    var h = require("../h.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
    var render = require("../vdom/create-element.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/update-widget.js:1:1:1:47
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:9:5:9:27
    var leftTree = h("div");
    var createElement = render;
    var vnode = leftTree;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:1", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
    var h = require("../h.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
    var render = require("../vdom/create-element.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/update-widget.js:1:1:1:47
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:27:5:33:6
    var leftTree = h("div", {
            attributes: {
                a: "1",
                b: "2",
                c: "3"
            }
        });
    var createElement = render;
    var vnode = leftTree;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:2", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
    var h = require("../h.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
    var render = require("../vdom/create-element.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/update-widget.js:1:1:1:47
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:55:5:61:6
    var leftTree = h("div", {
            attributes: {
                a: "1",
                b: "2",
                c: "3"
            }
        });
    var createElement = render;
    var vnode = leftTree;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });
});

