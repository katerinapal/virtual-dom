describe(
  "../evaluationProjects/virtual-dom/vdom/apply-properties.js:6:1:27:1",
  () => {
    test("invoc-loc:34:5:34:32-test:0", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:5:1:5:45
      var isVNode = require("../vnode/is-vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:6:1:6:45
      var isVText = require("../vnode/is-vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:1:1:1:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
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
          }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:22:12:27:5
      if (!isVNode(vnode)) {
              if (warn) {
                  warn("Item is not a valid virtual dom node", vnode)
              }
              return null
          }var opts = null;
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
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:1:1:1:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
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
          }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:22:12:27:5
      if (!isVNode(vnode)) {
              if (warn) {
                  warn("Item is not a valid virtual dom node", vnode)
              }
              return null
          }var opts = null;
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

    test("invoc-loc:34:5:34:32-test:2", () => {
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:5:1:5:45
      var isVNode = require("../vnode/is-vnode.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:6:1:6:45
      var isVText = require("../vnode/is-vtext.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:8:1:8:53
      var handleThunk = require("../vnode/handle-thunk.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:1:1:1:41
      var document = require("global/document");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch.js:4:1:4:40
      var render = require("../vdom/create-element.js");
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/patch-op.js:1:1:1:51
      var applyProperties = require("../vdom/apply-properties.js");
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
          }///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:22:12:27:5
      if (!isVNode(vnode)) {
              if (warn) {
                  warn("Item is not a valid virtual dom node", vnode)
              }
              return null
          }var opts = null;
      var createElement = render;
      ///home/katerina/visualStudioGit/evaluationProjects/virtual-dom/vdom/create-element.js:39:9:39:56
      var childNode = createElement(children, undefined);
      var vnode = children;
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
  }
);

