const rootStyles = window.getComputedStyle(document.documentElement) //getting all styles from root element of document

if (rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !== '') {
  ready()  
} else {
  document.getElementById('main-css').addEventListener('load', ready)
}

function ready() {
  const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
  const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
  const coverHeight = coverWidth / coverAspectRatio
  FilePond.registerPlugin(
    FilePondPluginImagePreview,  //taking in plugins I want to install that were found on FilePond
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

  FilePond.setOptions({  //setting options for filepond instances
    stylePanelAspectRatio: 1 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight //resizing elements of width and height to cover entire file
  })
  
  FilePond.parse(document.body)
}

