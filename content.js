// walk(document.body);

// function walk(node) {
//     // I stole this function from here:
//     // http://is.gd/mwZp7E

//     var child, next;

//     switch (node.nodeType) {
//         case 1: // Element
//         case 9: // Document
//         case 11: // Document fragment
//             child = node.firstChild;
//             while (child) {
//                 next = child.nextSibling;
//                 walk(child);
//                 child = next;
//             }
//             break;

//         case 3: // Text node
//             handleText(node);
//             break;
//     }
// }

// function handleText(textNode) {
//     // var v = textNode.nodeValue;

//     // v = v.replace(/\bThe Cloud\b/g, "My Butt");
//     // v = v.replace(/\bThe cloud\b/g, "My butt");
//     // v = v.replace(/\bthe Cloud\b/g, "my Butt");
//     // v = v.replace(/\bthe cloud\b/g, "my butt");

//     // v = v.replace(/\bSJW(s?)\b/gi, "skeleton$1");
//     // v = v.replace(/\bsocjus\b/gi, "skeletonism");
//     // v = v.replace(/\b(a)n (SJWs?)\b/gi, "$1 $2");
//     // v = v.replace(/\b(s)ocial justice (warriors?)/gi, "$1keleton $2");

//     // textNode.nodeValue = v;
//     if (textNode.nodeValue.includes("domain")) {
//         console.log(textNode);
//         var el = document.createElement("a");
//         el.setAttribute("href", "https://www.google.com");
//         el.innerText = textNode.nodeValue;
//         console.log(el);
//         textNode.parentNode.replaceChild(el, textNode);
//     }
// }
