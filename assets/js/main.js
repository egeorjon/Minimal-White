
/* ----------------------------------------------------
   --- Lightbox init                                ---
   ---------------------------------------------------- */
   if (typeof SimpleLightbox !== "undefined") {
    var matches = document.querySelectorAll(".gallery");
    matches.forEach(
        gal => {
            new SimpleLightbox("#" + gal.id + " a");
        }
    );
    /*var matches = document.querySelectorAll(".figure");
    matches.forEach(
        fig => {
            new SimpleLightbox("#" + fig.id + " a");
        }
    );*/
    new SimpleLightbox(".figure a");
}

/* ----------------------------------------------------
   --- Update footnotes                            ---
   ---------------------------------------------------- */
    /* --- Update the badge (to fit with bootstrap styles) --- */

    document.querySelectorAll(".footnote-ref").forEach(
        fr => {
            /*fr.classList.add("badge","bg-primary");
            fr.classList.remove("footnote-ref");*/
            var text = fr.textContent;
            fr.textContent = "[" + text + "]";
        }
    );

    document.addEventListener("DOMContentLoaded", function() {
        let footnotesHr = document.querySelector(".footnotes hr"); // Sélectionne le <hr> dans .footnotes
        if (footnotesHr) {
            footnotesHr.remove(); // Supprime l'élément
        }
    });

/* ----------------------------------------------------
   --- insertAfter                                  ---
   ---------------------------------------------------- */
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* --- Add the title --- */
if (document.querySelector(".footnotes")) {
    var notes = document.createElement("h3");
    notes.classList.add("footnotes-title");
    notes.textContent = "Notes";
    insertAfter(notes, document.querySelector(".footnotes > hr"));
}

/* ----------------------------------------------------
   --- Headings, copy to clipboard                  ---
   ---------------------------------------------------- */

   document.addEventListener('DOMContentLoaded', function() {
    /* const copyButtons = document.querySelectorAll('.copy-to-clipboard'); */
    const copyButtons = document.querySelectorAll('button[data-permalink]')

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const permalink = this.getAttribute('data-permalink');

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(permalink)
                .then(()   => { console.log('Text copied to clipboard...'); })
                .catch(err => { console.log('Something went wrong', err);   })
            } else {
                // Use the 'out of viewport hidden text area' trick
                const textArea = document.createElement("textarea");
                textArea.value = permalink;
                    
                // Move textarea out of the viewport so it's not visible
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";
                    
                document.body.prepend(textArea);
                textArea.select();

                try {
                    document.execCommand('copy');
                } catch (error) {
                    console.error(error);
                } finally {
                    textArea.remove();
                }
            }
        });
    });
});