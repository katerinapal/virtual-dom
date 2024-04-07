describe("../evaluationProjects/virtual-dom/vnode/is-widget.js:3:1:5:1", () => {
  test("invoc-loc:18:9:18:23-test:0", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:1", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    var opts = null;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children[0], undefined);
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:2", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:3", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    var opts = null;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children[0], undefined);
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:4", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    var opts = null;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children[1], undefined);
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:5", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:6", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    var opts = null;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children[0], undefined);
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:7", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    var opts = null;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children[3], undefined);
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:8", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    var opts = null;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
    var childNode = createElement(children[4], undefined);
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:9", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
    var h = require("../h.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
    var createElement = require("../create-element.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:86:5:86:27
    var leftTree = h("div");
    var vnode = leftTree;
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:10", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:11", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:12", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:13", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:14", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });

  test("invoc-loc:18:9:18:23-test:15", () => {
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
    var handleThunk = require("../vnode/handle-thunk.js");
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/virtual-hyperscript/index.js:9:1:9:44
    var isWidget = require("../vnode/is-widget.js");
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
    ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:16:5:16:32
    vnode = handleThunk(vnode).a;
    var arg0 = vnode;
    var actualResult = isWidget(arg0);
    var expectedResult = false;
    expect(expectedResult).toBe(actualResult);
  });
});

