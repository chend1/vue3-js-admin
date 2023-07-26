import { h, render } from 'vue';
import { ElMessage } from 'element-plus';
import ContextMenu from './index.vue';

let instance = null;
const div = document.createElement('div');
export const vContextmenu = {
  mounted: (el, binding) => {
    // 取消默认的浏览器自带右键菜单
    window.oncontextmenu = (e) => {
      e.preventDefault();
    };
    el.oncontextmenu = (e) => {
      const type = ['TEXTAREA', 'INPUT'];
      const targetEl = el.isContentEditable || type.indexOf(el.tagName) !== -1
        ? el
        : el.children[0] || el;
      const hidden = (type.indexOf(targetEl.tagName) !== -1 && targetEl.disabled)
        || (type.indexOf(targetEl.tagName) !== -1 && targetEl.readOnly)
        || (type.indexOf(targetEl.tagName) === -1 && !targetEl.isContentEditable);
      const defaultList = [
        {
          name: '复制',
          method: async () => {
            const text = getSelectionRange(targetEl);
            if (text) {
              try {
                navigator.clipboard.writeText(text);
              } catch (err) {
                ElMessage({
                  type: 'error',
                  message: '复制失败,仅支持localhost或https',
                });
                console.error(err);
              }
            }
          },
        },
        {
          name: '粘贴',
          method: async () => {
            let str = '';
            try {
              str = await navigator.clipboard.readText();
            } catch {
              ElMessage({
                type: 'error',
                message: '粘贴失败,仅支持localhost或https',
              });
            }
            const length = str ? str.length : 0;
            if (
              targetEl.tagName === 'TEXTAREA'
              || targetEl.tagName === 'INPUT'
            ) {
              const { selectionStart, selectionEnd } = getCursorRange(targetEl);
              const text = targetEl.value;
              str = text.slice(0, selectionStart) + str + text.slice(selectionEnd);
              targetEl.value = str;
              const event = new Event('input');
              targetEl.dispatchEvent(event);
              const start = parseInt(selectionStart, 10) + parseInt(length, 10);
              setTimeout(() => {
                targetEl.focus();
                targetEl.setSelectionRange(start, start);
              });
            } else if (targetEl.tagName === 'DIV') {
              // const text = targetEl.innerHTML
              let newText = targetEl.innerHTML.replace(
                /<div>/gi,
                '<*content*><*div*><*content*>',
              );
              newText = newText.replace(
                /<\/div>/gi,
                '<*content*><*/div*><*content*>',
              );
              newText = newText.replace(
                /<br>/gi,
                '<*content*><*br*><*content*>',
              );
              const text = string2Html(newText);
              const img = await getImg();
              const { selectionStart, selectionEnd } = getCursortPosition(targetEl);
              const { str1, str2 } = sliceString(
                text,
                selectionStart,
                selectionEnd,
              );
              let htmlStr1 = partHtml2String(str1);
              htmlStr1 = htmlStr1.replaceAll('&lt;*div*&gt;', '<div>');
              htmlStr1 = htmlStr1.replaceAll('&lt;*/div*&gt;', '</div>');
              htmlStr1 = htmlStr1.replaceAll('&lt;*br*&gt;', '<br>');
              let htmlStr2 = partHtml2String(str2);
              htmlStr2 = htmlStr2.replaceAll('&lt;*div*&gt;', '<div>');
              htmlStr2 = htmlStr2.replaceAll('&lt;*/div*&gt;', '</div>');
              htmlStr2 = htmlStr2.replaceAll('&lt;*br*&gt;', '<br>');

              if (img !== 'data:image/png;base64,') {
                str = `${htmlStr1}<img src="${img}"  data-img="true" />${htmlStr2}`;
                targetEl.innerHTML = str;
              } else {
                str = htmlStr1 + html2String(str) + htmlStr2;
                console.log(str);
                targetEl.innerHTML = str;
              }

              setTimeout(() => {
                setCaretPosition(
                  targetEl,
                  parseInt(selectionStart, 10) + parseInt(length, 10),
                );
              });
              const event = new Event('input');
              targetEl.dispatchEvent(event);
            }
          },
          isHidden: hidden,
        },
        {
          name: '剪切',
          method: () => {
            const text = getSelectionRange(targetEl);
            // console.log(text.length);
            try {
              text && navigator.clipboard.writeText(text);
              // console.log(text);
            } catch {
              ElMessage({
                type: 'error',
                message: '剪切失败,仅支持localhost或https',
              });
              return;
            }
            if (
              targetEl.tagName === 'TEXTAREA'
              || targetEl.tagName === 'INPUT'
            ) {
              const { selectionStart, selectionEnd } = getCursorRange(targetEl);
              const elValue = targetEl.value;
              const str = elValue.slice(0, selectionStart) + elValue.slice(selectionEnd);
              targetEl.value = str;
              const event = new Event('input');
              targetEl.dispatchEvent(event);
            } else if (targetEl.tagName === 'DIV') {
              let newText = targetEl.innerHTML.replace(
                /<div>/gi,
                '<*content*><*div*><*content*>',
              );
              newText = newText.replace(
                /<\/div>/gi,
                '<*content*><*/div*><*content*>',
              );
              newText = newText.replace(
                /<br>/gi,
                '<*content*><*br*><*content*>',
              );
              const elValue = string2Html(newText);
              const { selectionStart, selectionEnd } = getCursortPosition(targetEl);
              const { str1, str2 } = sliceString(
                elValue,
                selectionStart,
                selectionEnd,
              );
              let htmlStr1 = partHtml2String(str1);
              htmlStr1 = htmlStr1.replaceAll('&lt;*div*&gt;', '<div>');
              htmlStr1 = htmlStr1.replaceAll('&lt;*/div*&gt;', '</div>');
              htmlStr1 = htmlStr1.replaceAll('&lt;*br*&gt;', '<br>');
              let htmlStr2 = partHtml2String(str2);
              htmlStr2 = htmlStr2.replaceAll('&lt;*div*&gt;', '<div>');
              htmlStr2 = htmlStr2.replaceAll('&lt;*/div*&gt;', '</div>');
              htmlStr2 = htmlStr2.replaceAll('&lt;*br*&gt;', '<br>');
              targetEl.innerHTML = htmlStr1 + htmlStr2;
              setTimeout(() => {
                setCaretPosition(targetEl, selectionStart);
              });
              const event = new Event('input');
              targetEl.dispatchEvent(event);
            }
          },
          isHidden: hidden,
        },
      ];
      if (instance) {
        instance = null;
        render(instance, div);
      }
      const positionX = e.pageX;
      const positionY = e.pageY;
      let list = [];
      if (binding.value) {
        list = binding.value.isAdd
          ? [...defaultList, ...binding.value.menuList]
          : binding.value.menuList;
      } else {
        list = defaultList;
      }
      instance = h(ContextMenu, {
        position: { positionX, positionY },
        menuList: list,
        onClose() {
          instance = null;
          render(instance, div);
        },
      });
      render(instance, div);
      document.body.appendChild(div);
    };
  },
};

