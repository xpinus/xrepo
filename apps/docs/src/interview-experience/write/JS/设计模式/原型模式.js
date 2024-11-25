const baseUser = {
	name: "",
	status: "offline",
	followers: [],

	subscribe(user, notify) {
		user.followers.push({ user, notify });
	},

	online() {
		(this.status = "online"),
			this.followers.forEach(({ notify }) => {
				notify(this);
			});
	},
};

export const createUser = (name) => {
	const user = Object.create(baseUser);

	user.name = name;
	user.followers = [];

	return user;
};
