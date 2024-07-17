class apiResponseDTO
{
    status;
    content;

    constructor(status, content) {
        this.status = status;
        this.content = content;
    }
}

export default apiResponseDTO;