// 获取选中内容
function getTextSelection() {
  let text = '';
  if (window.getSelection) {
    // 除IE9以下 之外的浏览器
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== 'Control') {
    // IE9以下，可不考虑
    text = document.selection.createRange().text;
  }
  return text;
}
// 获取目标选中区域
function getSelectionRange(element) {
  const type = ['TEXTAREA', 'INPUT'];
  const { tagName } = element;
  if (type.indexOf(tagName) !== -1) {
    const { selectionStart } = element;
    const { selectionEnd } = element;
    const { value } = element;
    const text = value ? value.substring(selectionStart, selectionEnd) : '';
    return text;
  }
  return getTextSelection();
}
// input 获取光标位置
function getCursorRange(element) {
  const { selectionStart } = element;
  const text = getSelectionRange(element, 'value');
  const length = text ? text.length : 0;
  const selectionEnd = parseInt(selectionStart, 10) + parseInt(length, 10);
  return {
    selectionStart,
    selectionEnd,
  };
}
// 可编辑div获取当前光标位置
function getCursortPosition(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  let num;
  if (typeof win.getSelection !== 'undefined') {
    // 谷歌、火狐
    sel = win.getSelection();
    num = sel.focusOffset;
    if (sel.rangeCount > 0) {
      // 选中的区域
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange(); // 克隆一个选中区域
      preCaretRange.selectNodeContents(element); // 设置选中区域的节点内容为当前节点
      preCaretRange.setEnd(range.endContainer, range.endOffset); // 重置选中区域的结束位置
      caretOffset = preCaretRange.toString().length;
    }
  } else {
    sel = doc.selection;
    if (sel.type !== 'Control') {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }
  }
  const text = getTextSelection();
  const length = text ? text.length : 0;
  return {
    selectionStart: parseInt(caretOffset, 10) - parseInt(length, 10),
    selectionEnd: parseInt(caretOffset, 10),
    num: num || 0,
  };
}
// 可编辑div设置光标位置
function setCaretPosition(element, pos) {
  let idx = 0;
  let targetIdx = pos;
  for (let i = 0; i < element.childNodes.length; i++) {
    if (element.childNodes[i].nodeName === '#text') {
      if (targetIdx - element.childNodes[i].data.length > 0) {
        targetIdx -= element.childNodes[i].data.length;
      } else {
        idx = i;
        break;
      }
    } else if (element.childNodes[i].innerHTML !== '<br>') {
      if (
        targetIdx - element.childNodes[i].innerText.length > 0) {
        targetIdx -= element.childNodes[i].innerText.length;
      } else {
        idx = i;
        break;
      }
    }
  }
  let range;
  let selection;
  if (document.createRange) {
    range = document.createRange(); // 创建一个选中区域
    range.selectNodeContents(element); // 选中节点的内容
    if (element.innerHTML.length > 0) {
      // 设置光标起始为指定位置
      try {
        range.setStart(element.childNodes[idx], targetIdx);
      } catch {
        range.setStart(element.childNodes[idx], element.childNodes[idx].length);
      }
    }
    range.collapse(true); // 设置选中区域为一个点
    selection = window.getSelection(); // 获取当前选中区域
    selection.removeAllRanges(); // 移出所有的选中范围
    selection.addRange(range); // 添加新建的范围
  } else if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText(element);
    range.collapse(false);
    range.select();
  }
}

