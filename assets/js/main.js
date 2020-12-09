// JavaScript
window.onload = function(){
    createMenu();
    createFooter();
    createGallery();
    createCharacteristics();
    createDiscountData();
    createDropDownForPhotographers();

    document.getElementById("submit").addEventListener("click", submitFormData);

    // document.getElementById("alertPhotographer").style.display = 'block';

}

// jQuery
$(document).ready(function(){

    // Skills Slider
    $(".arrows").hover(function(){
        $(this).css("color", "rgb(75, 183, 255)");
    }, function(){
        $(this).css("color", "gray")
    });

    createSkills();

    $('#right').click(function(e){
        e.preventDefault();

        let first = $(".skill:first");
        let selected = $(".selected"), next;

        next = selected.next(".skill").length ? selected.next(".skill") : first;

        selected.removeClass("selected");
        selected.addClass("not_sel").slideUp(200);

        next.removeClass("not_sel");
        next.addClass("selected").slideDown(200);
    });

    $('#left').click(function(e){
        e.preventDefault();

        let last = $(".skill:last");
        let selected = $(".selected"), next;

        next = selected.prev(".skill").length ? selected.prev(".skill") : last;

        selected.removeClass("selected");
        selected.addClass("not_sel").slideUp(200);

        next.removeClass("not_sel");
        next.addClass("selected").slideDown(200);
    });

    // Timer for Skills Slider
    var time = 5000;
    var tid = setTimeout(timer, time);

    function timer() {
        var next, selected = $(".selected");
        let first = $(".skill:first");

        next = selected.next('.skill').length ? selected.next('.skill') : first;

        selected.removeClass("selected");
        selected.addClass("not_sel").slideUp(200);

        next.removeClass("not_sel");
        next.addClass("selected").slideDown(200);

        tid = setTimeout(timer, time);
    }

    // Photographers, Dropdown Gallery
    createPhotographers();

    $(".alertSignal").hide();

});

// Validity Checks

function submitFormData(e){
    e.preventDefault();

    
}

// Functions
function createDropDownForPhotographers(){
    $.ajax({
        url: "assets/data/photographers.json",
        success: function(data){
            let html = `<option selected value="0">Choose a photographer...</option>`;

            data.forEach(el => {
                html += `<option value="${el.id}">${el.name}</option>`;
            });

            document.getElementById("photographer").innerHTML = html;
        },
        error: function(err){
            console.log(err);
        }
    });
}

