describe(
  "../evaluationProjects/virtual-dom/vnode/handle-thunk.js:8:1:24:1",
  () => {
    test("invoc-loc:16:13:16:30-test:0", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:9:5:9:27
      var leftTree = h("div");
      var createElement = render;
      var vnode = leftTree;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.hooks).toBe(undefined);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:1", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
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
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.properties.attributes.a).toBe("1");
      expect(actualResult.a.properties.attributes.b).toBe("2");
      expect(actualResult.a.properties.attributes.c).toBe("3");
      expect(actualResult.a.properties.attributes.a).toBe("1");
      expect(actualResult.a.properties.attributes.b).toBe("2");
      expect(actualResult.a.properties.attributes.c).toBe("3");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.hooks).toBe(undefined);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:2", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vtree/diff.js:8:1:8:50
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
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
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.properties.attributes.a).toBe("1");
      expect(actualResult.a.properties.attributes.b).toBe("2");
      expect(actualResult.a.properties.attributes.c).toBe("3");
      expect(actualResult.a.properties.attributes.a).toBe("1");
      expect(actualResult.a.properties.attributes.b).toBe("2");
      expect(actualResult.a.properties.attributes.c).toBe("3");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.hooks).toBe(undefined);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });
  }
);

