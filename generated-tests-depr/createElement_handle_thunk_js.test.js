describe(
  "../evaluationProjects/virtual-dom/vnode/handle-thunk.js:8:1:24:1",
  () => {
    test("invoc-loc:16:13:16:30-test:0", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:344:1:344:37
      var VNode = require("../vnode/vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:345:1:345:37
      var VText = require("../vnode/vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:10:5:17:5
      var leftThunk = {
              type: "Thunk",
              render: function () {
                  return new VNode("div", {
                      className:"test"
                  }, [new VText("Left")])
              }
          };
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
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[0], undefined);
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.text).toBe("Left");
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:2", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:344:1:344:37
      var VNode = require("../vnode/vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:345:1:345:37
      var VText = require("../vnode/vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
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
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[0], undefined);
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

    test("invoc-loc:16:13:16:30-test:4", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[1], undefined);
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.text).toBe("test");
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:5", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[2], undefined);
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

    test("invoc-loc:16:13:16:30-test:6", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[0], undefined);
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.text).toBe("Left");
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:7", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[3], undefined);
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

    test("invoc-loc:16:13:16:30-test:8", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[4], undefined);
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.text).toBe("test");
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:9", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:86:5:86:27
      var leftTree = h("div");
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

    test("invoc-loc:16:13:16:30-test:10", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:104:5:110:6
      var leftTree = h("div", {
              attributes: {
                  a: "1",
                  b: "2",
                  c: "3"
              }
          });
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

    test("invoc-loc:16:13:16:30-test:11", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:132:5:138:6
      var leftTree = h("div", {
              attributes: {
                  a: "1",
                  b: "2",
                  c: "3"
              }
          });
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

    test("invoc-loc:16:13:16:30-test:12", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:158:1:158:77
      var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:167:5:167:55
      var hook1 = attributeHook("http://ns.com/my", 'first value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:171:5:171:48
      var first = h('div', {'myns:myattr': hook1});
      var vnode = second;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.properties["myns:myattr"].namespace).toBe("http://ns.com/my");
      expect(actualResult.a.properties["myns:myattr"].value).toBe("first value");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:13", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:198:5:201:5
      var OtherHook = function(namespace, value) {
              this.namespace = "http://ns.com/my"
              this.value = "the value"
          };
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:204:5:204:53
      var hook1 = new OtherHook("http://ns.com/my", 'the value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:207:5:207:48
      var first = h('div', {'myns:myattr': hook1});
      var vnode = first;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.properties["myns:myattr"].namespace).toBe("http://ns.com/my");
      expect(actualResult.a.properties["myns:myattr"].value).toBe("the value");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.hooks).toBe(undefined);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:14", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:158:1:158:77
      var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:223:5:223:62
      var hook1 = attributeHook('http://other.ns/', 'the value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:226:5:226:48
      var first = h('div', {'myns:myattr': hook1});
      var vnode = first;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.properties["myns:myattr"].namespace).toBe("http://other.ns/");
      expect(actualResult.a.properties["myns:myattr"].value).toBe("the value");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });

    test("invoc-loc:16:13:16:30-test:15", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:158:1:158:77
      var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:248:5:248:53
      var hook1 = attributeHook("http://ns.com/my", 'the value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:251:5:251:48
      var first = h('div', {'myns:myattr': hook1});
      var vnode = first;
      var arg0 = vnode;
      var actualResult = handleThunk(arg0);
      expect(actualResult.a.tagName).toBe("DIV");
      expect(actualResult.a.properties["myns:myattr"].namespace).toBe("http://ns.com/my");
      expect(actualResult.a.properties["myns:myattr"].value).toBe("the value");
      expect(actualResult.a.key).toBe(undefined);
      expect(actualResult.a.namespace).toBe(null);
      expect(actualResult.a.count).toBe(0);
      expect(actualResult.a.hasWidgets).toBe(false);
      expect(actualResult.a.hasThunks).toBe(false);
      expect(actualResult.a.descendantHooks).toBe(false);
      expect(actualResult.b).toBe(undefined);
    });
  }
);

