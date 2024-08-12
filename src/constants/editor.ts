export const editorConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'bold',
            'italic',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'link',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ],
    },
    language: 'en',
    image: {
        toolbar: [
            'imageTextAlternative',
            'toggleImageCaption',
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
        ],
    },
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
}

export const editorModules = {
    toolbar: [
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        ['clean'],
    ],

    clipboard: {
        matchVisual: false,
    },
}
