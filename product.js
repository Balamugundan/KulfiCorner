/* =========================================================
   KULFI PRODUCT DATA
========================================================= */

const kulfis = {

    malai: {

        number: "01",

        name: "Malai Kulfi",

        image: "Malai.png",

        price: "60",

        description:
            "A rich and creamy traditional kulfi made with pure milk. Slow preparation gives it a smooth texture and authentic Indian taste.",

        ingredients:
            "Pure milk, sugar, cardamom, cream and selected natural ingredients.",

        speciality:
            "Our classic signature flavour. Simple, creamy and made for people who love traditional kulfi."

    },


    kesarBadam: {

        number: "02",

        name: "Kesar Badam Kulfi",

        image: "kesar.png",

        price: "70",

        description:
            "A luxurious combination of fragrant saffron and premium almonds blended into rich and creamy kulfi.",

        ingredients:
            "Pure milk, saffron, almonds, sugar, cardamom and natural ingredients.",

        speciality:
            "Premium saffron and crunchy almonds give this kulfi its rich aroma and distinctive taste."

    },


    kesarPista: {

        number: "03",

        name: "Kesar Pista Kulfi",

        image: "kesar pista .png",

        price: "70",

        description:
            "A delicious blend of aromatic saffron and crunchy pistachios with a smooth traditional kulfi base.",

        ingredients:
            "Pure milk, saffron, pistachios, sugar, cardamom and natural ingredients.",

        speciality:
            "The perfect balance of saffron aroma and pistachio richness in every bite."

    },


    pistaBadam: {

        number: "04",

        name: "Pista Badam Kulfi",

        image: "pista padam.png",

        price: "70",

        description:
            "Creamy kulfi enriched with premium pistachios and almonds for a delicious nutty flavour.",

        ingredients:
            "Pure milk, pistachios, almonds, sugar, cardamom and natural ingredients.",

        speciality:
            "A rich nut-filled kulfi combining the flavour of pistachios and almonds."

    }

};


/* =========================================================
   GET SELECTED PRODUCT
========================================================= */

const params =
    new URLSearchParams(window.location.search);

const productKey =
    params.get("product") || "malai";


/* =========================================================
   GET PRODUCT
========================================================= */

const product =
    kulfis[productKey] || kulfis.malai;


/* =========================================================
   UPDATE PAGE
========================================================= */

document.getElementById("productImage").src =
    product.image;

document.getElementById("productImage").alt =
    product.name;

document.getElementById("productNumber").textContent =
    product.number;

document.getElementById("productName").textContent =
    product.name;

document.getElementById("productDescription").textContent =
    product.description;

document.getElementById("productPrice").textContent =
    product.price;

document.getElementById("productIngredients").textContent =
    product.ingredients;

document.getElementById("productSpeciality").textContent =
    product.speciality;


/* =========================================================
   PAGE TITLE
========================================================= */

document.title =
    product.name + " | Kulfi Corner";


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle("show");

        }
    );

}