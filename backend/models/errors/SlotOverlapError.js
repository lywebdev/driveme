class SlotOverlapError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SlotOverlapError';
        this.statusCode = 400;
    }
}

export default SlotOverlapError;