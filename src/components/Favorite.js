import { getEntry, makeEntry} from "./LocalDatabase";
import { getLoggedIn } from "./Account";
import apiGeneral from "../apiGeneral";

export function addFavorite(id, poster) {
	const account = getLoggedIn();
	const prevEntry = getEntry("Accounts", account);
	const prePath = "https://image.tmdb.org/t/p/original/";

	let favorites = prevEntry.favorites ?
		[
			...prevEntry.favorites,
			{ id: id, poster_path: poster.replace(prePath, "") }
		] :
		[ { id: id, poster_path: poster.replace(prePath, "")} ];

	const newEntry = { ...prevEntry, favorites };

	return makeEntry("Accounts", account, newEntry);
}

export function getFavorites() {
	const account = getLoggedIn();
	const accSet = getEntry("Accounts", account);

	const favorites = accSet ? accSet.favorites : accSet;

	return favorites;
}

export function removeFavorite(id) {
	const account = getLoggedIn();
	const prevEntry = getEntry("Accounts", account);

	let favorites = prevEntry.favorites ?
		prevEntry.favorites.filter(function (item) {
			return item.id !== id;
		}) :
		prevEntry.favorites;

	const newEntry = { ...prevEntry, favorites };

	return makeEntry("Accounts", account, newEntry);
}