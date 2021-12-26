export default class ContextMenu {
  constructor () {
    this.DOM = {
      contextArea: document.querySelector('.context-area'),
      contextMenu: document.createElement('div'),
      contextList: document.createElement('ul'),
      contextItem: document.createElement('li'),
      contextItemLink: document.createElement('a')
    }

    this._init()
  }

  _init() {
    this._initDOM()
  }
  
  _initDOM() {
    this._initEvent()
  }

  _initEvent() {
    document.addEventListener('click', this.handleClearContextMenu.bind(this), false)
    this.DOM.contextArea.addEventListener('contextmenu', this.handleCreateContextMenu.bind(this), false)
  }

  _renderContextMenu(list) {
    const contextList = this.DOM.contextList.cloneNode()
    list.forEach(item => {
      const contextItem = this.DOM.contextItem.cloneNode()
      const contextItemLink = this.DOM.contextItemLink.cloneNode()
      const contextItemText = document.createTextNode(item.text)
      
      contextItemLink.appendChild(contextItemText)
      contextItem.appendChild(contextItemLink)
      contextList.appendChild(contextItem)
    })

    return contextList
  }

  handleCreateContextMenu(event) {
    event.preventDefault() // 기본 contextmenu가 나오지 않도록 차단

    const contextMenu = this.DOM.contextMenu.cloneNode()
    contextMenu.className = 'context-menu'
    contextMenu.style.top = event.pageY + 'px'
    contextMenu.style.left = event.pageX + 'px'
    
    contextMenu.appendChild(this._renderContextMenu([
      { text: 'Open In Github' },
      { text: 'Open In Editor' },
      { text: 'Copy Source' },
      { text: 'Copy Remote URL' },
      { text: 'Copy Styles' },
      { text: 'Paste Styles' },
      { text: 'Edit Props' },
      { text: 'Log Props' },
      { text: 'Reset State' },
      { text: 'Duplicate' }
    ]))
    
    document.body.appendChild(contextMenu)

    // context menu 크기 구하기
    // 현재 마우스 위치값에서 width, height + 해서 현재 contextarea보다 크면 큰 값만큼 빼서 위치 옮겨주기
    const contextMenuWClientRect = contextMenu.getBoundingClientRect()
    const contextClientWidth = this.DOM.contextArea.clientWidth
    const contextClientHeight = this.DOM.contextArea.clientHeight
    const contextSizeX = contextMenuWClientRect.x + contextMenuWClientRect.width
    const contextSizeY = contextMenuWClientRect.y + contextMenuWClientRect.height

    if (contextSizeX > contextClientWidth) {
      contextMenu.style.left = event.pageX + (contextClientWidth - contextSizeX) + 'px'
    }
    if (contextSizeY > contextClientHeight) {
      contextMenu.style.top = event.pageY + (contextClientHeight - contextSizeY) + 'px'
    }
  }

  handleClearContextMenu(event) {
    const contextMenu = document.querySelector('.context-menu')
    if (contextMenu) contextMenu.remove()
  }
}