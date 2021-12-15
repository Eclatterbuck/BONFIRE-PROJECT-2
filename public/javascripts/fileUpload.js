

FilePond.registerPlugin(
    FilePondPluginImagePreview, //taking in plugins I want to install that were found on FilePond
    FilePondPluginImageResize,
    FilePondPluginFileEncode,

)

FilePond.setOptions({ //setting options for filepond instances
    stylePanelAspectRatio: 150 / 100 / coverAspectRatio,
    imageResizeTargetWidth: coverWidth,
    imageResizeTargetHeight: coverHeight //resizinf elements of width and height to cover entire file
})

FilePond.parse(document.body)