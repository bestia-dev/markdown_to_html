# markdown_to_html

[//]: # (auto_cargo_toml_to_md start)

**Render markdown to html client-side in the browser with WASM.**  
***version: 2023 date: 2023-11-17 author: [bestia.dev](https://bestia.dev) repository: [GitHub](https://github.com/bestia-dev/markdown_to_html)***  

[//]: # (auto_cargo_toml_to_md end)

 ![status](https://img.shields.io/badge/tutorial-yellow)
 ![markdown_to_html](https://bestia.dev/webpage_hit_counter/get_svg_image/1114903337.svg)

Hashtags: #tutorial #markdown #wasm  
My projects on GitHub are more like a tutorial than a finished product: [bestia-dev tutorials](https://github.com/bestia-dev/tutorials_rust_wasm).

## Try it

<https://bestia.dev/markdown_to_html_example>

## Markdown

Markdown is great! It is as easy as plain text but renders in a beautiful style that I could never achieve on my own in some Rich text or HTML.  
The syntax is super easy and it is human readable in both plain text and HTML format. <https://www.markdownguide.org/basic-syntax/>  
In VSCode and many other editors, I can write Markdown files, and insert images and links. Then there is a Preview panel to watch how it renders.

Usually, the markdown syntax is rendered to HTML. Many libraries do that.  
I chose <https://github.com/rsms/markdown-wasm> because it can be used inside a browser on the client side.  

## Publish to Web

Now I want to publish these markdown files to the Web. I have a small web server. I copy all the files there.  
No luck! Web browsers don't recognize and render markdown, just HTML.  

I could use a server-side filter for Nginx or write my own Rust web app, but that is overkill.  
I find it attractive to use Wasm in the browser to render the .md files on the fly.  
I found this library: <https://github.com/rsms/markdown-wasm> written in Rust and compiled to wasm.  
With some glue files and JavaScript, it is easy to make it work.

## Files on the Web server

For this to work I need a simple Web server that returns files, nothing more. No dynamic web app or anything exotic.  
It will not work without a Web server on the local disk, because `wasm` files must be fetched from a Web server because of security.  
Let's start with `index.html`. It will just redirect to the HTML file with JavaScript, adding the first_page.md file as a parameter.

```HTML
<script>
window.location.replace("mdtohtml.html?first_page.md");
</script>
```

The javascript program is all in the `mdtohtml.html`. There is some simple code to accept a URL parameter.  
I also regex replaced the links inside the markdown to work with the new indirection.  
For simplicity I don't bother with subfolders. All .md files must be in the same folder.  
And then we call the `markdown.parse()` method from the wasm module.  
<https://github.com/rsms/markdown-wasm>  
Sure we have to add some beautiful CSS that is similar to GitHub markdown.  
<https://github.com/sindresorhus/github-markdown-css>  

```HTML
<!doctype html>
<html lang="en-US">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="github-markdown.css">
    <script src="markdown.js"></script>
    <script>
        async function fetch_md_convert_to_html() {
            let params = window.location.search;
            if (params==''){
                params = "?first_page.md";
                window.location.search=params;
            }
            let mdFile = params.substring(1);
            const response = await fetch(mdFile);
            let mdText = await response.text();
            mdText = mdText.replaceAll(/(\[.*\]\()(.*\.md\))/g, '$1mdtohtml.html?$2'); 
            document.body.innerHTML=markdown.parse(mdText);
        }
    </script>
    <style>
        .markdown-body {
            box-sizing: border-box;
            min-width: 200px;
            max-width: 980px;
            margin: 0 auto;
            padding: 45px;
        }
        @media (max-width: 767px) {
            .markdown-body {
                padding: 15px;
            }
        }
    </style>
</head>
<body class="markdown-body">
    <script>
        fetch_md_convert_to_html();
    </script>
</body>
</html> 
```

We need to add the magic ingredients to the folder: `markdown.js`, `markdown.wasm`, `github-markdown.css`

and voila! It works.

## open-source and free as a beer

My open-source projects are free as a beer (MIT license).  
I just love programming.  
But I need also to drink. If you find my projects and tutorials helpful, please buy me a beer by donating to my [PayPal](https://paypal.me/LucianoBestia).  
You know the price of a beer in your local bar ;-)  
So I can drink a free beer for your health :-)  
[Na zdravje!](https://translate.google.com/?hl=en&sl=sl&tl=en&text=Na%20zdravje&op=translate) [Alla salute!](https://dictionary.cambridge.org/dictionary/italian-english/alla-salute) [Prost!](https://dictionary.cambridge.org/dictionary/german-english/prost) [Nazdravlje!](https://matadornetwork.com/nights/how-to-say-cheers-in-50-languages/) 🍻

[//bestia.dev](https://bestia.dev)  
[//github.com/bestia-dev](https://github.com/bestia-dev)  
[//bestiadev.substack.com](https://bestiadev.substack.com)  
[//youtube.com/@bestia-dev-tutorials](https://youtube.com/@bestia-dev-tutorials)  
