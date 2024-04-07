describe(
  "../evaluationProjects/virtual-dom/vnode/handle-thunk.js:8:1:24:1",
  () => {
    test("invoc-loc:16:13:16:30-test:0", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:2:1:2:37
      var VNode = require("../vnode/vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:37
      var VText = require("../vnode/vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:10:5:17:5
      var leftThunk = {
              type: "Thunk",
              render: function () {
                  return new VNode("div", {
                      className:"test"
                  }, [new VText("Left")])
              }
          };
      var createElement = render;
      var vnode = {
              type: "Thunk",
              render: function () {
                  return new VNode("div", {
                      className:"test"
                  }, [new VText("Left")])
              }
          };
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("div");
      expect(actualResult.a.properties.className).toBe("test");
      expect(actualResult.a.properties.className).toBe("test");
      expect(actualResult.a.children["0"].text).toBe("Left");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(1);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.hooks).toBe(undefined);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:1", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      var opts = null;
      var createElement = render;
      var children = {
          text: "Left"
      };
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children, undefined);
      var vnode = children;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.text).toBe("Left");
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:2", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:2:1:2:37
      var VNode = require("../vnode/vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:3:1:3:37
      var VText = require("../vnode/vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:37:5:52:6
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
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("div");
      expect(actualResult.a.properties.className).toBe("parent-node");
      expect(actualResult.a.properties.className).toBe("parent-node");
      expect(actualResult.a.children["0"].tagName).toBe("div");
      expect(actualResult.a.children["0"].key).toBe(undefined);
      expect(actualResult.a.children["0"].namespace).toBe(null);
      expect(actualResult.a.children["0"].count).toBe(0);
      expect(actualResult.a.children["0"].hasWidgets).toBe(false);
      expect(actualResult.a.children["0"].hasThunks).toBe(false);
      expect(actualResult.a.children["0"].hooks).toBe(undefined);
      expect(actualResult.a.children["0"].descendantHooks).toBe(false);
      expect(actualResult.a.children["1"].text).toBe("test");
      expect(actualResult.a.children["2"].type).toBe("Thunk");
      expect(actualResult.a.children["2"].type).toBe("Thunk");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(5);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(true);
      expect(actualResult.a.hooks).toBe(undefined);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:3", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      var opts = null;
      var createElement = render;
      var children = {
          tagName: "div",
          properties: {},
          children: {},
          key: undefined,
          namespace: null,
          count: 0,
          hasWidgets: false,
          hasThunks: false,
          hooks: undefined,
          descendantHooks: false
      };
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children, undefined);
      var vnode = children;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("div");
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

