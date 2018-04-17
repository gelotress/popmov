import Cookie from "universal-cookie";
// import CryptoJS, { AES, SHA256 } from "crypto-js/";

const cookie = new Cookie();

/* function getAccLoggedIn() {
	const key = cookie.get("key");

	return key ? key : null;
} */

function getAccList() {
	const accListString = localStorage.getItem("accList");
	const accList = JSON.parse(accListString);

	return accList;
}

function accSearch(acc) {
	const accList = getAccList();
	let accEntry = null;

	if (accList) {
		accEntry = accList.find(function (item) {
			return item.key === acc;
		});
	}

	return accEntry;
}

export function accLogin(acc, pass) {
	const accEntry = accSearch(acc);

	if (accEntry && accEntry.data.pass === pass) {
		cookie.set("key", accEntry.key);
		return true;
	}

	return false;
}

export function accAdd(acc, pass) {
	const accList = getAccList() ? getAccList() : [];
	const accEntry = accSearch(acc);

	if (!accEntry) {
		accList.push({key: acc, data: {pass: pass}});
		localStorage.setItem("accList", JSON.stringify(accList));

		return true;
	}

	return false;
}