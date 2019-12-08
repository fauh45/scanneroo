// Event ID
var EID = "";

// QR after read
var QR = "";

async function getEID() {
    if (EID == "") {
        var temp = window.prompt("Input the Event ID", "");

        if (temp == null || temp == "") {
            window.location.href = "index.html";
        } else {
            var response = await checkDB(temp);
            // alert(response);
            if (response == "Ada") {
                EID = temp;
            } else {
                alert("Event ID Tidak ditemukan");
                window.location.href = "index.html";
            }
        }
    }
}

getEID();

function openQRCamera(node) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() {
            node.value = "";
            qrcode.callback = function(res) {
                if (res instanceof Error) {
                    alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
                    reject("Error");
                } else {
                    // alert(res);
                    QR = res;
                    resolve("Scanned");
                }
            };
            qrcode.decode(reader.result);
        };
        reader.readAsDataURL(node.files[0]);
    })
}

function addToDB() {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var data = "EID=" + EID + "&QR=" + QR;
    // alert(QR);

    xhr.open("POST", "api/add.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);

    xhr.onreadystatechange = display_data;

    function display_data() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //alert(xhr.responseText);	   
                document.getElementById('result').innerHTML = xhr.responseText;
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}

function checkDB(EID) {
    return new Promise(function(resolve, reject) {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var data = "EID=" + EID;

        xhr.open("POST", "api/checktable.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);

        xhr.onreadystatechange = display_data;

        function display_data() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = xhr.responseText;
                    resolve(response);
                } else {
                    alert('There was a problem with the request.');
                    reject("Error");
                }
            }
        }
    })
}

async function scan(node) {
    await openQRCamera(node);
    addToDB();
}