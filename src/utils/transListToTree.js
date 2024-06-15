export const transListToTree = (list, rootPid) => {
  const arr = []
  list.forEach(item => {
    if (item.pid === rootPid) {
      const children = transListToTree(list, item.id)
      if (children.length > 0) {
        item.children = children
      }
      arr.push(item)
    }
  })
  return arr
}
