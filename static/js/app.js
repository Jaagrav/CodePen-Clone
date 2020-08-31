window.onload = function () {
    for (var i = 0; i < document.getElementsByClassName("code").length; i++)
        document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";

    let htmlEditor = ace.edit("html");
    htmlEditor.session.setMode("ace/mode/html");
    htmlEditor.setTheme("ace/theme/nord_dark");
    if (localStorage.getItem("lc-codepen-clone-html") == null)
        htmlEditor.session.setValue(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`);
    else htmlEditor.session.setValue(localStorage.getItem("lc-codepen-clone-html"))
    htmlEditor.session.setUseWrapMode(true);
    htmlEditor.setShowPrintMargin(false);
    htmlEditor.setHighlightActiveLine(false);
    htmlEditor.session.on('change', function (delta) {
        update();
    });


    let cssEditor = ace.edit("css");
    cssEditor.session.setMode("ace/mode/css");
    cssEditor.setTheme("ace/theme/nord_dark");

    if (localStorage.getItem("lc-codepen-clone-css") == null)
        cssEditor.session.setValue(`body{
        
    }`);
    else cssEditor.session.setValue(localStorage.getItem("lc-codepen-clone-css"))
    cssEditor.session.setUseWrapMode(true);
    cssEditor.setShowPrintMargin(false);
    cssEditor.setHighlightActiveLine(false);
    cssEditor.session.on('change', function (delta) {
        update();
    });

    let jsEditor = ace.edit("javascript");
    jsEditor.session.setMode("ace/mode/javascript");
    jsEditor.setTheme("ace/theme/nord_dark");
    if (localStorage.getItem("lc-codepen-clone-js") == null)
        jsEditor.session.setValue(`//JavaScript goes here`);
    else
        jsEditor.session.setValue(localStorage.getItem("lc-codepen-clone-js"))
    jsEditor.session.setUseWrapMode(true);
    jsEditor.setShowPrintMargin(false);
    jsEditor.setHighlightActiveLine(false);
    jsEditor.session.on('change', function (delta) {
        update();
    });
    update();

    function update() {
        let output = document.querySelector(".output .virtual-iframe").contentWindow.document;
        console.log(output)
        output.open();
        output.write("<style>" + cssEditor.getValue() + "</style>" + htmlEditor.getValue() + "<script>" + jsEditor.getValue() + "</script>");
        output.close();
        localStorage.setItem("lc-codepen-clone-html", htmlEditor.getValue())
        localStorage.setItem("lc-codepen-clone-css", cssEditor.getValue())
        localStorage.setItem("lc-codepen-clone-js", jsEditor.getValue())
    }

    window.addEventListener("resize", e => {
        for (var i = 0; i < document.getElementsByClassName("code").length; i++)
            document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
        htmlEditor.resize();
        cssEditor.resize();
        jsEditor.resize();
    })

    let layout = 0;

    document.querySelector(".change-layout").addEventListener("click", function () {
        layout++;
        if (layout > 1) layout = 0;
        changeLayout();
    })

    function changeLayout() {
        switch (layout) {
            case 0:
                document.querySelector(".coder").classList.add("view1")
                document.querySelector(".coder").classList.remove("view2")
                document.querySelector(".container").classList.add("view1")
                document.querySelector(".container").classList.remove("view2")

                for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                    document.getElementsByClassName("code")[i].style.maxHeight = "unset";
                    document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditor.resize();
                break;
            case 1:
                document.querySelector(".coder").classList.add("view2")
                document.querySelector(".coder").classList.remove("view1")
                document.querySelector(".container").classList.add("view2")
                document.querySelector(".container").classList.remove("view1")

                for (var i = 0; i < document.getElementsByClassName("code").length; i++) {
                    document.getElementsByClassName("code")[i].style.height = document.querySelector(".code-editor").clientHeight - 40 + "px";
                    document.getElementsByClassName("code")[i].style.maxHeight = "194px";
                }
                htmlEditor.resize();
                cssEditor.resize();
                jsEditor.resize();
                break;
        }
    }
}