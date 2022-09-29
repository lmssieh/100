const optionsELe = document.querySelector(".slider-options");
function handleMouseClick({ target }) {
	const ele = target.closest(".option");
	if (!ele) return;
	if (ele.classList.contains("option")) {
		document
			.querySelector(".option__active")
			?.classList.remove("option__active", "fromTop");
		ele.firstElementChild.classList.add("option__active", "fromTop");
	}
}
optionsELe.addEventListener("click", handleMouseClick);
optionsELe.addEventListener("mouseup", handleMouseClick);

w = document.querySelector(".wrapper");
so = document.querySelector(".slider-options");
so.addEventListener("mousedown", handleHold);
so.addEventListener("mouseup", handleHoldCleanUp);

function handleHold() {
	so.addEventListener("mousemove", handleMouseMove);
}

function handleHoldCleanUp() {
	so.removeEventListener("mousemove", handleMouseMove);
	document.querySelector(".isOnHold").classList.remove("isOnHold");
}

let lastImg = null;
function handleMouseMove(e) {
	so.classList.add("isOnHold");
	console.log(e.target, lastImg);
	if (e.target.src) {
		const img = e.target.src?.split("/images/")[1];
		lastImg = img;
		document.documentElement.style.setProperty(
			"--mood-bg-image",
			`url(images/${img})`
		);
	} else if (e.target.classList.contains("option")) {
		const img = e.target.querySelector("img").src?.split("/images/")[1];
		lastImg = img;
		document.documentElement.style.setProperty(
			"--mood-bg-image",
			`url(images/${img})`
		);
	} else {
		document.documentElement.style.setProperty(
			"--mood-bg-image",
			`url(images/${lastImg})`
		);
	}

	const { x, y } = mousePositionElement(e);
	const maxWidth =
		w.clientWidth - document.querySelector(".option").clientWidth;

	const hoverPos =
		x - findPos(so).left - document.querySelector(".option").clientWidth / 2;

	if (hoverPos > maxWidth || hoverPos < 0) return;
	document.documentElement.style.setProperty(
		"--mood-x-position",
		hoverPos + "px"
	);
}
function mousePositionElement(e) {
	var mousePosDoc = mousePositionDocument(e);
	var targetPos = findPos(e);
	var posx = mousePosDoc.x - targetPos.left;
	var posy = mousePosDoc.y - targetPos.top;
	return {
		x: posx,
		y: posy,
	};
}
function mousePositionDocument(e) {
	var posx = 0;
	var posy = 0;
	if (!e) {
		var e = window.event;
	}
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) {
		posx =
			e.clientX +
			document.body.scrollLeft +
			document.documentElement.scrollLeft;
		posy =
			e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	return {
		x: posx,
		y: posy,
	};
}

function findPos(obj) {
	var curleft = (curtop = 0);
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while ((obj = obj.offsetParent));
	}
	return {
		left: curleft,
		top: curtop,
	};
}
