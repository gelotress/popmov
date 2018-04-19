import Cookie from "universal-cookie";

import {
	getEntry,
	makeEntry,
	delEntry
} from "./LocalDatabase";

const cookie = new Cookie();

function checkEmail(email) {
	return /\S+@\S+\.\S+/.test(email);
}

export function getAcc(user) {
	return getEntry("Accounts", user);
}

export function makeAcc(user, pass) {
	return checkEmail(user) &&
		makeEntry("Accounts", user, {pass: pass});
}

export function delAcc(user) {
	return delEntry(user);
}

export function loginAcc(user, pass) {
	const acc = getAcc(user);
	const currYr = new Date().getFullYear();
	const expire = new Date();

	expire.setFullYear(currYr + 30);

	if (acc && acc.pass === pass) {
		cookie.set(
			"account",
			user,
			{ path: "/", expires: expire
		});
		return true;
	}

	return false;
}

export function logoutAcc() {
	cookie.remove("account");
}

export function getLoggedIn() {
	const acc = cookie.get("account");

	return acc;
}