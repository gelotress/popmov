function getSet(setName) {
	return localStorage.getItem(setName);
}

function makeSet(setName, elements) {
	return localStorage.setItem(setName, elements);
}

function delSet(setName) {
	return localStorage.removeItem("setName");
}

function prepSet(setName) {
	const isSet = getSet(setName);

	return isSet ?
		JSON.parse(isSet) :
		makeSet(setName, "{}") === undefined && JSON.parse(getSet(setName));
}

function packSet(setName, prepedSet) {
	localStorage.setItem(setName, JSON.stringify(prepedSet));
}

export function getEntry(setName, key) {
	const set = JSON.parse(getSet(setName));

	return set && set[key];
}

export function makeEntry(setName, key, data) {
	const set = prepSet(setName);

	set[key] = data;

	return packSet(setName, set);
}

export function delEntry(setName, key) {
	const set = prepSet(setName);

	delete set[key];

	return packSet(set);
}