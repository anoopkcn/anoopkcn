let eqns = document.querySelectorAll("script[type='math/tex']");
for (let i=eqns.length-1; i>=0; i--) {
    let eqn = eqns[i];
    let src = eqn.text;
    let d = eqn.closest('p') == null;
    eqn.outerHTML = temml.renderToString(src, { displayMode: d });
}


// function mathRender() {
//   const mathElements = document.querySelectorAll("span#tex, tex");

//   mathElements.forEach(element => {
//     try {
//       const texContent = element.textContent;
//       const isDisplayMode = texContent.endsWith('\n');

//       element.outerHTML = temml.renderToString(
//         texContent, { displayMode: isDisplayMode }
//       );
//     } catch (error) {
//       console.error("Error rendering math:", error, element);
//     }
//   });
// }