// HTML 标签的转义方法
function html2String(sHtml) {
  return sHtml.replace(
    /[<>&"]/g,
    (c) => ({
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
    }[c]),
  );
}
// HTML 标签的反转义方法
function string2Html(str) {
  const arrEntities = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    amp: '&',
    quot: '"',
  };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, (all, t) => arrEntities[t]);
}

// 部分转义
function partHtml2String(str) {
  const imgReg = /<img.*?(?:>|\/>)/gi; // 匹配图片中的img标签
  const imgArr = str.match(imgReg);
  // console.log(imgArr)
  const text = str.replace(
    /<\s?img[^>]*>/gi,
    '<*content*><*imggmiimggmi*><*content*>',
  );
  const textList = text.split('<*content*>').filter((item) => !!item);
  let newStr = '';
  textList.map((item) => {
    if (item === '<*imggmiimggmi*>') {
      const img = imgArr.pop();
      if (img.indexOf('data:image/png;base64,') !== -1) {
        newStr += img;
      } else {
        newStr += html2String(img);
      }
    } else {
      newStr += html2String(item).replaceAll(' ', '&nbsp;');
    }
    return '';
  });
  return newStr;
}

// 处理截取位置
function sliceString(str, selectionStart, selectionEnd) {
  // 查找所在图片
  const imgReg = /<img.*?(?:>|\/>)/gi; // 匹配图片中的img标签
  const imgArr = str.match(imgReg);
  // 查找图片所在位置
  const text = str.replace(
    /<\s?img[^>]*>/gi,
    '<*content*><*imggmiimggmi*><*content*>',
  );
  let str1 = '';
  let str2 = '';
  let startIdx = 0;
  let endIdx = 0;
  let isOver = false;
  const textList = text.split('<*content*>').filter((item) => !!item);
  textList.forEach((item) => {
    if (startIdx <= selectionStart) {
      if (item !== '<*imggmiimggmi*>') {
        if (item === '<*div*>') {
          str1 += '<*div*>';
        } else if (item === '<*/div*>') {
          str1 += '<*/div*>';
        } else if (item === '<*br*>') {
          str1 += '<*br*>';
        } else {
          if (startIdx + item.length >= selectionStart) {
            str1 += item.slice(0, selectionStart - startIdx);
          } else {
            str1 += item;
          }
          startIdx += item.length;
        }
      } else {
        str1 += imgArr.pop();
      }
    }
    if (
      item !== '<*imggmiimggmi*>'
      && item !== '<*div*>'
      && item !== '<*/div*>'
      && item !== '<*br*>'
    ) {
      if (endIdx + item.length > selectionEnd) {
        if (isOver) {
          str2 += item;
        } else {
          isOver = true;
          str2 += item.slice(selectionEnd - endIdx, item.length);
        }
      }
      endIdx += item.length;
    } else if (endIdx > selectionEnd) {
      if (item === '<*div*>') {
        str2 += '<*div*>';
      } else if (item === '<*/div*>') {
        str2 += '<*/div*>';
      } else if (item === '<*br*>') {
        str2 += '<*br*>';
      } else {
        str2 += imgArr.pop();
      }
    }
  });
  return { str1, str2 };
}

// 读取图片
function getImg() {
  return new Promise((resolve) => {
    navigator.clipboard.read().then((content) => {
      if (content[0].types[0].indexOf('image') !== -1) {
        content[0].getType(content[0].types[0]).then((bolb) => {
          const reader = new FileReader();
          reader.readAsDataURL(bolb);
          reader.onload = (e) => {
            resolve(e.target.result);
          };
        });
      } else {
        resolve('data:image/png;base64,');
      }
    });
  });
}
