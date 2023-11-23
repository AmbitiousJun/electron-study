// 当 DOM 文档加载完成的时候，往页面中添加版本号
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const elm = document.getElementById(selector)
    if (elm) elm.innerText = text
  }
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})