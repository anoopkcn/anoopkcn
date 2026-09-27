let eqns = document.querySelectorAll("script[type='math/tex']");
for (let i=eqns.length-1; i>=0; i--) {
    let eqn = eqns[i];
    let src = eqn.text;
    // inline unless the equation stands alone as a block (a ```=mathtex fence)
    let d = eqn.closest('p, li, td, th, dt, dd, figcaption, h1, h2, h3, h4, h5, h6') == null;
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
