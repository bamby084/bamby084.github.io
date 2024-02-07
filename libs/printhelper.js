function saveHtmlTagAsImage(tagId, filename) {
    document.body.style.cursor = 'wait';
    html2canvas(document.querySelector('#' + tagId)).then(function (canvas) {
        try {
            saveAs(canvas.toDataURL(), filename);
        }
        catch (err) {
            console.error(err);
        }
        document.body.style.cursor = 'default';
    });
}

//function printHtmlTag(tagId, header, footer, filename) {
//    printJS({ printable: tagId, type: 'html', header: header, footer: footer });
//}

//function printHtmlElmn(tagId, header, footer, filename) {
//    PrintElements.print([document.getElementById(tagId)]);
//}