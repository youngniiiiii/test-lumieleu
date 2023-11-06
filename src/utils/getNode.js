export function getNode(selector, context = document) {
  return context.querySelector(selector);
}

export function getNodeList(selector, context = document) {
  return context.querySelectorAll(selector);
}