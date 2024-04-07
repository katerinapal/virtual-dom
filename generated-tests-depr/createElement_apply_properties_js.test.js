describe(
  "../evaluationProjects/virtual-dom/vdom/apply-properties.js:6:1:27:1",
  () => {
    test("invoc-loc:34:5:34:32-test:0", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:344:1:344:37
      var VNode = require("../vnode/vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:345:1:345:37
      var VText = require("../vnode/vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
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
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var vnode = leftNode;
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
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[0], undefined);
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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

    test("invoc-loc:34:5:34:32-test:3", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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

    test("invoc-loc:34:5:34:32-test:4", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children[3], undefined);
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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

    test("invoc-loc:34:5:34:32-test:5", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:86:5:86:27
      var leftTree = h("div");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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

    test("invoc-loc:34:5:34:32-test:6", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:104:5:110:6
      var leftTree = h("div", {
              attributes: {
                  a: "1",
                  b: "2",
                  c: "3"
              }
          });
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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

    test("invoc-loc:34:5:34:32-test:7", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:132:5:138:6
      var leftTree = h("div", {
              attributes: {
                  a: "1",
                  b: "2",
                  c: "3"
              }
          });
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
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

    test("invoc-loc:34:5:34:32-test:8", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:158:1:158:77
      var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:167:5:167:55
      var hook1 = attributeHook("http://ns.com/my", 'first value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:171:5:171:48
      var first = h('div', {'myns:myattr': hook1});
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var vnode = second;
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

    test("invoc-loc:34:5:34:32-test:9", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:198:5:201:5
      var OtherHook = function(namespace, value) {
              this.namespace = "http://ns.com/my"
              this.value = "the value"
          };
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:204:5:204:53
      var hook1 = new OtherHook("http://ns.com/my", 'the value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:207:5:207:48
      var first = h('div', {'myns:myattr': hook1});
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var vnode = first;
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

    test("invoc-loc:34:5:34:32-test:10", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:158:1:158:77
      var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:223:5:223:62
      var hook1 = attributeHook('http://other.ns/', 'the value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:226:5:226:48
      var first = h('div', {'myns:myattr': hook1});
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var vnode = first;
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

    test("invoc-loc:34:5:34:32-test:11", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:158:1:158:77
      var attributeHook = require("../virtual-hyperscript/hooks/attribute-hook.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:329:1:329:26
      var h = require("../h.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:347:1:347:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:349:1:349:48
      var createElement = require("../create-element.js");
      var opts = null;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:248:5:248:53
      var hook1 = attributeHook("http://ns.com/my", 'the value');
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/filtered-test-modules/virtual-dom-test-code-merged-entryfile.js:251:5:251:48
      var first = h('div', {'myns:myattr': hook1});
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:13:5:13:57
      var doc = opts ? opts.document || document : document;
      var vnode = first;
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

