'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToasts = exports.withToastManager = exports.ToastConsumer = exports.ToastProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactTransitionGroup = require('react-transition-group');

var _ToastController = require('./ToastController');

var _ToastContainer = require('./ToastContainer');

var _ToastElement = require('./ToastElement');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultComponents = { Toast: _ToastElement.DefaultToast, ToastContainer: _ToastContainer.ToastContainer };

// $FlowFixMe `createContext`
var ToastContext = _react2.default.createContext();
var Consumer = ToastContext.Consumer,
    Provider = ToastContext.Provider;


var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

// Provider
// ==============================

var ToastProvider = exports.ToastProvider = function (_Component) {
  _inherits(ToastProvider, _Component);

  function ToastProvider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ToastProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ToastProvider.__proto__ || Object.getPrototypeOf(ToastProvider)).call.apply(_ref, [this].concat(args))), _this), _this.state = { toasts: [] }, _this.add = function (content) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _utils.NOOP;

      var id = (0, _utils.generateUEID)();
      var callback = function callback() {
        return cb(id);
      };

      _this.setState(function (state) {
        var toasts = state.toasts.slice(0);
        var toast = Object.assign({}, { content: content, id: id }, options);

        toasts.push(toast);

        return { toasts: toasts };
      }, callback);
    }, _this.remove = function (id) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.NOOP;

      var callback = function callback() {
        return cb(id);
      };

      _this.setState(function (state) {
        var toasts = state.toasts.filter(function (t) {
          return t.id !== id;
        });
        return { toasts: toasts };
      }, callback);
    }, _this.onDismiss = function (id) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.NOOP;
      return function () {
        cb(id);
        _this.remove(id);
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ToastProvider, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          autoDismissTimeout = _props.autoDismissTimeout,
          children = _props.children,
          components = _props.components,
          placement = _props.placement,
          transitionDuration = _props.transitionDuration;

      var _defaultComponents$co = _extends({}, defaultComponents, components),
          Toast = _defaultComponents$co.Toast,
          ToastContainer = _defaultComponents$co.ToastContainer;

      var add = this.add,
          remove = this.remove;

      var toasts = Object.freeze(this.state.toasts);

      var hasToasts = Boolean(toasts.length);
      var portalTarget = canUseDOM ? document.body : null; // appease flow

      return _react2.default.createElement(
        Provider,
        { value: { add: add, remove: remove, toasts: toasts } },
        children,
        portalTarget ? (0, _reactDom.createPortal)(_react2.default.createElement(
          ToastContainer,
          { placement: placement, hasToasts: hasToasts },
          _react2.default.createElement(
            _reactTransitionGroup.TransitionGroup,
            { component: null },
            toasts.map(function (_ref2) {
              var appearance = _ref2.appearance,
                  autoDismiss = _ref2.autoDismiss,
                  content = _ref2.content,
                  id = _ref2.id,
                  onDismiss = _ref2.onDismiss,
                  unknownConsumerProps = _objectWithoutProperties(_ref2, ['appearance', 'autoDismiss', 'content', 'id', 'onDismiss']);

              return _react2.default.createElement(
                _reactTransitionGroup.Transition,
                {
                  appear: true,
                  key: id,
                  mountOnEnter: true,
                  timeout: transitionDuration,
                  unmountOnExit: true
                },
                function (transitionState) {
                  return _react2.default.createElement(
                    _ToastController.ToastController,
                    _extends({
                      appearance: appearance,
                      autoDismiss: autoDismiss,
                      autoDismissTimeout: autoDismissTimeout,
                      component: Toast,
                      key: id,
                      onDismiss: _this2.onDismiss(id, onDismiss),
                      placement: placement,
                      transitionDuration: transitionDuration,
                      transitionState: transitionState
                    }, unknownConsumerProps),
                    content
                  );
                }
              );
            })
          )
        ), portalTarget) : _react2.default.createElement(ToastContainer, { placement: placement, hasToasts: hasToasts }) // keep ReactDOM.hydrate happy

      );
    }
  }]);

  return ToastProvider;
}(_react.Component);

ToastProvider.defaultProps = {
  autoDismissTimeout: 5000,
  components: defaultComponents,
  placement: 'top-right',
  transitionDuration: 220
};
var ToastConsumer = exports.ToastConsumer = function ToastConsumer(_ref3) {
  var children = _ref3.children;
  return _react2.default.createElement(
    Consumer,
    null,
    function (context) {
      return children(context);
    }
  );
};

var withToastManager = exports.withToastManager = function withToastManager(Comp
// $FlowFixMe `forwardRef`
) {
  return _react2.default.forwardRef(function (props, ref) {
    return _react2.default.createElement(
      ToastConsumer,
      null,
      function (context) {
        return _react2.default.createElement(Comp, _extends({ toastManager: context }, props, { ref: ref }));
      }
    );
  });
};

var useToasts = exports.useToasts = function useToasts() {
  var ctx = (0, _react.useContext)(ToastContext);

  if (!ctx) {
    throw Error('The `useToasts` hook must be called from a descendent of the `ToastProvider`.');
  }

  return {
    addToast: ctx.add,
    removeToast: ctx.remove,
    toastStack: ctx.toasts
  };
};