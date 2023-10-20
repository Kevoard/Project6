if(localStorage.getItem("longitude") != null && localStorage.getItem("laltitude") != null){
    document.getElementById("map").innerHTML =
        `<iframe height="300" width="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=${localStorage.getItem("longitude")},${localStorage.getItem("laltitude")}&;layer=mapnik"></iframe>`
}
var isLive = false
var shareLocation;
var accesLocation;
document.getElementById("getLocation").onclick = ()=>{    

    if(isLive === false){
        shareLocation = navigator.geolocation.watchPosition(
            function(position){
                accesLocation = true
                document.getElementById("alert").innerHTML = `
                <div class="alert alert-success" role="alert">
                   We Show Your location
                </div>
                `
                document.getElementById("getLocation").innerHTML = "Stop Sharing"
                isLive = true
                document.getElementById("map").innerHTML =
                `<iframe height="300" width="100%" src="https://www.openstreetmap.org/export/embed.html?bbox=${position.coords.longitude},${position.coords.latitude}&;layer=mapnik"></iframe>`
                localStorage.setItem("longitude",position.coords.longitude) 
                localStorage.setItem("latitude",position.coords.latitude) 
            },
            function(error){
                switch(error.code){
                    case error.PERMISSION_DENIED:
                        document.getElementById("alert").innerHTML = `<div class="alert alert-danger mt-3 mb-3" role="alert">You have denied the permition</div>`
                    break;
                    case error.UNKNOW_ERROR:
                    error = `<div class="alert alert-danger mt-3 mb-3" role="alert">An unknow error occured.</div>`
                    break;
                }
            }
        )
        
    }else if(isLive === true && accesLocation === true){
        document.getElementById("alert").innerHTML = `
            <div class="alert alert-success" role="alert">
               We Show Your location
            </div>
            `
        navigator.geolocation.clearWatch(shareLocation)
        document.getElementById("getLocation").innerHTML = "Get location"
        isLive = false
    }
}