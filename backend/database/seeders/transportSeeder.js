import createTransports from "../factories/transportFactory.js";

async function transportsSeeder() {
    const config = {
        count: process.argv[2] || 10,
    };

    try {
        const createdTransports = await createTransports(config.count);
        console.log(`${createdTransports.length} transport types seeded successfully.`);
    } catch (error) {
        console.error('Error seeding transport types:', error);
    }
}


transportsSeeder().then(() => {
    process.exit(0);
}).catch(err => {
    console.error('Seed script failed: ', err);
    process.exit(1);
});