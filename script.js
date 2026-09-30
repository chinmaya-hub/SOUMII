/* =========================================================
   OUR LITTLE WORLD
   FULLSCREEN IMAGE VIEWER
========================================================= */


(function () {

    "use strict";


    /* =====================================================
       LIGHTBOX CSS
       Isse style.css mein kuch add karne ki zarurat nahi.
    ===================================================== */

    const fullscreenCSS = `

        #memoryLightbox {

            position: fixed;

            inset: 0;

            width: 100vw;

            height: 100vh;

            background: rgba(0, 0, 0, 0.96);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 25px;

            z-index: 999999;

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            transition:
                opacity 0.25s ease,
                visibility 0.25s ease;

        }


        #memoryLightbox.open {

            opacity: 1;

            visibility: visible;

            pointer-events: auto;

        }


        #memoryLightboxImage {

            display: block;

            width: auto;

            height: auto;

            max-width: 96vw;

            max-height: 90vh;

            object-fit: contain;

            border-radius: 8px;

            user-select: none;

            -webkit-user-select: none;

            box-shadow:
                0 20px 80px rgba(0, 0, 0, 0.7);

        }


        #memoryLightboxClose {

            position: fixed;

            top: 20px;

            right: 25px;

            width: 48px;

            height: 48px;

            border: 1px solid rgba(255,255,255,0.25);

            border-radius: 50%;

            background: rgba(20,20,25,0.85);

            color: white;

            font-size: 32px;

            line-height: 42px;

            text-align: center;

            cursor: pointer;

            z-index: 1000000;

            transition: 0.2s ease;

        }


        #memoryLightboxClose:hover {

            background: #e88b9b;

            color: #111;

            transform: scale(1.05);

        }


        #memoryLightboxTitle {

            position: fixed;

            left: 50%;

            bottom: 20px;

            transform: translateX(-50%);

            padding: 9px 18px;

            border-radius: 30px;

            background: rgba(0,0,0,0.75);

            color: white;

            font-family: Arial, sans-serif;

            font-size: 13px;

            white-space: nowrap;

            max-width: 90vw;

            overflow: hidden;

            text-overflow: ellipsis;

            z-index: 1000000;

        }


        .gallery-image {

            cursor: zoom-in !important;

        }


        .view-button {

            cursor: pointer !important;

        }


        @media (max-width: 600px) {

            #memoryLightbox {

                padding: 10px;

            }


            #memoryLightboxImage {

                max-width: 98vw;

                max-height: 88vh;

                border-radius: 5px;

            }


            #memoryLightboxClose {

                top: 12px;

                right: 12px;

                width: 44px;

                height: 44px;

                line-height: 38px;

                font-size: 29px;

            }


            #memoryLightboxTitle {

                bottom: 12px;

                font-size: 12px;

            }

        }

    `;


    /* Add CSS only once */

    function addFullscreenCSS() {

        if (
            document.getElementById(
                "memoryFullscreenCSS"
            )
        ) {

            return;

        }


        const style =
            document.createElement("style");


        style.id =
            "memoryFullscreenCSS";


        style.textContent =
            fullscreenCSS;


        document.head.appendChild(style);

    }



    /* =====================================================
       CREATE LIGHTBOX
    ===================================================== */

    function createLightbox() {

        addFullscreenCSS();


        /* Already created */

        if (
            document.getElementById(
                "memoryLightbox"
            )
        ) {

            return;

        }


        const lightbox =
            document.createElement("div");


        lightbox.id =
            "memoryLightbox";


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        lightbox.innerHTML = `

            <button
                type="button"
                id="memoryLightboxClose"
                aria-label="Close fullscreen"
            >
                ×
            </button>


            <img
                id="memoryLightboxImage"
                src=""
                alt=""
            >


            <div
                id="memoryLightboxTitle"
            >
            </div>

        `;


        document.body.appendChild(
            lightbox
        );


        /* =================================================
           CLOSE BUTTON
        ================================================= */

        const closeButton =
            document.getElementById(
                "memoryLightboxClose"
            );


        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeLightbox();

            }
        );


        /* =================================================
           CLICK OUTSIDE IMAGE
        ================================================= */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(
        imageSource,
        imageTitle
    ) {

        createLightbox();


        const lightbox =
            document.getElementById(
                "memoryLightbox"
            );


        const image =
            document.getElementById(
                "memoryLightboxImage"
            );


        const title =
            document.getElementById(
                "memoryLightboxTitle"
            );


        if (
            !lightbox ||
            !image
        ) {

            return;

        }


        /* Set image */

        image.src =
            imageSource;


        image.alt =
            imageTitle ||
            "Memory";


        /* Set title */

        if (title) {

            title.textContent =
                imageTitle ||
                "";

        }


        /* Show */

        lightbox.classList.add(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        /* Prevent background scrolling */

        document.body.style.overflow =
            "hidden";

    }



    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        const lightbox =
            document.getElementById(
                "memoryLightbox"
            );


        const image =
            document.getElementById(
                "memoryLightboxImage"
            );


        if (!lightbox) {

            return;

        }


        lightbox.classList.remove(
            "open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        /* Clear image after closing */

        setTimeout(
            function () {

                if (
                    image &&
                    !lightbox.classList.contains(
                        "open"
                    )
                ) {

                    image.removeAttribute(
                        "src"
                    );

                }

            },
            250
        );

    }



    /* =====================================================
       CONNECT ALL IMAGES + BUTTONS
    ===================================================== */

    function setupImageViewer() {

        createLightbox();


        /* ================================================
           IMAGE ELEMENTS
        ================================================ */

        const images =
            document.querySelectorAll(
                ".gallery-image"
            );


        images.forEach(
            function (image) {

                image.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const source =
                            image.getAttribute(
                                "data-full-image"
                            )
                            ||
                            image.getAttribute(
                                "src"
                            );


                        const title =
                            image.getAttribute(
                                "data-title"
                            )
                            ||
                            image.getAttribute(
                                "alt"
                            )
                            ||
                            "Memory";


                        if (source) {

                            openLightbox(
                                source,
                                title
                            );

                        }

                    }
                );

            }
        );



        /* ================================================
           VIEW FULLSCREEN BUTTONS
        ================================================ */

        const buttons =
            document.querySelectorAll(
                ".view-button"
            );


        buttons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        const source =
                            button.getAttribute(
                                "data-full-image"
                            );


                        const title =
                            button.getAttribute(
                                "data-title"
                            )
                            ||
                            "Memory";


                        if (source) {

                            openLightbox(
                                source,
                                title
                            );

                        }

                    }
                );

            }
        );

    }



    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeLightbox();

            }

        }
    );



    /* =====================================================
       PAGE LOAD
    ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            setupImageViewer
        );

    } else {

        setupImageViewer();

    }


})();
