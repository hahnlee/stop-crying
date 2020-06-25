const pattern = /ㅠ/g
const replacement = ''

function replaceInText(element) {
  for (let node of element.childNodes) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE: {
        replaceInText(node)
        break
      }

      case Node.TEXT_NODE: {
        // NOTE: test하지 않고 무조건 replace를 하면 input이 이상하게 동작함
        if (pattern.test(node.textContent)) {
          node.textContent = node.textContent.replace(pattern, replacement)
        }
        break
      }

      case Node.DOCUMENT_NODE: {
        replaceInText(node)
        break
      }
    }
  }
}

replaceInText(document.body)

function removeNewNode(mutationList) {
  mutationList.forEach((mutation) => {
    switch(mutation.type) {
      case 'childList':
        replaceInText(mutation.target)
        break;
    }
  })
}

const observer = new MutationObserver(removeNewNode)

observer.observe(document.body, {
  childList: true,
  attributes: false,
  subtree: true,
})
