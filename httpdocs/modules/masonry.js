var checkParams = function (config) {
  const DEFAULT_GUTTER = 25

  if (typeof config.useTransform !== 'boolean') {
    config.useTransform = true
  }

  if (typeof config.gutter !== 'number') {
    config.gutter = DEFAULT_GUTTER
  }
}

var getMin = function (cols) {
  var min = cols[0]

  for (var col of cols) {
    if (col.height < min.height) {
      min = col
    }
  }

  return min
}

var Masonry = function Masonry(config) {
  checkParams(config)

  if (config.container instanceof HTMLElement) {
    this.container = config.container
    this.containerClass = config.container.className
  } else {
    this.containerClass = config.container
    this.container = document.querySelector(config.container)
  }

  this.items = this.container.children
  this.static = config.static || false
  this.size = config.items
  this.gutter = config.gutter
  this.maxColumns = config.maxColumns || false
  this.useMin = config.useMin || false
  this.useTransform = config.useTransform
  this.animate = config.animate || false
  this.started = false

  this.init()
}

Masonry.prototype.init = function init() {
  if (!this.ready() || this.started) {
    return
  }

  this.container.style.position = 'relative'

  for (var i = 0; i < this.items.length; i++) {
    var style = this.items[i].style

    style.position = 'absolute'

    if (this.animate) {
      style.transition =
        (this.useTransform ? 'transform' : 'top, left') + ' 0.2s ease'
    }
  }

  this.started = true
}

Masonry.prototype.colWidth = function colWidth() {
  return this.items[0].getBoundingClientRect().width + this.gutter
}

Masonry.prototype.setup = function setup() {
  var width = this.container.getBoundingClientRect().width
  var colWidth = this.colWidth()
  var numCols = Math.floor(width / colWidth) || 1
  var cols = []

  if (this.maxColumns && numCols > this.maxColumns) {
    numCols = this.maxColumns
  }

  for (var i = 0; i < numCols; i++) {
    cols[i] = { height: 0, index: i }
  }

  var wSpace = width - numCols * colWidth + this.gutter

  return { cols: cols, wSpace: wSpace }
}

Masonry.prototype.nextCol = function nextCol(cols, i) {
  if (this.useMin) {
    return getMin(cols)
  }

  return cols[i % cols.length]
}

Masonry.prototype.positionItems = function positionItems() {
  var ref = this.setup()
  var cols = ref.cols
  var wSpace = ref.wSpace
  var maxHeight = 0
  var colWidth = this.colWidth()

  wSpace = Math.floor(wSpace / 2)

  for (var i = 0; i < this.items.length; i++) {
    var col = this.nextCol(cols, i)
    var item = this.items[i]
    var topGutter = col.height ? this.gutter : 0
    var left = col.index * colWidth + wSpace + 'px'
    var top = col.height + topGutter + 'px'

    if (this.useTransform) {
      item.style.transform = 'translate(' + left + ', ' + top + ')'
    } else {
      item.style.top = top
      item.style.left = left
    }

    col.height += item.getBoundingClientRect().height + topGutter

    if (col.height > maxHeight) {
      maxHeight = col.height
    }
  }

  this.container.style.height = maxHeight + 'px'
}

Masonry.prototype.ready = function ready() {
  if (this.static) {
    return true
  }
  return this.items.length >= this.size
}

Masonry.prototype.getReady = function getReady() {
  var this$1 = this

  var interval = setInterval(function () {
    this$1.container = document.querySelector(this$1.containerClass)
    this$1.items = this$1.container.children

    if (this$1.ready()) {
      clearInterval(interval)

      this$1.init()
      this$1.listen()
    }
  }, 100)
}

Masonry.prototype.listen = function listen() {
  var this$1 = this

  if (this.ready()) {
    var timeout

    window.addEventListener('resize', function () {
      if (!timeout) {
        timeout = setTimeout(function () {
          this$1.positionItems()
          timeout = null
        }, 200)
      }
    })

    this.positionItems()
  } else {
    this.getReady()
  }
}

export { Masonry }
