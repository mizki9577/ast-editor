// https://github.com/facebook/flux/issues/351#issuecomment-243175376
export default containerClass => {
  const tmp = containerClass
  containerClass = function(...args) {
    return new tmp(...args)
  }
  containerClass.prototype = tmp.prototype
  containerClass.getStores = tmp.getStores
  containerClass.calculateState = tmp.calculateState
  return containerClass
}
// vim: set ts=2 sw=2 et:
