"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

const Promise = require(`bluebird`);

const HJSON = require(`hjson`);

const _require = require(`../gatsby-node`),
      onCreateNode = _require.onCreateNode;

describe(`Process HJSON nodes correctly`, () => {
  const node = {
    name: `nodeName`,
    id: `whatever`,
    parent: `SOURCE`,
    children: [],
    internal: {
      contentDigest: `whatever`,
      mediaType: `application/hjson`,
      name: `test`
    } // Make some fake functions its expecting.

  };

  const loadNodeContent = node => Promise.resolve(node.content);

  it(`correctly creates nodes from HJSON which is an array of objects`,
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(function* () {
    const data = [{
      id: `foo`,
      blue: true,
      funny: `yup`
    }, {
      blue: false,
      funny: `nope`
    }];
    node.content = HJSON.stringify(data);
    const createNode = jest.fn();
    const createParentChildLink = jest.fn();
    const actions = {
      createNode,
      createParentChildLink
    };
    const createNodeId = jest.fn();
    createNodeId.mockReturnValue(`uuid-from-gatsby`);
    yield onCreateNode({
      node,
      loadNodeContent,
      actions,
      createNodeId
    }).then(() => {
      expect(createNode.mock.calls).toMatchSnapshot();
      expect(createParentChildLink.mock.calls).toMatchSnapshot();
      expect(createNode).toHaveBeenCalledTimes(2);
      expect(createParentChildLink).toHaveBeenCalledTimes(2);
    });
  }));
  it(`correctly creates a node from HJSON which is a single object`,
  /*#__PURE__*/
  (0, _asyncToGenerator2.default)(function* () {
    const data = {
      id: `foo`,
      blue: true,
      funny: `yup`
    };
    node.content = HJSON.stringify(data);
    node.dir = `/tmp/foo/`;
    const createNode = jest.fn();
    const createParentChildLink = jest.fn();
    const actions = {
      createNode,
      createParentChildLink
    };
    const createNodeId = jest.fn();
    createNodeId.mockReturnValue(`uuid-from-gatsby`);
    yield onCreateNode({
      node,
      loadNodeContent,
      actions,
      createNodeId
    }).then(() => {
      expect(createNode.mock.calls).toMatchSnapshot();
      expect(createParentChildLink.mock.calls).toMatchSnapshot();
      expect(createNode).toHaveBeenCalledTimes(1);
      expect(createParentChildLink).toHaveBeenCalledTimes(1);
    });
  }));
});