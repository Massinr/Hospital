function Alert(text, state) {
    var notification = $(`
    <div class="alert"></div>
    `)

    var alert = notification;
    
    if (state === 'success') {
        alert.removeClass("info error warning");
        alert.addClass('success');
        alert.html('<i class="ion-android-checkbox-outline"></i> ' + text);
    } else if (state === 'error') {
        alert.removeClass("info success warning");
        alert.addClass('error');
        alert.html('<i class="ion-close-circled"></i> ' + text);
    } else if (state === 'warning') {
        alert.removeClass("info error success");
        alert.addClass('warning');
        alert.html('<i class="ion-android-warning"></i> ' + text);
    } else if (state === 'info') {
        alert.removeClass("success error warning");
        alert.addClass('info');
        alert.html('<i class="ion-information-circled"></i> ' + text);
    }
    
    $('.notificationContainer').append(alert);
    setTimeout(function() {
        alert.slideUp("slow")
        alert.remove();
    }, 2000);
}
function logUpdate(text, name) {
    let currentDateTime = getCurrentDateTime();
    let newLog = $(`
        <div id="log">
            <strong>${text}</strong> ${name} - ${currentDateTime}
        </div>
    `);
    $(".logs").append(newLog);
    Alert("log updated", "info");
}

function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}

class StaffElement {
    constructor(name, role, department, phone, email, qualifications, experience, specializations, availability, picture) {
        this.name = name;
        this.role = role;
        this.department = department;
        this.phone = phone;
        this.email = email;
        this.qualifications = qualifications;
        this.experience = experience;
        this.specializations = specializations;
        this.availability = availability;
        this.picture = picture;
    }
    
    createElement() {
        try {
            
            let newStaff = $(`
                <div class="card staff-card">
                    <div class="info staff-info">
                    <button id="removeStaff">Remove</button>
                        <h3 class="name staff-name">${this.name}</h3>
                        <p class="role staff-role">${this.role}</p>
                        <p class="department staff-department">${this.department}</p>
                        <ul class="contacts staff-contacts">
                            <li><span class="contact-label">Phone:</span> ${this.phone}</li>
                            <li><span class="contact-label">Email:</span> ${this.email}</li>
                        </ul>
                        <p class="qualifications staff-qualifications">${this.qualifications}</p>
                        <p class="experience staff-experience">${this.experience}</p>
                        <p class="specializations staff-specializations">Specializations: ${this.specializations}</p>
                        <p class="availability staff-availability">Availability: ${this.availability}</p>
                    </div>
                    <img src="${this.picture}" alt="Staff Photo" class="photo staff-photo">
                </div>
            `);
            
            return newStaff;
        } catch (error) {
            Alert(error.message, 'error');
            return null;
        }
    }
}

class patientElement{
    constructor(name, age, gender, condition, contact, email, appointment, picture) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.condition = condition;
        this.contact = contact;
        this.email = email;
        this. appointment = appointment;
        this.picture = picture;

    }
    createElement(){
        try{
        let newPatient = $(`
            <div class="card patient-card">
            <button id="removePatient">Remove</button>
                    <div class="info patient-info">
                        <h3 class="name patient-name">${this.name}</h3>
                        <p class="age patient-age">Age: ${this.age}</p>
                        <p class="gender patient-gender">Gender: ${this.gender}</p>
                        <p class="condition patient-condition">Condition: ${this.condition}</p>
                        <p class="contact patient-contact">Contact: ${this.contact}</p>
                        <p class="email patient-email">Email: ${this.email}</p>
                        <p class="appointment patient-appointment">Next Appointment: ${this.appointment}</p>
                    </div>
                    <img src="${this.picture}" alt="Patient Photo" class="photo patient-photo">
                </div>
        `)
        return newPatient;
        }catch (error) {
            Alert(error.message, 'error');
            return null;
        }
    }
}




