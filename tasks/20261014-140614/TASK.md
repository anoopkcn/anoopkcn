# Demo usage guide

- STATUS: CLOSED
- PRIORITY: 100
- TAGS:


## Usage guide

For blog:
- put things instide a folder(name of the folder = name of the blogpost)
- write the blog inside `index.smd` file inside the folder created above
- put all the associated files(images, code snippets, etc) referenced in the `index.smd` inside the folder above

front matter options example:

```md
---
.title = "First Post: What's this?",
.date = .date("2025-04-07T19:42:48"),
.authors = ["Anoop K Chandran"],
.layout = "post.shtml",
.custom = {"math": true, "abstract":"Introduction to site sections, page lists and code"},
.draft = false,
---
```
the `.custom` and its elements are optional
use following task to change date:
```json
{
  "label": "change date",
  "command": "NOW=$(date +'%FT%T') && perl -i -s -pe 's/\\.date\\(\"(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})\"\\)/.date(\"$now\")/g' -- -now=\"$NOW\" $ZED_FILE",
  "tags": ["date"],
  "reveal": "never"
}
```
NOTE: do not forget to set `{ "reevaluate_context": true }` in the task re-run keymap(otherwise it will keep changing date for the same file)

link [this is a link]($link.page('blog/second-post'))

inline tex: [H\psi = E\psi]($text.id('tex'))

multiline text
```=html
<tex>
\begin{align}
a &= x+\sqrt{1-x^2} \\
b &= \frac{x^2}{1-x}
\end{align}
</tex>
```
An other example
```=html
<tex>
\begin{equation}
\begin{pmatrix}
    x \\
    y \\
    z
\end{pmatrix}
\end{equation}
</tex>
```
