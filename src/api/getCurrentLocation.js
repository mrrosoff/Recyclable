
export function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

function showPosition(position) {
	return { lat: position.coords.latitude, lng: position.coords.longitude};
}

function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			return "User denied the request for Geolocation.";
		case error.POSITION_UNAVAILABLE:
			return "Location information is unavailable.";
		case error.TIMEOUT:
			return "The request to get user location timed out.";
		case error.UNKNOWN_ERROR:
			return "An unknown error occurred.";
	}
}
