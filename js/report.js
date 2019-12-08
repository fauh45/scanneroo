var EID = "";

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

function getDB(EID) {
    return new Promise(function(resolve, reject) {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var data = "EID=" + EID;

        xhr.open("POST", "api/getdata.php", true);
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

async function data() {
    var response = await getDB(EID);

    document.getElementById('result').innerHTML = response;
}