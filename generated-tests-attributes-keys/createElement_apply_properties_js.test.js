describe(
  "../evaluationProjects/virtual-dom/vdom/apply-properties.js:6:1:27:1",
  () => {
    test("invoc-loc:34:5:34:32-test:0", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:1:1:1:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:9:5:9:27
      var leftTree = h("div");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var createElement = render;
      var vnode = leftTree;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
      vnode = handleThunk(vnode).a;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:29:5:31:59
      var node = (vnode.namespace === null) ?
              doc.createElement(vnode.tagName) :
              doc.createElementNS(vnode.namespace, vnode.tagName);
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:33:5:33:32
      var props = vnode.properties;
      var arg0 = node;
      var arg1 = props;
      var actualResult = applyProperties(arg0, arg1);
      var expectedResult = undefined;
      expect(expectedResult).toBe(actualResult);
    });

    test("invoc-loc:34:5:34:32-test:1", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:1:1:1:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:27:5:33:6
      var leftTree = h("div", {
              attributes: {
                  a: "1",
                  b: "2",
                  c: "3"
              }
          });
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var createElement = render;
      var vnode = leftTree;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
      vnode = handleThunk(vnode).a;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:29:5:31:59
      var node = (vnode.namespace === null) ?
              doc.createElement(vnode.tagName) :
              doc.createElementNS(vnode.namespace, vnode.tagName);
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:33:5:33:32
      var props = vnode.properties;
      var arg0 = node;
      var arg1 = props;
      var actualResult = applyProperties(arg0, arg1);
      var expectedResult = undefined;
      expect(expectedResult).toBe(actualResult);
    });

    test("invoc-loc:34:5:34:32-test:2", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:1:1:1:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:55:5:61:6
      var leftTree = h("div", {
              attributes: {
                  a: "1",
                  b: "2",
                  c: "3"
              }
          });
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var createElement = render;
      var vnode = leftTree;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
      vnode = handleThunk(vnode).a;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:29:5:31:59
      var node = (vnode.namespace === null) ?
              doc.createElement(vnode.tagName) :
              doc.createElementNS(vnode.namespace, vnode.tagName);
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:33:5:33:32
      var props = vnode.properties;
      var arg0 = node;
      var arg1 = props;
      var actualResult = applyProperties(arg0, arg1);
      var expectedResult = undefined;
      expect(expectedResult).toBe(actualResult);
    });
  }
);