function createDiscountData(){
    $.ajax({
        url: "assets/data/discountDates.json",
        success: function(data){
            today = new Date();

            for(let el of data){
                from = new Date(el.from);
                to = new Date(el.to);

                if(today >= from && today <= to){
                    document.getElementById("discount").innerHTML = `
                        <div class="col-lg-5 col-sm-12 p-5 bg-primary text-light rounded">
                            <p class="h2">${el.name}</p>
                            <p>From ${el.from} to ${el.to}</p>
                            <p class="h1">-${el.discount}%</p>
                        </div>
                    `;
                }
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

function createPhotographers(){
    $.ajax({
        url: "assets/data/photographers.json",
        success: function(data){
            let html = '';

            data.forEach(el => {
                html += `
                <div class="col-12 mb-5 photographer" data-aos="fade-up">
                    <div class="col-12 d-flex flex-wrap">
                        <div class="col-lg-6 col-sm-12 d-flex justify-content-center">
                            <img src="assets/img/${el.img}" alt="${el.name}" class="img-fluid shadow-lg"/>
                        </div>
                        <div class="col-lg-6 col-sm-12 d-flex align-items-center">
                            <div class="col-12">
                                <h2 class="mt-4"><b>${el.name}</b></h2>
                                <h3>${el.desc}</h3>`;

                                for(let i of el.paragraphs){
                                    html += `<p>${i}</p>`;
                                }

                                html += `
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mt-4 pb-4">
                        <div class="col-12 photographer_gallery" id="gallery_${el.id}">
                            <div class="slider col-12">
                                <div class="inner col-12">
                                    <div class="col-12 d-flex flex-wrap justify-content-center mb-4">`;

                                        el.images.forEach(img => {
                                            html += `
                                            <div class="col-lg-4 col-sm-6 mt-2 text-center">
                                                <img src="assets/img/${img}" alt="${el.name} Photography" class="img-fluid shadow-lg"/>
                                            </div>
                                            `;
                                        });

                                        html += `
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 text-center border-bottom pb-3">
                            <a href="#" class="h1 gallery_arrow" id="${el.id}"><i class="fa fa-angle-double-down" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>`;
            });

            document.getElementById("photographers").innerHTML = html;
            $(".photographer_gallery").hide();
            
            var state = false;
            $(".gallery_arrow").click(function(e){
                e.preventDefault();

                let id = $(this).attr("id");

                if(state){
                    $(this).html(`<i class="fa fa-angle-double-down" aria-hidden="true">`);

                    $("#gallery_" + id).slideUp();

                    state = false;
                }
                else{
                    $(this).html(`<i class="fa fa-angle-double-up" aria-hidden="true">`);

                    $("#gallery_" + id).slideDown();

                    state = true;
                }
            });
        },
        error: function(err){
            console.log(err);
        }
    });
}

function createSkills(){
    $.ajax({
        url: "assets/data/skills.json",
        success: function(data){
            let html = '';

            data.forEach(el => {
                if(el.selected){
                    html += `<div class="skill selected">`;
                }
                else{
                    html += `<div class="skill not_sel">`;
                }

                el.skills.forEach(skill => {
                    html += `<p class="h3">${skill}</p>`
                });

                html += `</div>`
            });

            document.getElementById("skills_container").innerHTML = html;
            $(".not_sel").hide();
        },
        error: function(err){
            console.log(err);
        }
    });
}

function createGallery(){
    $.ajax({
        url: "assets/data/gallery.json",
        success: function(data){
            let html = '';

            data.forEach(el => {
                html += `
                <a href="${el.link}">
                    <figure class="effect-honey tm-gallery-item">
                        <img src="${el.image}" alt="${el.alt}" class="img-fluid">
                        <figcaption>
                            ${el.caption}
                        </figcaption>
                    </figure>
                </a>
                `;
            });

            document.getElementById("gallery_id").innerHTML = html;
        },
        error: function(err){
            console.log(err);
        }
    });
}

function createCharacteristics(){
    $.ajax({
        url: "assets/data/chr.json",
        success: function(data){
            let html = '';

            data.forEach(el => {
                html += `
                <div class="col-lg-4">
                    <i class="fas fa-4x ${el.icon} text-center tm-icon"></i>
                    <h4 class="text-center tm-text-primary mb-4">${el.title}</h4>
                    <p>
                        ${el.text}
                    </p>
                </div>
                `;
            });

            document.getElementById("characteristics_id").innerHTML = html;
        },
        error: function(err){
            console.log(err);
        }
    });
}

function createMenu(){
    let menuLinks = [
        {
            name: "Home",
            link: "index.html"
        },
        {
            name: "Our Photographers",
            link: "photographers.html"
        },
        {
            name: "Book a Session",
            link: "form.html"
        }
    ];

    let html = '';

    menuLinks.forEach(el => {
        html += `
            <li class="nav-item">
                <a class="nav-link tm-nav-link" href="${el.link}">${el.name}</a>
            </li>
        `;
    });

    document.getElementById("menu_id").innerHTML = html;
}

function createFooter(){
    let footerData = [
        {
            link: "tel:0100200340",
            icon: "fa-phone",
            text: "010-020-0340"
        },
        {
            link: "mailto:info@company.co",
            icon: "fa-envelope",
            text: "the_photographer@gmail.com"
        },
        {
            link: "https://www.google.com/maps",
            icon: "fa-map-marker-alt",
            text: "Location on Maps"
        },
        {
            link: "about.html",
            icon: "fa-address-book",
            text: "About Author"
        },
        {
            link: "documentation.pdf",
            icon: "fa-address-card",
            text: "Documentation"
        }
    ];

    let html = "";

    footerData.forEach(el => {
        html += `
            <div class="col-sm-12 col-md-6 d-flex align-items-center tm-contact-item">
                <a href="${el.link}" class="tm-contact-item-link">
                    <i class="fas fa-3x ${el.icon} mr-4"></i>
                    <span class="mb-0">${el.text}</span>
                </a>              
            </div>
        `;
    });

    document.getElementById("footer_id").innerHTML = html;
}