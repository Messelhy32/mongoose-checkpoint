const Person = require("./models/person");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Ahmed = new Person({
  name: "Ahmed",
  age: 24,
  favoriteFoods: ["la7ma", "kabab 7alla"],
});
Ahmed.save()
  .then(() => {
    console.log("Person created successfully");
  })
  .catch((error) => {
    console.error("Error creating person:", error);
  });
const createMany = async () => {
  try {
    await Person.create([
      { name: "Wael", age: 30, favoriteFoods: ["sushi", "salmon"] },
      { name: "George", age: 48, favoriteFoods: ["batates", "flafel"] },
    ]);
    console.log("People created successfully");
  } catch (error) {
    console.log("Failed " + error);
  }
};
createMany();

Person.find({ name: "Wael" })
  .then((res) => {
    console.log(res.map((wael) => wael.name));
  })
  .catch((error) => {
    console.error("Not Found" + error);
  });
Person.findOne({ name: "Ahmed" })
  .then((res) => {
    console.log("Found Ahmed: " + res);
  })
  .catch((err) => {
    console.error("No Ahmed: " + err);
  });
Person.findById("6498348e61a24b4075cac037")
  .then((res) => {
    const arr = res.favoriteFoods;
    arr.push("hamburger");
    res.save();
  })
  .catch((error) => {
    console.error(error);
  });
Person.findOneAndUpdate({ name: "Wael" }, { age: 20 }, { new: true })
  .then((res) => {
    console.log("Updated " + res);
  })
  .catch((err) => {
    console.error(err);
  });
Person.findByIdAndRemove("64983494ecb8b7544e12cde8").exec();
Person.deleteMany({ name: "Ahmed" })
  .then(() => {
    console.log("Documents removed successfully");
  })
  .catch((error) => {
    console.log("Error occurred while removing documents:", error);
  });

Person.find({ favoriteFoods: { $in: ["sushi"] } })
  .sort("name")
  .limit(2)
  .select("-age")
  .then((data) => {
    console.log("Yes: " + data);
  })
  .catch((err) => {
    console.error(err);
  });