$(document).ready(function() {
    var randomNumber = Math.floor(Math.random() * -101);
    $(".alert").slideUp();
    $(".creator").slideUp();
    $(".creatorSection").slideUp();
    $(".staffSection").slideUp();
    $(".patientSection").slideUp();
    $(".logs").slideUp()
    $("#staff").click(function() {
        $(".staff").css({
            zIndex: 2
        });
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".logs").css({zIndex: randomNumber});
        $(".logs").slideUp()
        Alert("Changed to staff", "success");
    });

    $("#patient").click(function() {
        console.log("patient button clicked");
        $(".patients").css({
            zIndex: 2
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({zIndex: randomNumber});
        $(".logs").slideUp()
        Alert("Changed to patients", "success");
    });
    $('#auditlogs').click(function(){
        $(".logs").slideDown();
        $(".patients").css({
            zIndex: randomNumber
        });
        $(".staff").css({
            zIndex: randomNumber
        });
        $(".logs").css({zIndex: 2});
        Alert("Changed to Audit Logs", "success");
    });

    $("#create").click(function() {
        $(".creator").slideToggle("fast");
    });

    $(".staffOption").click(function() {
        $(".creator").slideUp();
        $(".staffSection").slideDown();
        $(".patientSection").slideUp(); 
    });
    $(".patientOption").click(function() {
        $(".creator").slideUp();
        $(".staffSection").slideUp();
        $(".patientSection").slideDown();        
    });
    $('#closeStaffSection').click(function() {
        $(".staffSection").slideUp();
    })
    $('#closePatientSection').click(function() {
        $(".patientSection").slideUp();
    })
    $('#createCardBtn').click(function() {
        let Name = $('#name').val();
        let Role = $('#role').val();
        let Department = $('#department').val();
        let Phone = $('#phone').val();
        let Email = $('#email').val();
        let Qualifications = $('#qualifications').val();
        let Experience = $('#experience').val();
        let Specializations = $('#specializations').val();
        let Availability = $('#availability').val();
        let PictureInput = document.getElementById('pictureInput');
        let PictureFile = PictureInput.files[0];
        if (PictureFile) {
            let reader = new FileReader();
            reader.onload = function(event) {
                var imageSource = event.target.result;
                const Staff = new StaffElement(Name, Role, Department, Phone, Email, Qualifications, Experience, Specializations, Availability, imageSource);
                const staffCard = Staff.createElement();
                console.log("click");
                $(".staffSection").slideUp("fast", function() {
                    if (staffCard) {
                        $('.staff').append(staffCard);
                        Alert(`new staff added - ${Name}`, "success")
                    }
                    setTimeout(() => {
                        logUpdate("New Staff Added",Name);
                    }, 1000);
                });
            };
            reader.readAsDataURL(PictureFile);
        } else {
            Alert("Please select an image", "error");
        }
    });
    $("#createPatientBtn").click(function(){
        let Name = $("#patient-name").val();
        let Age = $("#age").val();
        let Gender = $("#gender").val();
        let condition = $("#condition").val();
        let contact = $("#patient-contact").val();
        let Email = $("#patient-email").val();
        let appointment = $("#appointment").val();
    // <!-- name, age, gender, condition, contact, email, appointment, picture -->
        let PictureInput = document.getElementById('pictureInputPatient');
        let PictureFile = PictureInput.files[0];
        if (PictureFile) {
            let reader = new FileReader();
            reader.onload = function(event) {
                var imageSource = event.target.result;
                const Patient = new patientElement(Name, Age, Gender, condition, contact, Email, appointment, imageSource);
                const patientCard = Patient.createElement();
                console.log("click");
                $(".patientSection").slideUp("fast", function() {
                    if (patientCard) {
                        $('.patients').append(patientCard);
                        Alert(`new patient added - ${Name}`, "success")
                    }
                    setTimeout(() => {
                        logUpdate("New patient Added",Name);
                    }, 1000);
                });
            };
            reader.readAsDataURL(PictureFile);
        } else {
            Alert("Please select an image", "error");
        }
    }); 
    $(document).on("click", "#removeStaff", function() {
    let card = $(this).closest(".card");
    let cardName = card.find(".name");
    let name = cardName.text();
    card.slideUp();
    Alert("Staff removed", "warning");
    setTimeout(function() {
        card.remove();
        logUpdate("Removed Staff", name); // Pass the 'name' variable
    }, 1000);
});
    $(document).on('click', "#removePatient", function(){
        let card = $(this).closest(".card");
        let cardName = card.find(".name");
        let name = cardName.text();
        card.slideUp();
        Alert("Patient removed", "warning");
        setTimeout(function() {
            card.remove();
            logUpdate("Removed Patient", name); // Pass the 'name' variable
        }, 1000);
    })
});
