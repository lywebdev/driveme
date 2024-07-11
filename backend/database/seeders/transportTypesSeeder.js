import createTransportType from "../factories/transportTypeFactory.js";

async function transportTypesSeeder() {
    const config = {
        count: process.argv[2] || 10,
    };

    try {
        const createdTransportTypes = await createTransportType(config.count);
        console.log(`${createdTransportTypes.length} transport types seeded successfully.`);
    } catch (error) {
        console.error('Error seeding transport types:', error);
    }
}


transportTypesSeeder().then(() => {
    process.exit(0);
}).catch(err => {
    console.error('Seed script failed: ', err);
    process.exit(1);
});