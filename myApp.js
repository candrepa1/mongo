require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(
	"mongodb+srv://candrepa1:Progposs2021@freecodecamp.sa0fx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

const personSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	age: Number,
	favoriteFoods: [String],
});

const Person = mongoose.model("Person", personSchema);

const arrayOfPeople = [
	{
		name: "dom",
		age: 30,
		favoriteFoods: ["peas, beans"],
	},
	{
		name: "kat",
		age: 35,
		favoriteFoods: ["pizza, ice cream"],
	},
];

const createAndSavePerson = (done) => {
	const cam = new Person({
		name: "cam",
		age: 22,
		favoriteFoods: ["pasta, sushi"],
	});
	cam.save((err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, docs) => {
		if (err) return console.error(err);
		done(null, docs);
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, (err, docs) => {
		if (err) return console.error(err);
		done(null, docs);
	});
};

const findPersonById = (personId, done) => {
	Person.findById(personId, (err, adventure) => {
		if (err) return console.error(err);
		done(null, adventure);
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";
	Person.findById(personId, (err, doc) => {
		doc.favoriteFoods.push(foodToAdd);
		doc.save((err, updated) => {
			if (err) return console.error(err);
			done(null, updated);
		});
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOneAndUpdate(
		{ name: personName },
		{ age: 20 },
		{ new: true },
		(err, person) => {
			if (err) return console.error(err);
			done(null, person);
		}
	);
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, person) => {
		if (err) return console.error(err);
		done(null, person);
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = "Mary";
	Person.remove({ name: nameToRemove }, (err, removed) => {
		if (err) return console.error(err);
		done(null, removed);
	});
};

const queryChain = (done) => {
	const foodToSearch = "burrito";

	Person.find({ favoriteFoods: foodToSearch })
		.sort("name")
		.limit(2)
		.select("name favoriteFoods")
		.exec((err, data) => {
			if (err) return console.log(err);
			done(null, data);
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
