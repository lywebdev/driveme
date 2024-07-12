import users from './../data/users.json' with { type: "json" };
import data from './../data/mainData.js';
import transportTypes from './../data/transportTypes.json' with { type: "json" };

import TransportType from "../../models/TransportTypeSchema.js";
import User, {generateHash} from "../../models/UserSchema.js";
import TransportLocationDataSchema from "../../models/TransportLocationDataSchema.js";
import Transport from "../../models/TransportSchema.js";

import "./../../config/db/mongoose.js";

async function insertIfNotExist(Model, data, queryField = 'id') {
    const results = [];
    const itemsForInserting = [];

    for (const item of data) {
        if (Model.modelName === 'User') {
            item.password = await generateHash(item.password);
        }

        const itemInDb = await Model.findOne({
            _id: item[queryField],
        });

        if (!itemInDb) {
            item._id = item.id;

            const newItem = new Model(item);
            itemsForInserting.push(newItem);
        } else {
            results.push(itemInDb);
        }
    }

    if (itemsForInserting.length > 0) {
        const insertedItems = await Model.insertMany(itemsForInserting);
        results.push(...insertedItems);
    }

    return results;
}

async function seedTransportsWithRefs(data, transportTypes) {
    await insertIfNotExist(TransportType, transportTypes);
    await insertIfNotExist(User, users);
    await insertIfNotExist(TransportLocationDataSchema, data.locations);
    await insertIfNotExist(Transport, data.transports);
}

seedTransportsWithRefs(data, transportTypes)
    .then(() => {
        console.log('Successful.');
        process.exit(0);
    })
    .catch(err => {
        console.error('Seed script failed: ', err);
        process.exit(1);
    });
